import crypto from "node:crypto";
import { createPool, type Pool } from "mysql2/promise";
import type { Request, Response } from "express";
import { ENV } from "./env";

let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

function getPool() {
  if (!ENV.databaseUrl) throw new Error("DATABASE_URL is not configured");
  pool ??= createPool({ uri: ENV.databaseUrl, connectionLimit: 5, ssl: { rejectUnauthorized: true } });
  return pool;
}

export async function ensureSchema() {
  if (schemaReady) return schemaReady;
  schemaReady = (async () => {
    const db = getPool();
    await db.query(`CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, openId VARCHAR(128) NOT NULL UNIQUE, name VARCHAR(255), createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)`);
    await db.query(`CREATE TABLE IF NOT EXISTS atlas_files (id INT AUTO_INCREMENT PRIMARY KEY, userId INT NOT NULL, title VARCHAR(255) NOT NULL, description TEXT, fileName VARCHAR(255) NOT NULL, storageKey VARCHAR(512) NOT NULL UNIQUE, url VARCHAR(1024) NOT NULL, mimeType VARCHAR(255) NOT NULL, sizeBytes INT NOT NULL, createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT atlas_files_user_fk FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)`);
  })();
  return schemaReady;
}

export async function getBrowserUser(req: Request, res: Response) {
  await ensureSchema();
  const cookies = Object.fromEntries((req.headers.cookie || "").split(";").map((part) => {
    const [key, ...value] = part.trim().split("=");
    return [key, value.join("=")];
  }).filter(([key]) => key));
  let session = cookies.atlas_session;
  if (!session) {
    session = crypto.randomUUID();
    res.setHeader("Set-Cookie", `atlas_session=${session}; HttpOnly; SameSite=Lax; ${req.protocol === "https" ? "Secure; " : ""}Max-Age=31536000; Path=/`);
  }
  const openId = `browser:${session}`;
  const db = getPool();
  await db.query("INSERT INTO users (openId, name) VALUES (?, ?) ON DUPLICATE KEY UPDATE openId = VALUES(openId)", [openId, "Atlas browser session"]);
  const [rows] = await db.query("SELECT id, openId, name, createdAt FROM users WHERE openId = ? LIMIT 1", [openId]);
  return (rows as Array<{ id: number; openId: string; name: string | null; createdAt: Date }>)[0];
}

export async function listFiles(userId: number) {
  const [rows] = await getPool().query("SELECT id, title, description, fileName, storageKey, url, mimeType, sizeBytes, createdAt FROM atlas_files WHERE userId = ? ORDER BY createdAt DESC", [userId]);
  return rows;
}

export async function insertFile(values: { userId: number; title: string; description: string | null; fileName: string; storageKey: string; url: string; mimeType: string; sizeBytes: number }) {
  const [result] = await getPool().query("INSERT INTO atlas_files (userId, title, description, fileName, storageKey, url, mimeType, sizeBytes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [values.userId, values.title, values.description, values.fileName, values.storageKey, values.url, values.mimeType, values.sizeBytes]);
  const id = (result as { insertId: number }).insertId;
  const [rows] = await getPool().query("SELECT id, title, description, fileName, storageKey, url, mimeType, sizeBytes, createdAt FROM atlas_files WHERE id = ? AND userId = ?", [id, values.userId]);
  return (rows as unknown[])[0];
}

export async function deleteFile(userId: number, fileId: number) {
  const [result] = await getPool().query("DELETE FROM atlas_files WHERE id = ? AND userId = ?", [fileId, userId]);
  return (result as { affectedRows: number }).affectedRows > 0;
}

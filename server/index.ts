import "dotenv/config";
import express from "express";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ensureSchema, getBrowserUser, listFiles, insertFile, deleteFile } from "./db";
import { MAX_ATLAS_FILE_BYTES, sanitizeAtlasFileName, validateAtlasUpload } from "./file-storage-utils";
import { storagePut } from "./storage";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const app = express();
const server = createServer(app);
app.use(express.json({ limit: "12mb" }));
app.use(express.urlencoded({ extended: true, limit: "12mb" }));

app.get("/api/auth/me", async (req, res) => {
  try {
    const user = await getBrowserUser(req, res);
    res.json({ user });
  } catch (error) {
    console.error("[Auth] session failed", error);
    res.status(500).json({ message: "Session unavailable" });
  }
});

app.get("/api/files", async (req, res) => {
  try {
    const user = await getBrowserUser(req, res);
    res.json(await listFiles(user.id));
  } catch (error) {
    console.error("[File Storage] list failed", error);
    res.status(500).json({ message: "Could not load file shelf" });
  }
});

app.post("/api/files/upload", async (req, res) => {
  try {
    const user = await getBrowserUser(req, res);
    const body = req.body as Record<string, unknown>;
    const fileName = typeof body.fileName === "string" ? body.fileName : "";
    const title = typeof body.title === "string" ? body.title.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const mimeType = typeof body.mimeType === "string" ? body.mimeType : "application/octet-stream";
    const dataBase64 = typeof body.dataBase64 === "string" ? body.dataBase64 : "";
    const validationError = validateAtlasUpload({ fileName, title, description, mimeType, dataBase64 });
    if (validationError) return res.status(400).json({ message: validationError });
    const buffer = Buffer.from(dataBase64, "base64");
    if (!buffer.length || buffer.length > MAX_ATLAS_FILE_BYTES) return res.status(413).json({ message: "Files must be between 1 byte and 8 MB" });
    const stored = await storagePut(`browser-${user.id}/atlas/${sanitizeAtlasFileName(fileName)}`, buffer, mimeType);
    const file = await insertFile({ userId: user.id, title, description: description || null, fileName: sanitizeAtlasFileName(fileName), storageKey: stored.key, url: stored.url, mimeType, sizeBytes: buffer.byteLength });
    res.status(201).json(file);
  } catch (error) {
    console.error("[File Storage] upload failed", error);
    res.status(500).json({ message: "Upload failed" });
  }
});

app.delete("/api/files/:id", async (req, res) => {
  try {
    const user = await getBrowserUser(req, res);
    const deleted = await deleteFile(user.id, Number(req.params.id));
    if (!deleted) return res.status(404).json({ message: "File not found" });
    res.json({ success: true });
  } catch (error) {
    console.error("[File Storage] delete failed", error);
    res.status(500).json({ message: "Delete failed" });
  }
});

async function start() {
  if (process.env.NODE_ENV === "development") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({ root: path.join(root, "client"), configFile: path.join(root, "vite.config.ts"), server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
    app.use("*", async (req, res, next) => {
      try {
        const url = req.originalUrl;
        const template = await vite.transformIndexHtml(url, "<!doctype html><html><head><title>Architecture Models Atlas</title></head><body><div id=\"root\"></div><script type=\"module\" src=\"/src/main.tsx\"></script></body></html>");
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (error) { vite.ssrFixStacktrace(error as Error); next(error); }
    });
  } else {
    const staticPath = path.join(root, "dist/public");
    app.use(express.static(staticPath));
    app.get("*", (_req, res) => res.sendFile(path.join(staticPath, "index.html")));
  }
  if (process.env.DATABASE_URL || process.env.DRIZZLE_DATABASE_URL) {
    try { await ensureSchema(); } catch (error) { console.warn("[Database] Schema initialization deferred", error); }
  }
  const port = Number(process.env.PORT || 3000);
  server.listen(port, "0.0.0.0", () => console.log(`Full-stack atlas server running on http://localhost:${port}`));
}

start().catch((error) => { console.error(error); process.exit(1); });

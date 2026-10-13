import { int, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 128 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const atlasFiles = mysqlTable("atlas_files", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  fileName: varchar("fileName", { length: 255 }).notNull(),
  storageKey: varchar("storageKey", { length: 512 }).notNull().unique(),
  url: varchar("url", { length: 1024 }).notNull(),
  mimeType: varchar("mimeType", { length: 255 }).notNull(),
  sizeBytes: int("sizeBytes").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type AtlasFile = typeof atlasFiles.$inferSelect;

import { describe, expect, it } from "vitest";
import { MAX_ATLAS_FILE_BYTES, sanitizeAtlasFileName, validateAtlasUpload } from "./file-storage-utils";

describe("atlas file storage", () => {
  it("accepts the supplied taxonomy artifact shape", () => {
    expect(validateAtlasUpload({ fileName: "architecture-taxonomy.ts", title: "Architecture Taxonomy Entity Definitions", description: "Typed catalog", mimeType: "text/typescript", dataBase64: "YQ==" })).toBeNull();
  });
  it("rejects missing required metadata", () => {
    expect(validateAtlasUpload({ fileName: "", title: "", description: "", mimeType: "", dataBase64: "" })).toBe("fileName, title, and file data are required");
  });
  it("sanitizes filenames and keeps the extension", () => {
    expect(sanitizeAtlasFileName("architecture taxonomy?.ts")).toBe("architecture-taxonomy-.ts");
  });
  it("keeps the 8 MB limit explicit", () => {
    expect(MAX_ATLAS_FILE_BYTES).toBe(8 * 1024 * 1024);
    expect(validateAtlasUpload({ fileName: "x", title: "x", description: "x".repeat(2001), mimeType: "text/plain", dataBase64: "YQ==" })).toBe("File metadata is too long");
  });
});

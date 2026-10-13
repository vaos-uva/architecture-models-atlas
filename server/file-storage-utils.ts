export const MAX_ATLAS_FILE_BYTES = 8 * 1024 * 1024;

export type AtlasUploadInput = { fileName: string; title: string; description: string; mimeType: string; dataBase64: string };

export function sanitizeAtlasFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._ -]/g, "-").replace(/\s+/g, "-").slice(0, 160) || "atlas-file";
}

export function validateAtlasUpload(input: AtlasUploadInput) {
  if (!input.fileName || !input.title || !input.dataBase64) return "fileName, title, and file data are required";
  if (input.title.length > 255 || input.description.length > 2000 || input.mimeType.length > 255) return "File metadata is too long";
  return null;
}

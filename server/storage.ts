import crypto from "node:crypto";
import { ENV } from "./env";

function storageConfig() {
  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) throw new Error("Storage configuration is missing");
  return { forgeUrl: ENV.forgeApiUrl.replace(/\/+$/, ""), forgeKey: ENV.forgeApiKey };
}

function appendHashSuffix(key: string) {
  const hash = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  const dot = key.lastIndexOf(".");
  return dot === -1 ? `${key}_${hash}` : `${key.slice(0, dot)}_${hash}${key.slice(dot)}`;
}

export async function storagePut(relKey: string, data: Buffer | Uint8Array | string, contentType = "application/octet-stream") {
  const { forgeUrl, forgeKey } = storageConfig();
  const key = appendHashSuffix(relKey.replace(/^\/+/, ""));
  const presignUrl = new URL("v1/storage/presign/put", `${forgeUrl}/`);
  presignUrl.searchParams.set("path", key);
  const presign = await fetch(presignUrl, { headers: { Authorization: `Bearer ${forgeKey}` } });
  if (!presign.ok) throw new Error(`Storage presign failed (${presign.status})`);
  const body = await presign.json() as { url?: string };
  if (!body.url) throw new Error("Storage returned no upload URL");
  const upload = await fetch(body.url, { method: "PUT", headers: { "Content-Type": contentType }, body: typeof data === "string" ? data : new Blob([data as any], { type: contentType }) });
  if (!upload.ok) throw new Error(`Storage upload failed (${upload.status})`);
  return { key, url: `/manus-storage/${key}` };
}

export async function storageSignedUrl(key: string) {
  const { forgeUrl, forgeKey } = storageConfig();
  const target = new URL("v1/storage/presign/get", `${forgeUrl}/`);
  target.searchParams.set("path", key.replace(/^\/+/, ""));
  const response = await fetch(target, { headers: { Authorization: `Bearer ${forgeKey}` } });
  if (!response.ok) throw new Error(`Storage read failed (${response.status})`);
  const body = await response.json() as { url?: string };
  if (!body.url) throw new Error("Storage returned no read URL");
  return body.url;
}

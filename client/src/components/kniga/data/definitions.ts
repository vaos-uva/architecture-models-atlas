/** KNIGA data contracts. Product data may depend on architecture definitions, never on view JSX. */
export type StoredAtlasFile = {
  id: number;
  title: string;
  description: string | null;
  fileName: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
};

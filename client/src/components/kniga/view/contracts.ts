/** KNIGA view contracts. Views consume data/configuration and do not own source records. */
export type KnigaViewMode = "guided" | "explore" | "compare" | "storage";
export type KnigaViewState = "idle" | "loading" | "ready" | "empty" | "error";

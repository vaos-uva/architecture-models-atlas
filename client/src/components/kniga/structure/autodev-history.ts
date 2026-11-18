/**
 * ident: client.components.kniga.structure.autodev-history
 * category: module
 * purpose: persist
 * role: product
 * semantic: execution-history
 * universe: kniga
 */

import type { AutoDevExecutionEvidence, AutoDevWorkItem } from "./autodev-tool";

export const AUTODEV_HISTORY_STORAGE_KEY = "kniga.autodev.execution-history.v1";

export type AutoDevHistoryRecord = AutoDevExecutionEvidence & {
  workItemTitle: string;
  role: AutoDevWorkItem["role"];
};

export type AutoDevStorage = Pick<Storage, "getItem" | "setItem">;

export const atlasAutoDevItems: readonly AutoDevWorkItem[] = [
  {
    id: "autodev-model-001",
    role: "architect",
    title: "Freeze multilingual model contract",
    objective: "Keep stable IDs, locale fields, and fallback states explicit.",
    status: "done",
    query: { what: "canonical language model", where: "KNIGA foundation", how: "define and validate" },
    acceptance: ["normal form is typed", "legacy IDs remain resolvable"],
    registryIds: ["iso-42010", "omg-mda"],
    roadmapIds: ["SPRINT-ML-001", "FOUND-002"],
  },
  {
    id: "autodev-dev-001",
    role: "developer",
    title: "Implement scanner and measurer modules",
    objective: "Provide reusable factory-backed inspection and completion metrics.",
    status: "done",
    query: { what: "Digital factory modules", where: "OZCO foundation", how: "scan, measure, test" },
    acceptance: ["scanner is pure", "measurer is deterministic", "tests pass"],
    registryIds: ["omg-mda", "omg-mof"],
    roadmapIds: ["FOUND-007", "FOUND-008"],
    dependsOn: ["autodev-model-001"],
  },
  {
    id: "autodev-ops-001",
    role: "operator",
    title: "Verify release evidence",
    objective: "Run tests, type checks, build, and traceability checks before release.",
    status: "ready",
    query: { what: "release evidence", where: "KNIGA repository", how: "validate and report" },
    acceptance: ["test evidence recorded", "remote SHA verified"],
    registryIds: ["iso-42010"],
    roadmapIds: ["SPRINT-ML-001", "OPS-001"],
    dependsOn: ["autodev-dev-001"],
  },
];

export function readAutoDevHistory(storage?: AutoDevStorage): AutoDevHistoryRecord[] {
  if (!storage) return [];
  try {
    const raw = storage.getItem(AUTODEV_HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed as AutoDevHistoryRecord[] : [];
  } catch {
    return [];
  }
}

export function writeAutoDevHistory(storage: AutoDevStorage | undefined, records: readonly AutoDevHistoryRecord[]): void {
  if (!storage) return;
  storage.setItem(AUTODEV_HISTORY_STORAGE_KEY, JSON.stringify(records));
}

export function seedAutoDevHistory(items: readonly AutoDevWorkItem[] = atlasAutoDevItems): AutoDevHistoryRecord[] {
  return items.filter((item) => item.status === "done").map((item, index) => ({
    id: `seed-${item.id}`,
    workItemId: item.id,
    role: item.role,
    workItemTitle: item.title,
    status: "passed",
    summary: item.acceptance.join(" · "),
    command: index === 0 ? "pnpm run check" : index === 1 ? "pnpm test" : "pnpm run build",
    recordedAt: "2026-11-15T00:00:00.000Z",
  }));
}

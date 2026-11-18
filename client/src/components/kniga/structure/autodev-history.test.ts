/**
 * ident: client.components.kniga.structure.autodev-history.test
 * category: test
 * purpose: verify
 * role: quality
 * semantic: persistence-contract
 * universe: kniga
 */

import { describe, expect, it } from "vitest";
import { atlasAutoDevItems, readAutoDevHistory, seedAutoDevHistory, writeAutoDevHistory } from "./autodev-history";

function memoryStorage() {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
  };
}

describe("AutoDev history", () => {
  it("seeds only completed items as passed evidence", () => {
    const history = seedAutoDevHistory();
    expect(history).toHaveLength(2);
    expect(history.every((record) => record.status === "passed")).toBe(true);
    expect(history.map((record) => record.workItemId)).toEqual(["autodev-model-001", "autodev-dev-001"]);
  });

  it("round-trips execution evidence through the configured storage adapter", () => {
    const storage = memoryStorage();
    const records = seedAutoDevHistory(atlasAutoDevItems);
    writeAutoDevHistory(storage, records);
    expect(readAutoDevHistory(storage)).toEqual(records);
  });

  it("fails closed when stored history is malformed", () => {
    const storage = memoryStorage();
    storage.setItem("kniga.autodev.execution-history.v1", "not-json");
    expect(readAutoDevHistory(storage)).toEqual([]);
  });
});

/**
 * ident: client.components.kniga.structure.autodev-tool-test
 * category: test
 * purpose: validate
 * role: test
 * semantic: autodev
 * universe: kniga
 */

import { describe, expect, it } from "vitest";
import { createAtlasAutoDevTool, type AutoDevWorkItem } from "./autodev-tool";

const query = { what: "atlas change", where: "registry", how: "validate then release" };

const items: AutoDevWorkItem[] = [
  { id: "model-1", role: "architect", title: "Freeze model contract", objective: "Define stable inputs", status: "done", query, acceptance: ["typed"], registryIds: ["iso-42010"], roadmapIds: ["FOUND-002"] },
  { id: "dev-1", role: "developer", title: "Implement projection", objective: "Build adapter", status: "ready", query, acceptance: ["tested"], registryIds: ["omg-mda"], roadmapIds: ["FOUND-007"], dependsOn: ["model-1"] },
  { id: "op-1", role: "operator", title: "Run release gate", objective: "Verify evidence", status: "blocked", query, acceptance: ["reported"], registryIds: ["omg-mda"], roadmapIds: ["SPRINT-ML-001"] },
];

describe("KNIGA AutoDev tool", () => {
  it("scans work items by role without mutating the source config", () => {
    const tool = createAtlasAutoDevTool({ items });
    expect(tool.scan("developer").map((item) => item.id)).toEqual(["dev-1"]);
    expect(tool.scan().map((item) => item.id)).toEqual(["model-1", "dev-1", "op-1"]);
    expect(items[1].acceptance).toEqual(["tested"]);
  });

  it("measures completion deterministically for all roles and one role", () => {
    const tool = createAtlasAutoDevTool({ items });
    expect(tool.measure().value).toEqual({ role: "all", total: 3, done: 1, ready: 1, blocked: 1, completionPercent: 33 });
    expect(tool.measure("architect").value.completionPercent).toBe(100);
  });

  it("creates a planned item and emits a compact repeatable brief", () => {
    const tool = createAtlasAutoDevTool({ items, defaultQuery: query });
    const created = tool.create({ id: "new-1", role: "developer", title: "Add tests", objective: "Protect behavior", acceptance: ["green"], registryIds: ["omg-mda"], roadmapIds: ["FOUND-007"] });
    expect(created.status).toBe("planned");
    expect(created.query).toEqual(query);
    expect(tool.brief("developer")).toBe("developer: dev-1 [ready] Implement projection");
    expect(tool.brief("operator")).toBe("operator: op-1 [blocked] Run release gate");
  });
});

/**
 * ident: client.components.ozco.abstract.foundation.factory-test
 * category: test
 * purpose: validate
 * role: test
 * semantic: factory-tool
 * universe: ozco
 */

import { describe, expect, it } from "vitest";
import { createDigitalFactoryTool } from "./digital-factory";
import { createFactory, measure, scan } from "./factory";

describe("OZCO factory tool", () => {
  it("constructs a product from a typed Digital schema", () => {
    const factory = createFactory<{ id: string; value: number }, "Digital">("Digital", ({ payload }) => payload);
    expect(factory.create({ kind: "Digital", payload: { id: "p-1", value: 42 } })).toEqual({ id: "p-1", value: 42 });
  });

  it("scans What/Where/How items and measures the resulting set", () => {
    const query = { what: "records", where: "fixture", how: "count" };
    const items = scan(query, ["a", "b"], (item) => item);
    const result = measure(query, items, (scanned) => scanned.length);
    expect(items.map(({ id }) => id)).toEqual(["a", "b"]);
    expect(result.value).toBe(2);
    expect(result.query).toEqual(query);
  });

  it("reuses one Digital tool for construction, scanning, and measurement", () => {
    const tool = createDigitalFactoryTool(
      ({ payload }) => payload,
      (items) => items.reduce((total, { item }) => total + item.value, 0),
      (item) => item.id,
    );
    const products = [
      tool.factory.create({ kind: "Digital", payload: { id: "a", value: 2 } }),
      tool.factory.create({ kind: "Digital", payload: { id: "b", value: 3 } }),
    ];
    const query = { what: "digital products", where: "fixture", how: "sum value" };
    const scanned = tool.scan(query, products);
    expect(scanned.map(({ id }) => id)).toEqual(["a", "b"]);
    expect(tool.measure(query, scanned).value).toBe(5);
  });
});

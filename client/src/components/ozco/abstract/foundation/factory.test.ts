/**
 * ident: client.components.ozco.abstract.foundation.factory-test
 * category: test
 * purpose: validate
 * role: test
 * semantic: factory-tool
 * universe: ozco
 */

import { describe, expect, it } from "vitest";
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
});

/**
 * ident: client.components.kniga.data.translation-metrics-test
 * category: test
 * purpose: validate
 * role: test
 * semantic: localization
 * universe: kniga
 */

import { describe, expect, it } from "vitest";
import { measureRegistryTranslationCompleteness } from "./translation-metrics";
import { projectArchitectureRegistry } from "./locale-projections";

describe("KNIGA translation completeness", () => {
  it("measures registry fields without changing the source records", () => {
    const registry = projectArchitectureRegistry("ru");
    const metric = measureRegistryTranslationCompleteness("rus", registry);

    expect(metric.scope).toBe("architecture-specification-registry");
    expect(metric.total).toBe(registry.length * 2);
    expect(metric.translated).toBeGreaterThan(0);
    expect(metric.fallback).toBeGreaterThan(0);
    expect(metric.unavailable).toBe(0);
    expect(metric.percentage).toBe(Math.round((metric.translated / metric.total) * 100));
    expect(registry.find((row) => row.id === "omg-mda")?.primaryQuestion).toContain("models");
  });

  it("reports complete English registry coverage", () => {
    const metric = measureRegistryTranslationCompleteness("eng", projectArchitectureRegistry("eng"));
    expect(metric.percentage).toBe(100);
    expect(metric.fallback).toBe(0);
    expect(metric.translated).toBe(metric.total);
  });
});

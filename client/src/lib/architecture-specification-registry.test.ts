import { describe, expect, it } from "vitest";
import {
  architectureSpecificationRegistry,
  type ArchitectureSpecificationMetadataValue,
} from "./architecture-specification-registry";

function isJsonSafeMetadataValue(value: ArchitectureSpecificationMetadataValue) {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean" || (Array.isArray(value) && value.every((item) => typeof item === "string"));
}

describe("architecture specification registry metadata", () => {
  it("retains one row for every current architecture lens", () => {
    expect(architectureSpecificationRegistry.map((item) => item.id)).toEqual([
      "iso-42010",
      "c4-model",
      "omg-mof",
      "togaf-standard",
      "archimate-language",
      "generalized-architecture-metamodel",
    ]);
  });

  it("keeps custom metadata optional, typed, and JSON-safe", () => {
    for (const specification of architectureSpecificationRegistry) {
      expect(specification.metadata).toBeDefined();
      for (const [key, value] of Object.entries(specification.metadata ?? {})) {
        expect(key.length).toBeGreaterThan(0);
        expect(isJsonSafeMetadataValue(value)).toBe(true);
      }
    }
  });

  it("exposes stage gates without turning them into fixed registry columns", () => {
    expect(architectureSpecificationRegistry.find((item) => item.id === "omg-mof")?.metadata?.stageGates).toEqual(["define", "conform", "exchange"]);
    expect(architectureSpecificationRegistry.find((item) => item.id === "generalized-architecture-metamodel")?.metadata?.evidenceLevel).toBe("atlas-synthesis");
  });
});

/**
 * ident: client.components.kniga.data.locale-projections-test
 * category: test
 * purpose: validate
 * role: test
 * semantic: translation
 * universe: kniga
 */

import { describe, expect, it } from "vitest";
import { architectureTermByLegacyId } from "@/components/architecture/instances/architecture-term-instances";
import { createLocaleProjection, projectArchitectureRegistry, projectConcepts } from "./locale-projections";

describe("KNIGA locale projections", () => {
  it("keeps legacy IDs as reversible lookup keys", () => {
    expect(architectureTermByLegacyId.entity.legacyIds).toEqual(["entity"]);
    expect(architectureTermByLegacyId["iso-42010"].asciiAlphanumericCode).toBe("AtlasIso42010");
  });

  it("projects glossary labels without changing IDs or source fields", () => {
    const english = projectConcepts("eng").find((concept) => concept.id === "viewpoint");
    const russian = projectConcepts("rus").find((concept) => concept.id === "viewpoint");
    expect(english?.name).toBe("Architecture Viewpoint");
    expect(russian?.name).toBe("Архитектурная точка зрения");
    expect(russian?.detail).toBe(english?.detail);
    expect(russian?.id).toBe("viewpoint");
    expect(russian?.nameResolution.status).toBe("translated");
    expect(russian?.detailResolution.status).toBe("fallback");
  });

  it("projects registry names while preserving metadata, sources, and IDs", () => {
    const english = projectArchitectureRegistry("en").find((specification) => specification.id === "omg-mda");
    const russian = projectArchitectureRegistry("ru").find((specification) => specification.id === "omg-mda");
    expect(english?.name).toBe("OMG Model Driven Architecture");
    expect(russian?.name).toBe("Архитектура, управляемая моделями OMG");
    expect(russian?.sources).toEqual(english?.sources);
    expect(russian?.metadata).toEqual(english?.metadata);
    expect(russian?.nameResolution.status).toBe("translated");
    expect(russian?.contentResolution.status).toBe("fallback");
  });

  it("normalizes UI locale codes once for both projections", () => {
    expect(createLocaleProjection("ru").locale).toBe("rus");
    expect(createLocaleProjection("en").locale).toBe("eng");
  });
});

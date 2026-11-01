/**
 * ident: client.components.kniga.data.locale-projections
 * category: projection
 * purpose: translate
 * role: projection
 * semantic: translation
 * universe: kniga
 */

import type { ArchitectureSpecification } from "@/components/architecture/definitions";
import { architectureTermByLegacyId } from "@/components/architecture/instances/architecture-term-instances";
import type { Concept } from "@/components/architecture/definitions";
import { concepts } from "@/components/kniga/data/atlas-content";
import { architectureSpecificationRegistry } from "@/components/architecture/instances/architecture-specification-registry";

export type AtlasLocale = "eng" | "rus";
export type UiLocale = "en" | "ru";

export function toAtlasLocale(locale: AtlasLocale | UiLocale): AtlasLocale {
  return locale === "ru" || locale === "rus" ? "rus" : "eng";
}

function localizedLabel(legacyId: string, locale: AtlasLocale, fallback: string): string {
  const term = architectureTermByLegacyId[legacyId];
  if (!term) return fallback;
  return locale === "rus" ? term.rus : term.eng;
}

/** Additive adapter: legacy concept IDs remain the lookup key and all old fields survive. */
export function projectConcepts(locale: AtlasLocale | UiLocale): Concept[] {
  const normalizedLocale = toAtlasLocale(locale);
  return concepts.map((concept) => ({
    ...concept,
    name: localizedLabel(concept.id, normalizedLocale, concept.name),
  }));
}

/** Additive adapter: registry identity, metadata, sources, and mappings remain unchanged. */
export function projectArchitectureRegistry(locale: AtlasLocale | UiLocale): ArchitectureSpecification[] {
  const normalizedLocale = toAtlasLocale(locale);
  return architectureSpecificationRegistry.map((specification) => ({
    ...specification,
    name: localizedLabel(specification.id, normalizedLocale, specification.name),
  }));
}

export type LocaleProjection = {
  locale: AtlasLocale;
  concepts: Concept[];
  registry: ArchitectureSpecification[];
};

export function createLocaleProjection(locale: AtlasLocale | UiLocale): LocaleProjection {
  const normalizedLocale = toAtlasLocale(locale);
  return {
    locale: normalizedLocale,
    concepts: projectConcepts(normalizedLocale),
    registry: projectArchitectureRegistry(normalizedLocale),
  };
}

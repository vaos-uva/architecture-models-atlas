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
import { resolveTranslation, type TranslationResolution } from "@/components/ozco/abstract/foundation/multilingual";
import { measureTranslationCompleteness, createRegistryTranslationFields, type TranslationCompletenessMetric } from "@/components/kniga/data/translation-metrics";

export type AtlasLocale = "eng" | "rus";
export type UiLocale = "en" | "ru";

export function toAtlasLocale(locale: AtlasLocale | UiLocale): AtlasLocale {
  return locale === "ru" || locale === "rus" ? "rus" : "eng";
}

function localizedLabel(legacyId: string, locale: AtlasLocale, fallback: string): TranslationResolution {
  const term = architectureTermByLegacyId[legacyId];
  return resolveTranslation(term, locale, fallback);
}

export type LocalizedConcept = Concept & {
  nameResolution: TranslationResolution;
  shortResolution: TranslationResolution;
  detailResolution: TranslationResolution;
};

/** Additive adapter: legacy concept IDs remain the lookup key and all old fields survive. */
export function projectConcepts(locale: AtlasLocale | UiLocale): LocalizedConcept[] {
  const normalizedLocale = toAtlasLocale(locale);
  return concepts.map((concept) => {
    const nameResolution = localizedLabel(concept.id, normalizedLocale, concept.name);
    return {
      ...concept,
      name: nameResolution.value || concept.name,
      nameResolution,
      shortResolution: resolveTranslation({ eng: concept.short, rus: "" }, normalizedLocale),
      detailResolution: resolveTranslation({ eng: concept.detail, rus: "" }, normalizedLocale),
    };
  });
}

export type LocalizedArchitectureSpecification = ArchitectureSpecification & {
  nameResolution: TranslationResolution;
  contentResolution: TranslationResolution;
  translationCompleteness: TranslationCompletenessMetric;
};

/** Additive adapter: registry identity, metadata, sources, and mappings remain unchanged. */
export function projectArchitectureRegistry(locale: AtlasLocale | UiLocale): LocalizedArchitectureSpecification[] {
  const normalizedLocale = toAtlasLocale(locale);
  return architectureSpecificationRegistry.map((specification) => {
    const nameResolution = localizedLabel(specification.id, normalizedLocale, specification.name);
    const contentResolution = resolveTranslation({ eng: specification.primaryQuestion, rus: "" }, normalizedLocale);
    return {
      ...specification,
      name: nameResolution.value || specification.name,
      nameResolution,
      contentResolution,
      translationCompleteness: measureTranslationCompleteness(normalizedLocale, createRegistryTranslationFields({ id: specification.id, nameResolution, contentResolution })),
    };
  });
}

export type LocaleProjection = {
  locale: AtlasLocale;
  concepts: LocalizedConcept[];
  registry: LocalizedArchitectureSpecification[];
};

export function createLocaleProjection(locale: AtlasLocale | UiLocale): LocaleProjection {
  const normalizedLocale = toAtlasLocale(locale);
  return {
    locale: normalizedLocale,
    concepts: projectConcepts(normalizedLocale),
    registry: projectArchitectureRegistry(normalizedLocale),
  };
}

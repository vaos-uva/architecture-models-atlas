/**
 * ident: client.components.kniga.data.locale-projections
 * category: projection
 * purpose: translate
 * role: projection
 * semantic: translation
 * universe: kniga
 */

import type { ArchitectureSpecification, MetamodelMapping } from "@/components/architecture/definitions";
import { architectureTermByLegacyId } from "@/components/architecture/instances/architecture-term-instances";
import type { Concept } from "@/components/architecture/definitions";
import { concepts } from "@/components/kniga/data/atlas-content";
import { architectureSpecificationRegistry } from "@/components/architecture/instances/architecture-specification-registry";
import { frameworkMetamodelMappings } from "@/components/kniga/data/atlas-content";
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
  abstractionResolution: TranslationResolution;
  primaryArtifactResolution: TranslationResolution;
  interoperabilityResolution: TranslationResolution;
  translationCompleteness: TranslationCompletenessMetric;
};

/** Additive adapter: registry identity, metadata, sources, and mappings remain unchanged. */
export function projectArchitectureRegistry(locale: AtlasLocale | UiLocale): LocalizedArchitectureSpecification[] {
  const normalizedLocale = toAtlasLocale(locale);
  return architectureSpecificationRegistry.map((specification) => {
    const nameResolution = localizedLabel(specification.id, normalizedLocale, specification.name);
    const translated = specification.translations?.[normalizedLocale];
    const contentResolution = resolveTranslation({ eng: specification.primaryQuestion, rus: translated?.primaryQuestion ?? "" }, normalizedLocale);
    const abstractionResolution = resolveTranslation({ eng: specification.abstraction, rus: translated?.abstraction ?? "" }, normalizedLocale);
    const primaryArtifactResolution = resolveTranslation({ eng: specification.primaryArtifact, rus: translated?.primaryArtifact ?? "" }, normalizedLocale);
    const interoperabilityResolution = resolveTranslation({ eng: specification.interoperability, rus: translated?.interoperability ?? "" }, normalizedLocale);
    return {
      ...specification,
      name: nameResolution.value || specification.name,
      primaryQuestion: contentResolution.value || specification.primaryQuestion,
      abstraction: abstractionResolution.value || specification.abstraction,
      primaryArtifact: primaryArtifactResolution.value || specification.primaryArtifact,
      interoperability: interoperabilityResolution.value || specification.interoperability,
      nameResolution,
      contentResolution,
      abstractionResolution,
      primaryArtifactResolution,
      interoperabilityResolution,
      translationCompleteness: measureTranslationCompleteness(normalizedLocale, createRegistryTranslationFields({ id: specification.id, nameResolution, contentResolution, abstractionResolution, primaryArtifactResolution, interoperabilityResolution })),
    };
  });
}

const russianRelationshipLabels: Readonly<Record<string, string>> = {
  "is realized through": "реализуется через", "frames": "задаёт рамку для", "governs the meaning of": "задаёт смысл",
  "structures the work around": "структурирует работу вокруг", "can use as a viewpoint language": "может использовать как язык точки зрения",
  "can be enriched by": "может быть дополнена", "is synthesized by": "синтезируется в", "can be transformed from": "может быть преобразована из",
  "populates views in": "наполняет представления в", "may be formalized through": "может быть формализована через", "supports delivery in": "поддерживает поставку в",
  "complements": "дополняет", "can zoom into enterprise concepts with": "позволяет приблизить понятия предприятия через", "maps to component levels": "отображается на уровни компонентов",
  "provides the foundation for": "обеспечивает основу для", "formalizes model kinds for": "формализует виды моделей для", "can define a language for": "может определить язык для",
  "supports content metamodels in": "поддерживает метамодели содержания в", "provides infrastructure for": "обеспечивает инфраструктуру для", "can formalize the enterprise vocabulary of": "может формализовать словарь предприятия",
  "can govern model-driven realization in": "может управлять реализацией на основе моделей в", "commissions and governs": "заказывает и управляет", "uses for software views": "использует для программных представлений",
  "can formalize content through": "может формализовать содержание через", "pairs with": "сочетается с", "can reuse the enterprise concepts of": "может повторно использовать понятия предприятия",
  "provides lifecycle context for": "задаёт контекст жизненного цикла для", "can serve as a model language in": "может служить языком моделей в", "provides language for views in": "обеспечивает язык для представлений в",
  "connects beyond": "соединяет за пределами", "is supported by": "поддерживается", "is adjacent to": "смежен с", "instantiates elements and relations in": "реализует элементы и отношения в",
  "transforms models that describe": "преобразует модели, описывающие", "can transform software views from": "может преобразовать программные представления из", "can be governed through": "может управляться через",
  "can transform models expressed in": "может преобразовать модели, выраженные в", "can realize enterprise models from": "может реализовать модели предприятия из", "can operationalize the synthesis of": "может операционализировать синтез",
  "inherits description framing from": "наследует рамку описания от", "maps decomposition to": "отображает декомпозицию на", "can be realized as a": "может быть реализована как",
  "travels through the lifecycle of": "проходит через жизненный цикл", "can be expressed with": "может быть выражена средствами", "is extended by the enterprise vocabulary of": "расширяется словарём предприятия",
  "is founded on": "основана на", "decomposes into": "декомпозируется на", "expose": "предоставляют", "realize": "реализуют", "relate through": "связаны через", "is described by": "описывается через",
  "supplies the conformance layer for": "поставляет слой соответствия для",
};

export type LocalizedMetamodelMapping = MetamodelMapping;

export function projectFrameworkMetamodelMappings(locale: AtlasLocale | UiLocale): Record<string, LocalizedMetamodelMapping[]> {
  if (toAtlasLocale(locale) !== "rus") return frameworkMetamodelMappings;
  return Object.fromEntries(Object.entries(frameworkMetamodelMappings).map(([sourceId, mappings]) => [sourceId, mappings.map((mapping) => ({
    ...mapping,
    relation: russianRelationshipLabels[mapping.relation] ?? mapping.relation,
  }))]));
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

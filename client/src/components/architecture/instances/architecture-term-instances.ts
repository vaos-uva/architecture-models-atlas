/**
 * ident: client.components.architecture.instances.architecture-term-instances
 * category: instance
 * purpose: define
 * role: instance
 * semantic: translation
 * universe: architecture
 */

import type { ArchitectureTerm } from "@/components/architecture/definitions/architecture-term";

type TermSeed = readonly [
  legacyId: string,
  eng: string,
  rus: string,
  architectureCategory: ArchitectureTerm["architectureCategory"],
];

const conceptSeeds: readonly TermSeed[] = [
  ["entity", "Entity of Interest", "Сущность интереса", "concept"],
  ["environment", "Environment", "Окружение", "concept"],
  ["architecture", "Architecture", "Архитектура", "concept"],
  ["ad", "Architecture Description", "Описание архитектуры", "artifact"],
  ["stakeholder", "Stakeholder", "Заинтересованная сторона", "concept"],
  ["concern", "Concern", "Интерес", "concept"],
  ["perspective", "Stakeholder Perspective", "Перспектива заинтересованной стороны", "concept"],
  ["viewpoint", "Architecture Viewpoint", "Архитектурная точка зрения", "concept"],
  ["view", "Architecture View", "Архитектурное представление", "view"],
  ["component", "View Component", "Компонент представления", "component"],
  ["model-kind", "Model Kind", "Вид модели", "concept"],
  ["aspect", "Architecture Aspect", "Аспект архитектуры", "concept"],
  ["rationale", "Architecture Rationale", "Обоснование архитектуры", "concept"],
  ["correspondence", "Correspondence", "Соответствие", "relationship"],
  ["method", "Correspondence Method", "Метод установления соответствия", "concept"],
  ["togaf-adm", "TOGAF Architecture Development Method", "Метод разработки архитектуры TOGAF", "framework"],
  ["togaf-content", "TOGAF Fundamental Content", "Базовое содержание TOGAF", "framework"],
  ["archimate-metamodel", "ArchiMate Metamodel", "Метамодель ArchiMate", "framework"],
  ["archimate-layers", "ArchiMate Core Layers", "Основные слои ArchiMate", "framework"],
  ["archimate-exchange", "ArchiMate Model Exchange", "Обмен моделями ArchiMate", "artifact"],
  ["dragon1-metamodel", "Dragon1 Enterprise Architecture Meta Model", "Мета-модель корпоративной архитектуры Dragon1", "framework"],
  ["dragon1-eaml", "Dragon1 EA Modeling Language", "Язык моделирования корпоративной архитектуры Dragon1", "framework"],
  ["dragon1-reference-model", "Dragon1 Enterprise Architecture Reference Model", "Эталонная модель корпоративной архитектуры Dragon1", "framework"],
  ["mda-cim", "Computation-Independent Model", "Вычислительно-независимая модель", "framework"],
  ["mda-pim", "Platform-Independent Model", "Платформенно-независимая модель", "framework"],
  ["mda-psm", "Platform-Specific Model", "Платформенно-зависимая модель", "framework"],
  ["mda-transformation", "Model Transformation", "Преобразование модели", "relationship"],
  ["mda-mof-foundation", "MOF-based Modeling Foundation", "Моделирующая основа на базе MOF", "framework"],
  ["enterprise-architecture", "Enterprise Architecture", "Корпоративная архитектура", "framework"],
  ["solution-architecture", "Solution Architecture", "Архитектура решения", "framework"],
  ["architecture-partnership", "EA–SA Partnership", "Партнёрство EA–SA", "relationship"],
  ["model-language", "Model Language", "Язык модели", "concept"],
  ["model-structure", "Interpretation / Structure", "Интерпретация / структура", "concept"],
  ["model-satisfaction", "Satisfaction", "Удовлетворение", "concept"],
  ["model-theory", "Theory and Model Class", "Теория и класс моделей", "concept"],
] as readonly TermSeed[];

const registrySeeds: readonly TermSeed[] = [
  ["iso-42010", "ISO/IEC/IEEE 42010", "ISO/IEC/IEEE 42010", "framework"],
  ["c4-model", "C4 Model", "Модель C4", "framework"],
  ["omg-mof", "OMG Meta-Object Facility", "Средство метаобъектов OMG", "framework"],
  ["omg-mda", "OMG Model Driven Architecture", "Архитектура, управляемая моделями OMG", "framework"],
  ["togaf-standard", "TOGAF Standard", "Стандарт TOGAF", "framework"],
  ["archimate-language", "ArchiMate", "ArchiMate", "framework"],
  ["dragon1-ea-metamodel", "Dragon1 Enterprise Architecture Meta Model", "Мета-модель корпоративной архитектуры Dragon1", "framework"],
  ["generalized-architecture-metamodel", "Generalized Architecture Metamodel", "Обобщённая метамодель архитектуры", "framework"],
] as readonly TermSeed[];

const makeTerm = ([legacyId, eng, rus, architectureCategory]: TermSeed): ArchitectureTerm => ({
  asciiAlphanumericCode: `Atlas${legacyId.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("")}`,
  termsExpressions: [eng],
  eng,
  rus,
  provenance: "normalized",
  sourceId: "atlas-concepts",
  legacyIds: [legacyId],
  architectureCategory,
});

/** Canonical multilingual instances for current concept and registry IDs. */
export const architectureTermInstances: readonly ArchitectureTerm[] = [...conceptSeeds, ...registrySeeds].map(makeTerm);

export const architectureTermByLegacyId: Readonly<Record<string, ArchitectureTerm>> = Object.fromEntries(
  architectureTermInstances.flatMap((term) => (term.legacyIds ?? []).map((legacyId) => [legacyId, term] as const)),
);

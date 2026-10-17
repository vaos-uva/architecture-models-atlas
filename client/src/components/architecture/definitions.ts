/**
 * Canonical domain contracts for architecture research data.
 *
 * Definitions contain no UI or product-specific rendering behavior.
 */

export type Edition = "2022" | "2011" | "2000";

export type Concept = {
  id: string;
  name: string;
  short: string;
  detail: string;
  category: string;
  edition: string;
  anchor?: string;
};

export type GeneralizedNode = {
  id: string;
  level: "architecture" | "component" | "element";
  name: string;
  kind: string;
  short: string;
  detail: string;
  examples: string;
  tone: string;
};

export type RegistrySortKey = "name" | "kind" | "version" | "primaryQuestion" | "abstraction";
export type RegistrySortDirection = "asc" | "desc";
export type MetamodelMapping = {
  targetId: string;
  relation: string;
  detail: string;
  tone: "direct" | "complementary" | "synthesis";
};

/**
 * Shared vocabulary for architecture specifications represented by the atlas.
 *
 * This registry is intentionally descriptive rather than normative: it provides
 * a stable data contract for comparing standards, methods, modeling languages,
 * metamodeling infrastructure, and the atlas synthesis model.
 */

export type ArchitectureSpecificationKind =
  | "standard"
  | "model"
  | "metamodeling-facility"
  | "method"
  | "modeling-language"
  | "synthesis";

export type ArchitectureSpecificationStatus = "current" | "historical" | "atlas-synthesis";

/**
 * Extensible metadata for framework-specific facts that should not become
 * mandatory columns in the normalized registry contract.
 *
 * Keep values JSON-safe so metadata can be searched, rendered, and exported
 * without custom serialization rules. Arrays are useful for stage gates,
 * layers, audiences, or related standards; scalar values work for labels,
 * evidence levels, and governance scopes.
 */
export type ArchitectureSpecificationMetadataValue = string | number | boolean | readonly string[];
export type ArchitectureSpecificationMetadata = Readonly<Record<string, ArchitectureSpecificationMetadataValue>>;

export type ArchitectureSpecification = {
  /** Stable machine-readable identifier. */
  id: string;
  /** Display name of the specification, framework, language, or synthesis model. */
  name: string;
  /** Short label used in compact registry views. */
  acronym: string;
  /** Classification of the registered architecture asset. */
  kind: ArchitectureSpecificationKind;
  /** Current, historical, or atlas-created status. */
  status: ArchitectureSpecificationStatus;
  /** Edition, release, or version represented by this row. */
  version: string;
  /** The architectural question or job this asset primarily addresses. */
  primaryQuestion: string;
  /** The abstraction or unit of architecture work it organizes. */
  abstraction: string;
  /** Primary output or artifact produced when using the asset. */
  primaryArtifact: string;
  /** Interoperability, conformance, or relationship mechanism. */
  interoperability: string;
  /** Canonical atlas section anchor. */
  atlasAnchor: "context" | "core" | "c4" | "mof" | "mda" | "togaf" | "archimate" | "dragon1" | "metamodel";
  /** Canonical source URLs associated with the registered row. */
  sources: readonly string[];
  /** Cross-model tags used for filtering and future registry views. */
  tags: readonly string[];
  /** Optional framework-specific metadata rendered as labeled detail fields. */
  metadata?: ArchitectureSpecificationMetadata;
};

/** Backward-compatible name for callers that model a specification as a component. */
export type ArchitectureSpecificationComponent = ArchitectureSpecification;

export type ArchitectureSpecificationRegistry = ReadonlyArray<ArchitectureSpecification>;

/**
 * Registry of every architecture specification currently represented in the atlas.
 * Keep one row per architecture lens/model; extend this list before adding a new
 * architecture source to the UI or download payload.
 */

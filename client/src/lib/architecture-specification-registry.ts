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
  atlasAnchor: "context" | "c4" | "mof" | "togaf" | "archimate" | "metamodel";
  /** Canonical source URLs associated with the registered row. */
  sources: readonly string[];
  /** Cross-model tags used for filtering and future registry views. */
  tags: readonly string[];
};

/** Backward-compatible name for callers that model a specification as a component. */
export type ArchitectureSpecificationComponent = ArchitectureSpecification;

export type ArchitectureSpecificationRegistry = ReadonlyArray<ArchitectureSpecification>;

/**
 * Registry of every architecture specification currently represented in the atlas.
 * Keep one row per architecture lens/model; extend this list before adding a new
 * architecture source to the UI or download payload.
 */
export const architectureSpecificationRegistry: ArchitectureSpecification[] = [
  {
    id: "iso-42010",
    name: "ISO/IEC/IEEE 42010",
    acronym: "ISO 42010",
    kind: "standard",
    status: "current",
    version: "2022 (with 2011 and IEEE 1471 lineage)",
    primaryQuestion: "What must an architecture description express, and why?",
    abstraction: "Entity of interest, architecture, stakeholders, concerns, viewpoints, views, view components, aspects, and rationale.",
    primaryArtifact: "Architecture Description (AD) and its governed views.",
    interoperability: "Correspondences, correspondence rules, viewpoints, model kinds, and traceability across AD elements.",
    atlasAnchor: "context",
    sources: [
      "http://www.iso-architecture.org/ieee-1471/cm/",
      "https://www.iso.org/standard/74393.html",
    ],
    tags: ["architecture-description", "stakeholders", "concerns", "viewpoints", "views", "traceability"],
  },
  {
    id: "c4-model",
    name: "C4 Model",
    acronym: "C4",
    kind: "model",
    status: "current",
    version: "Current model framing",
    primaryQuestion: "How much of the software architecture should this audience see?",
    abstraction: "Software system, container, component, and code levels.",
    primaryArtifact: "Hierarchical software architecture diagrams and supporting views.",
    interoperability: "Notation- and tooling-independent; exchange depends on the selected diagramming or modeling tools.",
    atlasAnchor: "c4",
    sources: [
      "https://c4model.com/",
      "https://blog.visual-paradigm.com/unveiling-the-power-of-c4-model-simplifying-software-architecture-diagrams/",
    ],
    tags: ["software-architecture", "system-context", "container", "component", "code", "diagramming"],
  },
  {
    id: "omg-mof",
    name: "OMG Meta-Object Facility",
    acronym: "MOF",
    kind: "metamodeling-facility",
    status: "current",
    version: "MOF Core 2.5.1 / M3–M0 framing",
    primaryQuestion: "What language defines the model, and how can the artifact interoperate?",
    abstraction: "Meta-metamodel, metamodel, user model, and instances/reality.",
    primaryArtifact: "MOF-based metamodels, models, repositories, transformations, and exchange artifacts.",
    interoperability: "XMI serialization, conformance, object identity, repositories, and model transformation.",
    atlasAnchor: "mof",
    sources: [
      "https://www.omg.org/mof/",
      "https://www.omg.org/spec/MOF/2.5.1/PDF",
    ],
    tags: ["metamodeling", "mof", "xmi", "interchange", "transformation", "mda"],
  },
  {
    id: "togaf-standard",
    name: "TOGAF Standard",
    acronym: "TOGAF",
    kind: "method",
    status: "current",
    version: "10th Edition",
    primaryQuestion: "How should enterprise architecture be developed, governed, and changed?",
    abstraction: "Architecture Capability, ADM phases, domain architectures, deliverables, governance, and change cycles.",
    primaryArtifact: "Architecture Vision, domain architectures, roadmaps, contracts, governance outputs, and migration plans.",
    interoperability: "Configurable method, governance, content metamodel, and Series Guides align architecture work across contexts.",
    atlasAnchor: "togaf",
    sources: [
      "https://www.opengroup.org/togaf",
      "https://publications.opengroup.org/togaf-library",
    ],
    tags: ["enterprise-architecture", "adm", "governance", "roadmap", "migration", "capability"],
  },
  {
    id: "archimate-language",
    name: "ArchiMate",
    acronym: "ArchiMate",
    kind: "modeling-language",
    status: "current",
    version: "3.2",
    primaryQuestion: "What language expresses relationships across enterprise domains?",
    abstraction: "Motivation, strategy, business, application, technology, physical, and implementation/migration elements.",
    primaryArtifact: "ArchiMate models, relationships, viewpoints, diagrams, and exchange files.",
    interoperability: "The Open Group ArchiMate Model Exchange File Format supports compatible-tool exchange.",
    atlasAnchor: "archimate",
    sources: [
      "https://www.opengroup.org/archimate-forum/archimate-overview",
      "https://pubs.opengroup.org/architecture/archimate32-doc/",
      "https://publications.opengroup.org/archimate-library/archimate-models/g201",
    ],
    tags: ["enterprise-architecture", "modeling-language", "metamodel", "viewpoints", "layers", "exchange"],
  },
  {
    id: "generalized-architecture-metamodel",
    name: "Generalized Architecture Metamodel",
    acronym: "GAM",
    kind: "synthesis",
    status: "atlas-synthesis",
    version: "Atlas synthesis · 2026",
    primaryQuestion: "How can architecture, components, and elements share a reusable vocabulary?",
    abstraction: "Architecture as the whole; components as meaningful parts; elements as atomic concepts and typed relationships.",
    primaryArtifact: "A cross-framework architecture vocabulary with traceable relationships, views, and artifacts.",
    interoperability: "Maps architecture concepts to ISO 42010, C4, MOF, TOGAF, and ArchiMate without claiming normative equivalence.",
    atlasAnchor: "metamodel",
    sources: [
      "http://www.iso-architecture.org/ieee-1471/cm/",
      "https://c4model.com/",
      "https://www.omg.org/mof/",
      "https://www.opengroup.org/togaf",
      "https://www.opengroup.org/archimate-forum/archimate-overview",
    ],
    tags: ["architecture", "components", "elements", "relationships", "views", "cross-framework"],
  },
];

/** Convenient domain name for consumers that want the registry as architectures. */
export const architectures: ArchitectureSpecification[] = architectureSpecificationRegistry;

export const architectureSpecificationById: Readonly<Record<string, ArchitectureSpecification>> = Object.fromEntries(
  architectureSpecificationRegistry.map((specification) => [specification.id, specification]),
) as Record<string, ArchitectureSpecification>;

export const architectureSpecificationCount = architectureSpecificationRegistry.length;

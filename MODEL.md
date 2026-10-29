<!-- ident: repository.model
category: architecture
purpose: describe
role: system-model
semantic: computation
universe: kniga -->

# MODEL.md

## Purpose

This document describes the computational system model for the KNIGA Architecture Models Atlas. It explains how the product behaves as a system, what its core actors and flows are, and which invariants must remain true as the project evolves.

## 1. System in one sentence

The system is a web-based knowledge atlas for architecture-model concepts, framework comparisons, source-backed definitions, and private saved artifacts.

## 2. Actors

### Readers

Users who seek understanding, comparison, or orientation.

Typical goals:

- learn a framework
- understand a concept
- compare models across standards
- find source-backed definitions
- save relevant artifacts for later use

### Curators and maintainers

People who add or update model content, taxonomy entries, registry records, or source notes.

They are responsible for:

- preserving provenance
- keeping IDs stable
- validating model meaning
- preventing data drift

### Agents and automation

AI or automation systems that help maintain the repo, apply policy, update research logic, and support code changes.

They must follow product identity and governance rules before editing content.

## 3. Runtime architecture

The system is split into several layers:

### Presentation layer

The browser UI renders the atlas experience.

Responsibilities:

- present concepts and frameworks visually
- provide navigation and filters
- allow comparison and selection
- expose saved or shared data interactions

This layer is implemented predominantly in `client/` and centered on `client/src/pages/Home.tsx`.

### Product data layer

This layer defines how the atlas model is structured for the product experience.

Responsibilities:

- typed definitions
- concept collections
- registry entries
- framework mappings
- metadata and taxonomy normalization

This layer lives in `client/src/components/architecture/` and `client/src/components/kniga/`.

### Persistence layer

This layer stores files and metadata for private or user-scoped artifacts.

Responsibilities:

- upload and retrieval of saved materials
- metadata validation
- storage access controls
- resilience to file-size and ownership constraints

This is implemented in `server/`, `drizzle/`, and storage helpers.

### Research and governance layer

This layer preserves domain knowledge and project memory.

Responsibilities:

- source-backed notes
- project decisions
- roadmap and milestones
- agent guidance
- taxonomy rules and boundaries

This is implemented in `docs/`, `artifacts/`, and `AGENTS.md`.

## 4. Core information flows

### Flow A: Reader exploration

1. Browser loads main atlas page.
2. UI renders concepts and framework sections.
3. Reader selects a framework or concept.
4. Product data is read from typed registries and model definitions.
5. The view updates with a mapped explanation, source trail, and associated metadata.

### Flow B: Framework comparison

1. A framework entry is selected.
2. The registry provides metadata such as kind, version, abstraction, and tags.
3. The mapping logic cross-links frameworks and conceptual categories.
4. Results are displayed in registry views, comparisons, and interaction cards.

### Flow C: Artifact save

1. Reader uploads a file with title and description.
2. Server validates metadata and file constraints.
3. Data is stored with owner-scoped metadata.
4. UI refreshes the artifact shelf.

### Flow D: Research update

1. A new model or framework is investigated.
2. Data is typed and normalized.
3. Source links and interpretation are added.
4. Registry and view layers are updated.
5. Validation ensures that navigation and comparison still hold.

## 5. Core data model

A minimal mental model for the system is:

- concept — a named idea or architecture element
- framework — a modeling system or standard
- registry row — structured record describing a framework or model
- mapping — connection between two conceptual systems
- source — origin or evidence for a claim
- artifact — saved research material or uploaded object

The design objective is not just data collection, but structured understanding.

## 6. Invariants

These rules must remain true across the lifetime of the system:

- identities remain stable and meaningful
- domain concepts remain typed and separated from UI rendering
- source provenance remains visible
- product identity remains recognizable
- knowledge remains composable and extendable
- file storage remains owner-scoped and validated
- no framework is treated as a disconnected one-off

## 7. Architectural constraints

The project intentionally separates concerns:

- `client/src/components/ozco/abstract/` is agnostic and reusable
- `client/src/components/kniga/` owns KNIGA-specific structure and product behavior
- `client/src/components/architecture/` owns architecture semantics and normalized definitions
- `server/` owns runtime behavior and persistence concerns
- `docs/` and `artifacts/` own knowledge, process, and governance memory

This separation keeps the atlas understandable and resilient to growth.

## 8. Computational view

From a system perspective, the atlas behaves like a domain-specific knowledge engine:

- input: concepts, registry data, research sources, user actions, uploads
- processing: normalization, mapping, comparison, filtering, retrieval
- output: visual explanations, navigable model views, saved artifacts, structured knowledge

The value comes from reducing complexity into a navigable system rather than merely displaying raw information.

## 9. Evolution model

The system should evolve by extending stable structures rather than replacing them.

Good extensions include:

- new framework definitions
- additional concept mappings
- new source notes or evidence
- improved search and comparison UX
- added artifact storage features
- stronger multilingual and accessibility support

Bad changes include:

- deleting old structure without preserving context
- mixing editorial narrative with data schema logic
- making framework metadata ad hoc and inconsistent
- drifting away from source-backed knowledge

## 10. Summary

The KNIGA Architecture Models Atlas is best understood as a computational knowledge system for architecture literacy.

It combines:

- structured model data
- interpretive product design
- source-backed research
- visual learning
- extendable registry logic
- private user storage

The system works because it turns a hard domain into an atlas: a navigable, traceable, composable map of architecture knowledge.

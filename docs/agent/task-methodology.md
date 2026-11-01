<!-- ident: docs.agent.task-methodology
category: agent-guide
purpose: govern
role: documentation
semantic: roadmap
universe: documentation -->

# Agent Task Methodology Roadmap

This is the operating roadmap for foundation-first work on KNIGA. Agents solve the structure of a task before expanding its UI surface. The objective is a stable model that can produce multiple views, locales, exports, and future products without duplicated meaning.

## Operating principle

```text
question → discovery → definitions → model → contracts → migration → projections → views → validation → release
```

Do not begin with JSX when the requested change modifies meaning, identity, language, ownership, or structure. A visual request may still be a model request if it changes what users can understand or compare.

## Roadmap stages

### Stage 0 — Task framing

Write the task in one sentence. Identify the actor, decision, affected universe, expected output, and non-goals. Assign a stable task ID in `docs/project/task-registry.md`. If the request conflicts with no-data-loss or ownership rules, stop before implementation.

**Gate:** the task has an owner, bounded paths, acceptance evidence, and an explicit non-goal list.

### Stage 1 — Discovery

Inventory current files, IDs, data counts, sources, exports, routes, tests, and existing adapters. Find the authoritative record before creating a new one. Record risks and legacy shapes in an artifact; make no code changes during discovery.

**Gate:** discovery names the source of truth and proves what must not change.

### Stage 2 — Definitions

Freeze vocabulary before schema design. Define identity, term/expression, source, claim, entity, relationship, model, view, renderer, locale, provenance, and status. Classify each concern using `Purpose × Role × Semantic × Universe`.

**Gate:** every new noun has one definition and one owning layer.

### Stage 3 — Canonical model

Create or extend model contracts in the lowest stable layer that owns the meaning. Keep definitions separate from instances, sources, projections, and rendering. Use stable ASCII alphanumeric identity for multilingual terms; retain legacy IDs through additive aliases.

**Gate:** the model is framework-agnostic where intended, JSON-safe where exported, and free of React/browser/CSS dependencies.

### Stage 4 — Compatibility contracts

Define validators, provenance states, relationship endpoints, export metadata, and migration rules. Reject invalid states loudly. Do not silently infer translations, rename IDs, or overwrite legacy records. State the exact round-trip and parity evidence required.

**Gate:** invalid cases and no-data-loss behavior are testable.

### Stage 5 — Structural reorganization

Move files only after ownership is explicit. Use `git mv`, preserve history, update links/imports, and keep the repository root intentional. Place OZCO abstractions, architecture definitions/models/instances, KNIGA data/source/projections, runtime, documentation, and tooling in their governed directories.

**Gate:** no forbidden dependency direction, stale path, misplaced root record, or broken Markdown link remains.

### Stage 6 — Migration adapter

Expose the canonical model beside legacy catalogs. Build a reversible adapter and compare IDs, counts, sources, labels, and exported keys. Consumers migrate one bounded slice at a time; the old representation remains readable until parity is proven.

**Gate:** old and new forms produce equivalent meaning and a lossless export/import round trip.

### Stage 7 — Projections and views

Derive search indexes, comparison rows, graphs, timelines, glossary cards, and locale-specific views from the canonical model. A view declares its purpose, locale, filters, included records, derived values, and omissions. Renderers receive projections, not raw research catalogs.

**Gate:** no duplicated semantic data is introduced in JSX or CSS configuration.

### Stage 8 — Validation and release

Run focused tests, full tests, type checking, production build, link/header/placement checks, and browser verification at representative widths. Record evidence, unresolved risks, and the exact next task. Checkpoint before release; commit and push only when explicitly requested.

**Gate:** validation evidence is reproducible and the working tree/remote state is known.

## Delegated-agent protocol

The parent agent owns scope, definitions, contracts, integration, exceptions, and final acceptance. A delegated agent receives one bounded responsibility, exact read/write paths, forbidden paths, expected output schema, and validation command. Agents must not invent translations, rename IDs, change shared contracts, or claim evidence they did not produce. Parallel work is allowed only when write ownership does not overlap.

## Current implementation sequence

1. Adopt the OZCO multilingual normal form as the lowest stable language contract.
2. Add architecture-owned term definitions and a legacy adapter without rewriting atlas content.
3. Build a small canonical sample and parity tests against existing concepts/registry data.
4. Add KNIGA source/data indexes and locale-aware projections.
5. Migrate one visual slice at a time: glossary, registry, comparison, then guided model views.
6. Add export schema/version metadata and round-trip tests.
7. Extend Russian/English coverage only where source and editorial provenance are explicit.

## Stop conditions

Return to definitions when a term has competing identities, a translation changes meaning, a source cannot be distinguished from synthesis, a relationship endpoint is missing, a model imports a view concern, or a structural move would delete evidence. The correct response is to document the conflict and propose a bounded contract change—not to patch around it in the renderer.

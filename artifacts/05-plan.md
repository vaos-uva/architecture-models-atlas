<!-- ident: artifacts.05-plan
category: artifact
purpose: define
role: documentation
semantic: definition
universe: kniga -->

# KNIGA Foundation Plan

## Agent operating method

The parent agent owns scope, terminology decisions, contracts, integration, exceptions, and final acceptance. Delegated agents receive one bounded responsibility, exact input/output paths, forbidden paths, and an evidence schema. They observe or implement only their slice and stop on contract conflicts.

## Sequence

1. **Discovery:** inventory current IDs, sources, exports, UI surfaces, tests, and risks. No code changes.
2. **Definitions:** freeze multilingual term, provenance, entity, relationship, model, view, and renderer vocabulary.
3. **Goal/DoD:** agree on observable behavior, no-data-loss, accessibility, validation, and rollback gates.
4. **Contracts:** add term, claim, source, relationship, mapping, view, export, and compatibility contracts.
5. **Migration adapter:** add canonical terms alongside legacy records; test parity and round trips.
6. **Queries/projections:** extract pure search, relationship, export, and view-projection functions.
7. **Visual slices:** graph/detail, multilingual glossary, comparison, timeline, and artifact views; one owner per slice.
8. **Independent validation:** type/data integrity, UI/accessibility, export/round trip, and source-traceability checks.
9. **Checkpoint:** record decision, evidence, unresolved risks, accepted deviations, and exact next actions.

## Delegation rules

Parallelize only independent work. Never give two agents overlapping write ownership. Use lightweight agents for inventory and mechanical checks; use stronger agents for synthesis and contracts. No delegated agent may silently rename IDs, weaken the DoD, invent translations, patch unrelated failures, or claim tests it did not run.

## First implementation slice

Add `architecture/terms.ts`, a separate `architecture/models/atlas-terms.ts`, a legacy-ID mapping, validator tests, and documentation. Do not rewrite all consumers until parity is proven.

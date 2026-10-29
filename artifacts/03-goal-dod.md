# KNIGA Goal and Definition of Done

## Goal

Make KNIGA a source-grounded, multilingual architecture knowledge model in which every visible term, relationship, translation, and visual is a reversible projection of canonical data with preserved provenance.

## In scope

- Requested header identity and OZCO author label.
- Canonical multilingual term normal form: display, expressions, ASCII code, English, Russian, provenance, source, edition.
- Explicit model/view/renderer boundaries.
- Richer model entities, typed relationships, claims, mappings, and source evidence.
- Visual projections: graph, comparison, glossary, timeline, and artifact views.
- Agent methodology based on definitions, contracts, plans, bounded slices, validation, and checkpoints.

## Out of scope for the foundation pass

- Full translation of every existing record.
- Wholesale rewrite of `Home.tsx`.
- Destructive taxonomy or database migration.
- Production publishing or custom-domain changes.
- Claims of framework equivalence not supported by sources.

## Acceptance gates

1. Existing IDs, sources, mappings, exports, and visible content remain available.
2. Canonical term codes are unique, ASCII alphanumeric, immutable, and tested.
3. English and Russian values are explicit; missing translations are visible rather than guessed.
4. Models contain facts and provenance; views contain projection choices; renderers contain UI only.
5. Every cross-model mapping has a status and rationale.
6. Exports include schema/version metadata, locale values, stable IDs, and provenance.
7. Graph and table views can identify the source and meaning of each displayed relationship.
8. `pnpm test`, `pnpm run check`, `pnpm run build`, and `git diff --check` pass.
9. Wide and narrow previews remain usable.
10. Each migration has a baseline export, a parity test, and a rollback point.

## Stop conditions

Stop implementation and return to definitions if a requested translation changes identity, a relationship has no resolvable endpoints, a source claim cannot be distinguished from synthesis, or a migration would delete/overwrite existing content.

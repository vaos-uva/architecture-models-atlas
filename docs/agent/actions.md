# Agent Actions

## A. Research and add a framework

1. Clarify the framework, edition, audience, comparison questions, and required artifacts.
2. Read user-provided sources first; add official sources to fill gaps.
3. Extract purpose, scope, concepts, relationships, layers/levels, artifacts, exchange/conformance, boundaries, and edition changes.
4. Assign stable IDs and classify every cross-framework mapping.
5. Add the framework as one `ArchitectureSpecification` registry row.
6. Add a configuration array for the interactive lens; reuse existing enterprise-lens or metamodel components.
7. Add glossary concepts, navigation, source-trail links, comparison cells, export fields, and metadata.
8. Add or extend regression tests for row presence, metadata, IDs, and JSON-safe export.
9. Verify wide and narrow layouts and exercise each new control.
10. Run `pnpm test && pnpm run check && pnpm run build`, then save a checkpoint.

## B. Update the registry

1. Read `client/src/lib/architecture-specification-registry.ts` and its tests.
2. Extend `ArchitectureSpecification` before adding custom fields.
3. Preserve all existing rows and IDs.
4. Ensure search includes metadata and tags; filters compose; sortable columns remain valid.
5. Ensure the detail dialog shows profile, metadata, tags, sources, mappings, and the atlas anchor.
6. Update the registry test when adding a row or field.

## C. Update the UI

1. Find the nearest section and reuse existing class names, tokens, and data-driven renderers.
2. Prefer a typed array plus `.map()` over repeated markup.
3. Give every action a visible result: selection, toast, modal, navigation, download, or share feedback.
4. Check keyboard focus, accessible names, mobile overflow, and reduced motion.
5. Do not replace `client/src/index.css` with a partial stylesheet.

## D. Update backend or storage

1. Read the current server route, schema, DB helper, storage helper, and tests.
2. Make additive schema changes only; generate and inspect SQL before applying it.
3. Keep file bytes in object storage and metadata in the database.
4. Enforce owner scope on list, read, update, and delete paths.
5. Handle failure cleanup so an object is not orphaned when metadata persistence fails.
6. Add tests for success, validation failure, ownership denial, database failure, and storage failure.
7. Run tests, type check, build, and a live API/UI smoke check.

## E. Update documentation

1. Keep root `AGENTS.md` concise and operational.
2. Put details in `docs/agent/`.
3. Add the guide to `docs/INDEX.md`.
4. Link to code entrypoints instead of copying large implementation details.
5. Never include secrets, tokens, or private environment values.

## F. Release/checkpoint

1. Review `git diff` and confirm no generated or secret files changed.
2. Run all validation gates.
3. Verify the changed UI in the live preview.
4. Record limitations and assumptions.
5. Save the WebDev checkpoint only after verification.

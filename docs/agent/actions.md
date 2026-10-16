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

## C. Update the UI or branding

1. Find the nearest section and reuse existing class names, tokens, and data-driven renderers.
2. Prefer a typed array plus `.map()` over repeated markup.
3. Give every action a visible result: selection, toast, modal, navigation, download, or share feedback.
4. Check keyboard focus, accessible names, mobile overflow, and reduced motion.
5. Do not replace `client/src/index.css` with a partial stylesheet.
6. For KNIGA branding, update only the existing brand slot, footer attribution, and `client/index.html` metadata unless a redesign is explicitly requested.
7. Preserve parent-brand and attribution values: KNIGA, OZCO, `kniga.agile-dev.ru`, author, master, color, version, date, Definitions-first, Traceable, copyright, and VA UVA.
8. Verify wide and narrow screenshots after the change.

## D. Update backend or storage

1. Read the current server route, schema, DB helper, storage helper, and tests.
2. Make additive schema changes only; generate and inspect SQL before applying it.
3. Keep file bytes in object storage and metadata in the database.
4. Enforce owner scope on list, read, update, and delete paths.
5. Handle failure cleanup so an object is not orphaned when metadata persistence fails.
6. Add tests for success, validation failure, ownership denial, database failure, and storage failure.
7. Run tests, type check, build, and a live API/UI smoke check.

## E. Update documentation, skill, or roadmap

1. Keep root `AGENTS.md` concise and operational.
2. Put detailed procedures in `docs/agent/` and update `docs/INDEX.md`.
3. Keep reusable domain workflow in `/home/ubuntu/skills/research-to-architecture-atlas/SKILL.md`, not in project-only docs.
4. Before modifying a skill, read `/home/ubuntu/skills/skill-creator/SKILL.md`.
5. Keep skill frontmatter valid, instructions imperative, and the body under 500 lines.
6. Run `python /home/ubuntu/skills/skill-creator/scripts/quick_validate.py research-to-architecture-atlas` after skill edits.
7. Never include secrets, tokens, or private environment values.
8. Update `docs/agent/roadmap.md` when goal, milestone order, gates, host, or product identity changes.

## F. Release, checkpoint, commit, and push

1. Review `git status --short` and `git diff --stat`.
2. Confirm only intended source/docs/skill changes are present; exclude secrets and generated/runtime output.
3. Run `pnpm test`, `pnpm run check`, `pnpm run build`, and `git diff --check`.
4. For UI changes, verify the changed interaction and wide/narrow preview.
5. Validate modified skills with the official validator.
6. Save a WebDev checkpoint after verification.
7. Commit with a concise, descriptive message.
8. Push the intended branch to the configured remote; prefer the explicitly requested remote such as `user_github` when available.
9. Verify the remote head with `git ls-remote --heads <remote> <branch>` and report commit, branch, remote, and validation evidence.
10. Do not force-push, rewrite history, or push a dirty/unvalidated tree unless the user explicitly requests it.

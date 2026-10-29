# Agent Documentation Index

Use this index after reading the repository [`AGENTS.md`](../AGENTS.md). It is intentionally organized as progressive disclosure: start with the smallest guide that matches the task.

## Guides

| Guide | Use when |
|---|---|
| [`actions.md`](agent/actions.md) | You need a step-by-step recipe for research, framework additions, UI, registry, backend, storage, documentation, or release/push work. |
| [`architecture.md`](agent/architecture.md) | You need to understand code entrypoints, data flow, ownership boundaries, product identity, or no-data-loss rules. |
| [`tooling.md`](agent/tooling.md) | You need commands, Git, browser/WebDev verification, source inspection, or safe file operations. |
| [`skills.md`](agent/skills.md) | You need to choose a reusable skill for research, data, web development, storage, configuration, images, or skill authoring. |
| [`testing.md`](agent/testing.md) | You need validation gates, regression coverage, browser smoke checks, or release evidence. |
| [`roadmap.md`](agent/roadmap.md) | You need the current KNIGA product goal, milestone order, Definition of Done, or next implementation item. |
| [`content-style.md`](agent/content-style.md) | You need to write architecture explanations, case studies, comparisons, or source-grounded learning copy. |

## Research notes

- [`2026-10-29-archipeg-model-theory.md`](research/2026-10-29-archipeg-model-theory.md) — evidence, interpretation boundaries, and source URLs for the ArchiPeg and model-theory additions.

## Entry points by task

- **Add or compare a framework:** `client/src/components/architecture/definitions.ts` → `architecture/instances/architecture-specification-registry.ts` → KNIGA data/view → `Home.tsx` → tests → source trail/export.
- **Add taxonomy concepts:** `client/src/components/architecture/models/architecture-taxonomy.ts` → KNIGA data/view → taxonomy UI in `Home.tsx` → stable IDs and provenance tests.
- **Add a component:** decide OZCO-agnostic versus KNIGA product versus architecture-domain ownership before writing JSX; keep definitions, models, and instances in separate files.
- **Modify registry interactions:** registry type/data → `Home.tsx` filters/sort/modal → registry tests → browser smoke test.
- **Modify upload/storage:** `drizzle/schema.ts` → migration → `server/db.ts` → `server/storage.ts` / `server/index.ts` → tests → UI shelf.
- **Modify layout/theme/branding:** `client/index.html` → existing brand JSX in `Home.tsx` → existing tokens in `index.css` → wide/narrow screenshots.
- **Research external sources:** deep-research workflow → official sources → typed data → source trail → validation.
- **Write explanatory architecture content:** `docs/agent/content-style.md` → source claim → plain-language example → explicit boundary.
- **Update the reusable skill:** `/home/ubuntu/skills/skill-creator/SKILL.md` → `/home/ubuntu/skills/research-to-architecture-atlas/SKILL.md` → official validator.
- **Release and push:** roadmap gate → validation commands → diff/status → commit → configured Git remote → verify remote head.

## Useful project files

- `todo.md` — project-level checklist.
- `c4-research.md`, `mof-research.md`, `comparison-research.md` — existing research notes when present.
- `package.json` — authoritative scripts and dependencies.
- `.project-config.json` — WebDev project capabilities; do not copy secrets into docs.
- `client/index.html` — KNIGA product title and canonical host metadata.

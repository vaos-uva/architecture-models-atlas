# Agent Documentation Index

Use this index after reading the repository [`AGENTS.md`](../AGENTS.md). It is intentionally organized as progressive disclosure: start with the smallest guide that matches the task.

## Guides

| Guide | Use when |
|---|---|
| [`actions.md`](agent/actions.md) | You need a step-by-step recipe for research, framework additions, UI, registry, backend, storage, or release work. |
| [`architecture.md`](agent/architecture.md) | You need to understand the code entrypoints, data flow, ownership boundaries, or no-data-loss rules. |
| [`tooling.md`](agent/tooling.md) | You need commands, browser/WebDev verification, source inspection, or safe file operations. |
| [`skills.md`](agent/skills.md) | You need to choose a reusable skill for research, data, web development, storage, or configuration. |
| [`testing.md`](agent/testing.md) | You need validation gates, regression coverage, browser smoke checks, or release evidence. |

## Entry points by task

- **Add or compare a framework:** `client/src/lib/architecture-specification-registry.ts` → `client/src/pages/Home.tsx` → `client/src/index.css` → tests → source trail/export.
- **Add taxonomy concepts:** `client/src/lib/architecture-taxonomy.ts` → taxonomy UI in `Home.tsx` → stable IDs and provenance tests.
- **Modify registry interactions:** registry type/data → `Home.tsx` filters/sort/modal → registry tests → browser smoke test.
- **Modify upload/storage:** `drizzle/schema.ts` → migration → `server/db.ts` → `server/storage.ts` / `server/index.ts` → tests → UI shelf.
- **Modify layout/theme:** `client/src/index.css` → relevant JSX in `Home.tsx` → wide/narrow screenshots.
- **Research external sources:** deep-research workflow → official sources → typed data → source trail → validation.

## Useful project files

- `todo.md` — project-level checklist.
- `c4-research.md`, `mof-research.md`, `comparison-research.md` — existing research notes.
- `package.json` — authoritative scripts and dependencies.
- `.project-config.json` — WebDev project capabilities; do not copy secrets into docs.

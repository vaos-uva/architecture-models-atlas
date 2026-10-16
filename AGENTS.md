# AGENTS.md — KNIGA Architecture Models Atlas

This is the **entrypoint for coding agents** working in this repository. Read this file first, then open only the task-specific guide you need from [`docs/INDEX.md`](docs/INDEX.md).

## 1. Mission

Maintain **KNIGA in OZCO**: a trustworthy, source-grounded, interactive architecture knowledge atlas. Preserve existing research data and UX while making framework additions, taxonomy changes, registry updates, branding, storage changes, and releases typed, traceable, accessible, reversible, and safe to push to Git.

## 2. Progressive disclosure

1. Read this file for non-negotiable rules and commands.
2. Read [`docs/INDEX.md`](docs/INDEX.md) and select the smallest relevant guide.
3. For roadmap work, read [`docs/agent/roadmap.md`](docs/agent/roadmap.md).
4. Inspect the current code entrypoint before editing.
5. Make the smallest configuration-driven change that satisfies the request.
6. Run the validation gates listed below.
7. Record the change in the source trail, tests, release notes, checkpoint, or roadmap as appropriate.

Do not load every document by default. Use the index to disclose detail only when the task requires it.

## 3. Product identity

- Product: **KNIGA**.
- Parent brand: **OZCO**.
- Canonical host: `https://kniga.agile-dev.ru`.
- Visual rule: preserve the existing print-room atlas design; prefer minimal, additive brand changes over redesign.
- Existing attribution values must remain intact: Usanov VA, Master: Usan VA, `#16B8F3`, v2.0, March 2026, Definitions-first, Traceable, agile-dev.ru, VA UVA, and OZCO.

## 4. Repository map

| Area | Entrypoint | Purpose |
|---|---|---|
| Main UI | `client/src/pages/Home.tsx` | Atlas sections, interactions, export/share, storage shelf, product branding |
| Design system | `client/src/index.css` | Editorial palette, layout, responsive rules, focus states |
| HTML metadata | `client/index.html` | Title, description, author, canonical host, theme metadata |
| App shell | `client/src/App.tsx`, `client/src/main.tsx` | Routing, providers, client boot |
| Framework registry | `client/src/lib/architecture-specification-registry.ts` | Typed architecture rows and metadata |
| Taxonomy | `client/src/lib/architecture-taxonomy.ts` | Preserved architecture taxonomy catalogs |
| Backend | `server/index.ts` | Express server, API routes, Vite/static serving |
| Database | `drizzle/schema.ts`, `server/db.ts` | Metadata schema and persistence helpers |
| Storage | `server/storage.ts`, `server/file-storage-utils.ts` | Object storage and upload validation |
| Tests | `server/*.test.ts`, `client/src/lib/*.test.ts` | Backend and registry regression coverage |
| Agent docs | `AGENTS.md`, `docs/` | Repository instructions and progressive disclosure |
| Reusable workflow | `/home/ubuntu/skills/research-to-architecture-atlas/SKILL.md` | Research-to-atlas process |

## 5. Non-negotiable rules

- **No data loss.** Never replace a research dataset, registry row, taxonomy catalog, migration, or stylesheet wholesale unless you have first compared it and preserved all required content.
- **Prefer additive changes.** Add fields, rows, sections, and migrations; do not silently rename or delete existing identifiers.
- **Use stable IDs.** Registry rows, taxonomy entities, concepts, mapping targets, anchors, and exported records need stable IDs.
- **Use configuration, not duplication.** Reuse typed arrays and shared renderers for framework lenses, package lists, cards, tabs, and mappings. Follow DRY and SOLID principles.
- **Keep claims traceable.** Attach source URLs to framework records and label derived mappings as `direct`, `approximate`, `complementary`, `not applicable`, or `atlas synthesis`.
- **Do not expose secrets.** Never commit `.env` files, credentials, database URLs, API keys, session tokens, or generated private URLs to source or documentation.
- **Protect private artifacts.** Storage reads, writes, and deletes must remain owner-scoped. Database metadata and object storage must not drift silently.
- **Preserve accessibility.** Use real buttons/links, labels, focus states, keyboard reachability, readable contrast, table headers, dialog names, and reduced-motion behavior.
- **Do not edit generated/runtime output** (`dist/`, `node_modules/`, `.manus-logs/`) as source changes.
- **Do not push unvalidated work.** Run the release gates and inspect the diff before committing and pushing.

## 6. Standard actions

- **Research a framework:** read [`docs/agent/actions.md`](docs/agent/actions.md) and the reusable research skill first.
- **Add a framework:** update the typed registry, add source-backed content, add the interactive lens, mapping, export, source trail, tests, and responsive verification.
- **Change the registry:** preserve all rows; extend the type before populating metadata; update search/filter/sort/modal/export behavior and regression tests.
- **Change storage/backend:** read [`docs/agent/architecture.md`](docs/agent/architecture.md) and [`docs/agent/testing.md`](docs/agent/testing.md); use additive migrations and owner-scoped tests.
- **Change branding/metadata:** read [`docs/agent/roadmap.md`](docs/agent/roadmap.md); update the existing brand slot and `client/index.html` metadata without redesigning the atlas.
- **Change visuals:** inspect existing CSS and reuse tokens/classes; verify wide and narrow layouts before checkpointing.
- **Update documentation:** keep this file short; put detailed procedures in `docs/agent/` and update the index.
- **Release and push:** follow the release recipe in [`docs/agent/actions.md`](docs/agent/actions.md); push only the validated intended branch/remote.

## 7. Validation gates

Run from the repository root:

```bash
pnpm test
pnpm run check
pnpm run build
git diff --check
```

For UI changes, also verify the live preview at wide and narrow widths and exercise the changed interaction. For schema changes, review generated SQL before applying it. For source additions, verify source links and exported data. For skill changes, run the official skill validator.

## 8. Delivery checklist

Before declaring work complete:

- Existing atlas sections and registry rows still render.
- New data is typed, source-backed, searchable, exportable, and reachable from navigation.
- Product identity and canonical metadata are consistent with KNIGA in OZCO.
- Tests, type check, production build, and diff check pass.
- No secrets or destructive changes were introduced.
- The relevant documentation/index and roadmap are updated.
- A project checkpoint is saved after verification when working through WebDev.
- Git status, commit, branch, and push result are reported accurately.

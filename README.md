<!-- ident: repository.readme
category: documentation
purpose: orient
role: product
semantic: definition
universe: kniga -->

# KNIGA · Architecture Models Atlas

A research-rich, visual atlas for understanding architecture models, standards, and their relationships.

## Product identity

- Product: KNIGA
- Parent brand: OZCO
- Canonical host: https://kniga.agile-dev.ru
- Repository: https://github.com/vaos-uva/architecture-models-atlas
- Attribution: OZCO · Usan VA · VA UVA

This project is a productized knowledge atlas, not a generic documentation site. It highlights architecture description concepts, compares major frameworks, preserves provenance, and supports browsing, filtering, and saving research artifacts.

## What this project does

The project helps readers and practitioners answer questions like:

- What is an architecture description?
- How do ISO 42010, C4, MOF, MDA, TOGAF, ArchiMate, and Dragon1 relate?
- What is the generalized metamodel behind these systems?
- Which concepts are stable across frameworks?
- What are the source claims behind each model?

The app presents those ideas as a layered atlas of conceptual diagrams, cross-model mappings, specification registry entries, and source notes.

## Product intent

The core value proposition is centralized knowledge and interpretation:

- compare models without losing provenance
- keep definitions and visual explanations separate from raw data
- preserve source trail and editorial interpretation
- turn domain complexity into a usable navigation system
- keep knowledge composable and expandable over time

This is designed for broad audiences:

- students and learners
- architects and system thinkers
- product and engineering teams
- researchers and educators
- curious practitioners who need a map of the field

## Repository shape

- `client/` — React front end and UX
- `server/` — API and persistence layer
- `drizzle/` — database schema and migration support
- `docs/` — research, project records, and procedural guidance
- `artifacts/` — design, contracts, and roadmap artifacts
- `AGENTS.md` — instructions for autonomous coding agents
- `MODEL.md` — computation system model for the project

## Local development

Requirements:

- Node.js
- pnpm

Install dependencies:

```bash
pnpm install
```

Run in development mode:

```bash
pnpm dev
```

Build the app:

```bash
pnpm build
```

Run type checking:

```bash
pnpm run check
```

Run tests:

```bash
pnpm test
```

## Project principles

- Preserve the existing atlas identity and visual language.
- Keep product identity stable while evolving functionality.
- Separate domain model, product data, presentation, and persistence.
- Favor additive change and stable IDs.
- Treat source provenance as a first-class requirement.
- Keep the registry extensible for new framework entries and mappings.
- Prefer meaningful browsing and comparison over information dumping.

## Typical workflow

1. Read `AGENTS.md` for contributor rules.
2. Read `docs/INDEX.md` for targeted guidance.
3. Keep changes within owned layers.
4. Validate with type-check, tests, and build.
5. Preserve source-backed content and avoid data loss.

## Notes

This repository is opinionated: it treats architecture knowledge as an evolving, curated system rather than a static dump of references. The success of the product depends on being clear, navigable, and trustworthy—not just technically complete.

## License

MIT

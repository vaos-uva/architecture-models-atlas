# Atlas Architecture Guide

## Runtime flow

```text
Browser
  -> React app (`client/src/main.tsx`)
  -> App shell and route (`client/src/App.tsx`)
  -> Atlas page (`client/src/pages/Home.tsx`)
  -> typed data modules (`client/src/lib/*`)
  -> Express API (`server/index.ts`)
  -> database helpers (`server/db.ts`) and object storage (`server/storage.ts`)
```

## Product identity boundaries

- KNIGA is the product brand.
- OZCO is the parent brand.
- `client/index.html` owns title, description, author, theme, and canonical host metadata.
- The existing brand slot, footer attribution, and existing CSS tokens own visible brand presentation.
- Keep `https://kniga.agile-dev.ru` consistent in canonical metadata, release notes, and product-facing exports where host metadata is appropriate.
- Branding updates should be additive and should not alter atlas section structure or research semantics.

## Frontend boundaries

- `Home.tsx` owns the current single-page atlas composition and local interaction state.
- `architecture-specification-registry.ts` owns normalized framework profiles and typed custom metadata.
- `architecture-taxonomy.ts` owns the preserved taxonomy catalog; do not prune it to simplify a UI.
- `index.css` is the shared visual system. Extend it; do not replace it with a partial file.

## Backend boundaries

- `server/index.ts` owns HTTP routes and server boot.
- `server/db.ts` owns database access and artifact metadata queries.
- `server/storage.ts` owns built-in object-storage calls.
- `server/file-storage-utils.ts` owns validation and filename safety.
- `drizzle/schema.ts` is the source of truth for metadata tables; migrations must be additive and reviewed.

## Data contracts

A framework registry row should retain: stable `id`, name/acronym, kind, status/version, primary question, abstraction, primary artifact, interoperability, atlas anchor, source URLs, tags, and optional JSON-safe metadata.

Mappings must preserve the distinction between:

- direct equivalence;
- approximate or interpretive correspondence;
- complementary roles;
- not applicable; and
- atlas synthesis.

## No-data-loss procedure

Before changing a large file or data module:

1. Read the current file.
2. Identify all exports, rows, IDs, sections, and source links.
3. Create a guarded additive patch with assertions where possible.
4. Inspect the diff and run tests.
5. Confirm existing counts and key IDs remain present.
6. Compare the result with the current roadmap gate before checkpointing.

Never use a scaffold overwrite to replace `Home.tsx`, `index.css`, taxonomy data, migrations, or the registry.

## Roadmap ownership

- Product goal and milestone order: [`roadmap.md`](roadmap.md).
- Repository execution recipes: [`actions.md`](actions.md).
- Implementation boundaries: this guide.
- Current project state and full Definition of Done: shared project file `architecture-atlas-state-goal-dod.md`.

<!-- ident: docs.agent.architecture
category: architecture
purpose: define
role: documentation
semantic: definition
universe: architecture -->

# Atlas Architecture Guide

For the authoritative concern enums, file-header contract, and root-directory placement rules, read [`foundation-governance.md`](foundation-governance.md).

## Runtime flow

```text
Browser
  -> React app (`client/src/main.tsx`)
  -> App shell and route (`client/src/App.tsx`)
  -> Atlas page (`client/src/pages/Home.tsx`)
  -> OZCO primitives (`client/src/components/ozco/abstract/*`)
  -> KNIGA composition and contracts (`client/src/components/kniga/{data,structure,view,source}/*`)
  -> architecture definitions/models/instances (`client/src/components/architecture/*`)
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

- `Home.tsx` owns the current single-page atlas composition and local interaction state; it must not become a data registry.
- `components/ozco/abstract/` owns brand-agnostic contracts/primitives and cannot import KNIGA or architecture data.
- `components/kniga/data/` owns product data contracts and configuration; `structure/` owns product composition contracts; `view/` owns view contracts; `source/` owns source contracts.
- `components/architecture/definitions.ts` owns domain types; `architecture/models/` owns taxonomy/model catalogs; `architecture/instances/` owns concrete registry rows and preserved research instances.
- `architecture-specification-registry.ts` owns normalized framework profiles and typed custom metadata inside `architecture/instances/`.
- `architecture-taxonomy.ts` owns the preserved taxonomy catalog inside `architecture/models/`; do not prune it to simplify a UI.
- `index.css` is the shared visual system. Extend it; do not replace it with a partial file.

Every new or substantially edited authored file must declare its `ident` and `category` at the top. Prefer the full `purpose` / `role` / `semantic` / `universe` classification. A file may not combine domain definitions, model instances, source evidence, view projections, and rendering merely because they are displayed together.

The dependency direction is one-way: OZCO abstract primitives → architecture definitions/models/instances → KNIGA source/data → KNIGA projections/views → renderers. Browser APIs, persistence, and external payloads cross these boundaries only through adapters.

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

Never use a scaffold overwrite to replace `Home.tsx`, `index.css`, taxonomy data, migrations, or the registry. When adding a new concept, decide first whether it is a definition, model catalog, instance, source, or view concern and place it in the corresponding layer.

## Roadmap ownership

- Product goal and milestone order: [`roadmap.md`](roadmap.md).
- Repository execution recipes: [`actions.md`](actions.md).
- Implementation boundaries: this guide.
- Current project state and full Definition of Done: shared project file `architecture-atlas-state-goal-dod.md`.

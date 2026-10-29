<!-- ident: docs.agent.foundation-governance
category: governance
purpose: define
role: documentation
semantic: rules
universe: kniga -->

# KNIGA Foundation Governance

This guide defines the vocabulary and file-ownership rules that every agent uses before changing the atlas. It is intentionally more precise than a general coding guide: it classifies why a concern exists, which layer owns it, and which universe it belongs to.

## Foundation enums

These enums are conceptual governance enums. They may later become TypeScript contracts, but agents must use the same values in plans and file headers now.

| Enum | Allowed values | Question answered |
|---|---|---|
| `ConcernPurpose` | `define`, `research`, `normalize`, `query`, `persist`, `render`, `interact`, `translate`, `compare`, `trace`, `validate`, `govern`, `configure`, `test` | Why does this concern exist? |
| `ConcernRole` | `domain`, `model`, `instance`, `source`, `data`, `structure`, `projection`, `view`, `renderer`, `adapter`, `persistence`, `api`, `test`, `documentation`, `configuration`, `tooling` | What job does the file perform? |
| `ConcernSemantic` | `identity`, `definition`, `relationship`, `provenance`, `taxonomy`, `mapping`, `translation`, `state`, `interaction`, `presentation`, `storage`, `integration`, `validation`, `history`, `derived` | What kind of meaning does it carry? |
| `ConcernUniverse` | `ozco`, `kniga`, `architecture`, `external`, `runtime`, `documentation`, `tooling` | Which bounded world owns the vocabulary? |

A concern is classified as a tuple:

```text
Concern = { purpose, role, semantic, universe }
```

Example: `architecture/models/atlas-terms.ts` is `{ define, model, translation, architecture }`; `kniga/projection/registry.ts` is `{ render, projection, presentation, kniga }`; an OZCO button primitive is `{ render, renderer, presentation, ozco }`.

## Mandatory rules

### RUL-SOC-001 — Separation of concerns

One file has one primary responsibility. Domain definitions must not render UI. Models must not own page state. Instances must not contain CSS or DOM identifiers. Sources own evidence and provenance. Projections adapt models for a screen. Renderers display projections. Persistence and browser APIs stay behind adapters.

### RUL-DRY-002 — One source of truth

Do not duplicate a concept, relationship, mapping, translation, source citation, or visual grammar in a second catalog. Add an index, adapter, or projection. Configuration-driven variants are preferred to copied JSX or parallel arrays.

### RUL-ID-003 — Stable identity

Every semantic record has an immutable identifier. Display labels, translations, array positions, CSS anchors, and file names are not identity. Renames are additive and retain aliases or supersession links.

### RUL-SRC-004 — Provenance before interpretation

Every source-grounded claim has a source reference and evidence status. Derived mappings, editorial bridges, and synthesis are labeled as such. Agents must not upgrade a secondary or interpretive statement into a normative claim.

### RUL-FIL-005 — File identity and classification

Every governed authored file must declare `ident` and `category` at the top. The preferred complete header also declares `purpose`, `role`, `semantic`, and `universe` using the enums above.

Markdown header:

```html
<!-- ident: client.components.architecture.models.atlas-terms
category: model
purpose: define
role: model
semantic: translation
universe: architecture -->
```

TypeScript/TSX header:

```ts
/**
 * ident: client.components.architecture.models.atlas-terms
 * category: model
 * purpose: define
 * role: model
 * semantic: translation
 * universe: architecture
 */
```

The header describes the file, not every symbol in it. Generated files, lockfiles, vendored code, binary assets, `.env` files, and framework-controlled runtime output are exempt and must not be hand-edited.

### RUL-ROOT-006 — Clean root directory

The repository root contains only product entrypoints, build/runtime configuration, package manifests, agent entrypoints, and essential legal/project metadata. Research notes belong in `docs/research/`; planning and product decisions belong in `docs/project/`; agent procedures belong in `docs/agent/`; machine-readable foundation artifacts belong in `artifacts/`.

### RUL-NDL-007 — No data loss

Restructuring changes paths, not meaning. Move files with `git mv`, update links, preserve history, run link checks, and compare counts/exports. Never delete a source note because it appears obsolete; mark it historical or superseded.

### RUL-DEP-008 — Dependency direction

Dependencies point from stable foundations toward compositions: OZCO primitives → architecture/domain contracts → models/instances → KNIGA source/data → projections/views → renderers. A lower layer must not import a higher layer or a product-specific vocabulary.

### RUL-VAL-009 — Gate every boundary change

Before checkpointing, validate tests, type checking, production build, diff whitespace, Markdown links, file headers for changed authored files, and the absence of forbidden imports or root clutter.

## Placement rules

| Content | Location |
|---|---|
| Agent entrypoint | `AGENTS.md` |
| Agent procedures | `docs/agent/` |
| Research notes and source evidence | `docs/research/` |
| Product decisions, ideas, and task lists | `docs/project/` |
| Task discovery, definitions, contracts, plans | `artifacts/` |
| Architecture domain definitions | `client/src/components/architecture/definitions/` or established definitions barrel |
| Architecture model schemas/catalogs | `client/src/components/architecture/models/` |
| Concrete architecture records | `client/src/components/architecture/instances/` |
| KNIGA data/projections/views/source | `client/src/components/kniga/` |
| Brand-agnostic primitives | `client/src/components/ozco/abstract/` |

## Agent procedure

An agent first classifies the requested change, reads the smallest relevant guide, identifies the authoritative file, and writes a bounded plan. It may then modify only its owned paths. A separate validation pass checks ownership, headers, references, tests, and no-data-loss evidence. If the correct category is unclear, stop and ask the parent agent rather than placing the file in a generic folder.

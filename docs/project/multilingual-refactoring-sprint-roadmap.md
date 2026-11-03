<!-- ident: docs.project.multilingual-refactoring-sprint-roadmap
category: project-record
purpose: plan
role: architecture-roadmap
semantic: multilingual-refactoring
universe: kniga -->

# KNIGA Multilingual Refactoring Sprint

## 1. Sprint charter

**Objective:** evolve KNIGA from a partially localized UI into a model-first, source-preserving multilingual atlas in which canonical architecture terms, framework labels, descriptions, navigation, search, comparisons, and exports are derived from stable language-aware model records rather than duplicated strings in renderers.

**Primary languages:** English (`eng`) and Russian (`rus`). The design must allow additional locales later without changing identity or existing records.

**Sprint principle:** definitions and compatibility precede visual expansion.

```text
inventory → contract → canonical instances → parity adapter → projections → renderers → export → release
```

The sprint must improve the model without deleting, renaming, or silently translating existing knowledge.

## 2. Current baseline

### Completed

- OZCO abstract `MultilingualNormalForm` with:
  - `termsExpressions`
  - immutable ASCII alphanumeric `asciiAlphanumericCode`
  - explicit `eng` and `rus`
  - provenance, optional source ID, and edition
- Deterministic validation and normalization helpers.
- Architecture-owned `ArchitectureTerm` adapter.
- Canonical term instances for the existing glossary and registry IDs.
- `legacyIds` mappings that preserve existing kebab-case identifiers.
- KNIGA projections for localized glossary and registry names.
- Home-page search, sorting, filters, context map, and selected-concept readout consuming localized projections.
- Regression coverage for normal form, canonical terms, projections, IDs, sources, metadata, and details.

### Remaining baseline gaps

- Canonical parity has not yet been checked against every existing concept, registry, taxonomy, mapping, artifact, and source label.
- Short descriptions, details, section headings, navigation, controls, and source-trail copy are still mostly English.
- `Home.tsx` still owns substantial view composition and some English editorial copy.
- KNIGA projection modules are not yet separated into a dedicated `kniga/projection/` boundary.
- Export payloads do not yet contain the full versioned multilingual schema promised by the contracts.
- Import → normalize → export → re-import round-trip evidence is not yet implemented.
- Locale-aware search indexing is not yet formalized; translation fallback policy is now explicit in the multilingual contract and rendered through a reusable KNIGA notice.

## 3. Target architecture

```text
OZCO abstract foundation
  └─ MultilingualNormalForm, locale codes, provenance, validators

Architecture domain
  ├─ definitions/      stable contracts and semantic types
  ├─ models/           reusable model rules and integrity checks
  └─ instances/        canonical terms, frameworks, relationships, mappings

KNIGA product
  ├─ source/            source and evidence records
  ├─ data/              legacy catalogs, adapters, queries, exports
  ├─ projection/       locale/device/audience-specific view models
  └─ view/              visual composition and renderer contracts

Runtime and governance
  ├─ client/pages/      orchestration only; no semantic catalogs
  ├─ server/            persistence and API behavior
  ├─ docs/project/      roadmap, task records, decisions
  └─ artifacts/         definitions, contracts, evidence, validation records
```

### Dependency direction

```text
OZCO abstract → architecture definitions → architecture instances
             → KNIGA data/adapters → KNIGA projections → KNIGA views/renderers
```

Forbidden directions:

- OZCO imports architecture or KNIGA.
- Architecture models import React, browser APIs, CSS, or page components.
- Canonical instances import renderers.
- Renderers search raw catalogs or infer translations.
- Source adapters are duplicated inside page components.

## 4. Non-goals and safety boundaries

This sprint does **not**:

- rewrite or reinterpret the architecture research;
- claim that a translation is normative when the source is not available;
- replace legacy IDs with translated or language-specific IDs;
- translate every editorial paragraph before the model and fallback rules are proven;
- migrate persistence or database schema unless a later contract explicitly requires it;
- redesign the visual language of the atlas;
- delete old data because a canonical record is incomplete;
- introduce machine translation without provenance and human review status.

When a source has no verified Russian equivalent, retain the English source value and mark the locale status as missing or editorially pending. Never use an empty string as if it were a completed translation.

## 5. Canonical data contracts

### 5.1 Identity contract

`asciiAlphanumericCode` is the stable semantic identity of a multilingual term. It must match `/^[A-Za-z0-9]+$/`, remain unique, and never change because wording or language changes.

`legacyIds` are compatibility aliases. Every migrated record must retain its original ID and be resolvable in both directions:

```text
legacy ID → canonical code → legacy IDs
```

### 5.2 Locale contract

The first supported locale set is:

```ts
type AtlasLocale = "eng" | "rus";
type UiLocale = "en" | "ru";
```

UI locale codes map to data locale codes in one adapter. Canonical records use data locale codes; browser controls may use UI codes. No component should invent its own locale mapping.

### 5.3 Value and provenance contract

Every localized value has an explicit status:

- `source-quoted` — direct source wording;
- `source-paraphrase` — faithful source-based explanation;
- `normalized` — normalized label or alias;
- `translated` — reviewed translation;
- `editorial` — product explanation;
- `derived` — computed from other records;
- `interpretive-bridge` — analogy across theories or frameworks;
- `unverified` — present but not yet validated;
- `deprecated` — retained for compatibility, not preferred.

A translated value must not overwrite the source wording. A missing value must be represented by an explicit status, not a fabricated fallback.

### 5.4 Projection contract

Every projection declares:

- source model;
- locale;
- audience or screen purpose;
- included records;
- derived fields;
- fallback policy;
- omitted fields;
- stable identity field.

A renderer receives a projection and callbacks only. It does not select translations, perform catalog joins, or own fallback logic.

### 5.5 Export contract

The multilingual export must eventually include:

```ts
type AtlasExport = {
  schemaVersion: string;
  atlasVersion: string;
  defaultLocale: "eng" | "rus";
  supportedLocales: readonly ("eng" | "rus")[];
  terms: readonly MultilingualTermRecord[];
  legacyIdMap: Readonly<Record<string, string>>;
  registry: readonly ArchitectureSpecification[];
  sources: readonly unknown[];
  mappings: readonly unknown[];
  derivation: { generatedAt: string; generator: string };
};
```

The exact source and mapping types must be adopted from the existing contracts before implementation. Export changes are additive and versioned.

## 6. Sprint work packages

### WP-00 — Sprint control and inventory

**Owner:** parent agent / architecture lead.

**Paths:** `docs/project/`, `artifacts/`, `docs/agent/`.

**Tasks:**

1. Create the sprint task IDs and assign one owner per package.
2. Record counts for concepts, registry rows, taxonomy records, mappings, sources, exports, and tests.
3. Produce a baseline manifest of IDs and hashes for no-data-loss comparison.
4. List every user-visible locale surface in `Home.tsx`, `index.html`, and related components.
5. Define the sprint non-goals and stop conditions in the task record.

**Gate:** baseline counts and IDs are reproducible; every work package has bounded paths and an evidence requirement.

### WP-01 — Contract hardening

**Owner:** OZCO/architecture contracts agent.

**Paths:** `client/src/components/ozco/abstract/foundation/`, `client/src/components/architecture/definitions/`, `artifacts/02-definitions.md`, `artifacts/04-contracts.md`.

**Tasks:**

1. Confirm locale, provenance, fallback, status, and identity types.
2. Decide whether `sourceId` must be required for source-backed records.
3. Add explicit `MissingTranslation` / fallback semantics without using blank strings.
4. Validate duplicate codes, duplicate legacy IDs, unknown locales, and invalid provenance.
5. Document whether `termsExpressions` order is semantically meaningful.

**Gate:** invalid states have deterministic test failures; no contract requires a renderer or browser dependency.

### WP-02 — Canonical instance completion

**Owner:** architecture instances agent.

**Paths:** `client/src/components/architecture/instances/`, `client/src/components/architecture/models/`, tests beside instances.

**Tasks:**

1. Complete canonical term coverage for every existing glossary concept.
2. Complete canonical labels for every registry row, taxonomy entity, comparison row, mapping endpoint, and named artifact.
3. Assign one stable ASCII code per semantic term.
4. Attach source IDs, edition metadata, and provenance where evidence exists.
5. Record unresolved translation or identity conflicts instead of guessing.

**Gate:** every current record has exactly one canonical owner or an explicit exception record; no dangling legacy ID remains.

### WP-03 — Reversible legacy adapter and parity

**Owner:** compatibility/data agent.

**Paths:** `client/src/components/kniga/data/`, adapter tests, audit artifacts.

**Tasks:**

1. Build `legacy → canonical` and `canonical → legacy` lookups.
2. Compare old and canonical counts, IDs, fields, sources, anchors, editions, and export keys.
3. Preserve old catalog exports during the migration window.
4. Add parity reports that distinguish equal, intentionally derived, missing, and conflicting values.
5. Make adapter failure loud for unknown IDs and duplicate mappings.

**Gate:** parity report is clean or each deviation has an owner, rationale, and follow-up task; round-trip identity tests pass.

### WP-04 — Projection layer extraction

**Owner:** KNIGA data/projection agent.

**Paths:** `client/src/components/kniga/projection/`, `client/src/components/kniga/data/`, `Home.tsx` only for integration.

**Tasks:**

1. Move current `locale-projections.ts` into the governed projection boundary if no import cycle is introduced.
2. Define typed projections for glossary, registry, comparison, navigation, source trail, and search index.
3. Centralize locale mapping and fallback policy.
4. Keep source model objects immutable and return additive projection objects.
5. Add projection metadata: locale, purpose, generated fields, and fallback counts.

**Gate:** page renderers consume projection objects and no longer contain translation joins or locale conditionals for semantic labels.

### WP-05 — Glossary and core-model migration

**Owner:** glossary/view agent.

**Paths:** `Home.tsx`, `kniga/projection/`, glossary tests, focused CSS only if needed.

**Tasks:**

1. Localize concept names, short descriptions, details, categories, editions, and selected readouts where reviewed values exist.
2. Migrate context cards, SVG map nodes, selected drawer, search, and concept explorer to one glossary projection.
3. Preserve source quotes and citations independently from translated editorial copy.
4. Add keyboard, screen-reader, and narrow-layout checks for both locales.

**Gate:** switching locale changes only projection-backed content; concept IDs, selection state, anchors, and source references remain stable.

### WP-06 — Registry and comparison migration

**Owner:** registry/view agent.

**Paths:** registry projection, `Home.tsx`, registry tests, comparison data/view modules.

**Tasks:**

1. Localize registry names, kinds, primary questions, abstractions, artifacts, metadata labels, and relationship labels.
2. Keep filters and sort keys language-neutral and stable.
3. Search localized values and preserved English source values according to an explicit index policy.
4. Localize comparison rows and mapping cards without changing target IDs or relationship semantics.
5. Verify modal details, source trails, exports, and deep links in both locales.

**Gate:** the same record set, sort order semantics, mapping endpoints, and source URLs exist in both locales.

### WP-07 — Navigation and source-trail migration

**Owner:** product projection agent.

**Paths:** `Home.tsx`, `client/index.html`, KNIGA data/projection modules.

**Tasks:**

1. Define typed locale copy for topbar, navigation rail, controls, empty states, status messages, and accessibility labels.
2. Localize source labels while preserving source URL and evidence status.
3. Localize page metadata only when the canonical title/description contract is defined.
4. Keep brand strings `KNIGA`, `OZCO`, `VAOS` stable unless explicitly approved.

**Gate:** no hard-coded user-facing control string remains outside the approved copy configuration or source-backed content model.

### WP-08 — Versioned export and round trip

**Owner:** data/export agent.

**Paths:** `client/src/components/kniga/data/`, export tests, source/contract modules.

**Tasks:**

1. Add `schemaVersion`, `atlasVersion`, `defaultLocale`, and `supportedLocales`.
2. Export canonical terms, legacy map, registry, sources, mappings, provenance, and derivation metadata.
3. Implement import validation and normalize → export behavior.
4. Test export → import → export semantic equivalence.
5. Preserve the existing download shape through a compatibility field or explicit migration version.

**Gate:** no stable ID, source reference, metadata field, relationship endpoint, or locale value disappears across a round trip.

### WP-09 — Structural cleanup

**Owner:** architecture lead plus repository-maintenance agent.

**Paths:** governed component directories, documentation links, aliases, tests.

**Tasks:**

1. Move projections into `kniga/projection/` only after WP-04 parity is green.
2. Separate remaining model instances from view configuration.
3. Update imports, indexes, scaffold aliases, and progressive-disclosure docs.
4. Use `git mv` and retain history.
5. Audit root-directory placement and required file identity headers.

**Gate:** no forbidden dependency direction, stale path, missing header, broken link, or root clutter is introduced.

### WP-10 — Independent validation and release

**Owner:** parent agent / validation agent.

**Paths:** tests, artifacts, checkpoint, release record.

**Tasks:**

1. Run focused contract, instance, adapter, projection, export, and UI tests.
2. Run full Vitest, TypeScript, production build, diff check, Markdown link/header audit, and source/ID audit.
3. Verify English/Russian at wide and narrow viewports.
4. Verify registry modal, glossary selection, search, filters, sorting, download, and source links.
5. Save checkpoint; commit/push only after explicit release approval.

**Gate:** Definition of Done is complete and evidence is recorded with exact commands and results.

## 7. Dependency graph and execution order

```text
WP-00 inventory
   ↓
WP-01 contracts ───────────────┐
   ↓                           │
WP-02 canonical instances      │
   ↓                           │
WP-03 reversible adapter ──────┘
   ↓
WP-04 projection boundary
   ├──────── WP-05 glossary/core model
   ├──────── WP-06 registry/comparison
   └──────── WP-07 navigation/source trail
              ↓
         WP-08 versioned export
              ↓
         WP-09 structural cleanup
              ↓
         WP-10 validation/release
```

WP-05, WP-06, and WP-07 may run in parallel only after WP-04 defines the shared projection contract and each agent owns distinct files. WP-08 must wait for the final canonical fields and projection omissions. WP-09 must not begin while parity or export tests are red.

## 8. Suggested sprint cadence

### Day 1 — Frame and baseline

Complete WP-00. Freeze scope, assign task IDs, capture manifests, and publish the baseline evidence. No UI edits.

### Day 2 — Contracts

Complete WP-01. Resolve fallback, provenance, locale, source, and code semantics. Add invalid-case tests.

### Days 3–4 — Canonical records and compatibility

Complete WP-02 and WP-03 sequentially. Populate missing instances, generate parity output, and resolve conflicts. Keep legacy consumers active.

### Day 5 — Projection boundary

Complete WP-04. Extract pure projections and establish a shared locale/search/fallback policy.

### Days 6–7 — Parallel product slices

Run WP-05, WP-06, and WP-07 in isolated ownership slices. Each agent must submit changed paths, projection contract, tests, and unresolved translation list.

### Day 8 — Export and round trip

Complete WP-08. Test compatibility with the existing download and prove no-data-loss round trips.

### Day 9 — Structural cleanup

Complete WP-09 only after all parity and export tests pass. Update docs and imports with history-preserving moves.

### Day 10 — Independent validation and release decision

Complete WP-10. Record evidence, compare against the DoD, checkpoint, and prepare a release summary. A push remains a separate explicit action.

If the sprint is shorter, preserve the order and reduce breadth rather than skipping contract or parity gates.

## 9. Agent delegation protocol

Every delegated task message must contain:

1. **Purpose:** one measurable result.
2. **Inputs:** exact files, IDs, counts, or source records.
3. **Owned paths:** files the agent may change.
4. **Forbidden paths:** files owned by another work package.
5. **Contract:** types, invariants, and fallback policy to preserve.
6. **Output:** changed files, decisions, unresolved conflicts, and evidence.
7. **Validation:** exact command or test target.
8. **Stop conditions:** what requires escalation to the parent agent.

Agents must not:

- invent translations without explicit provenance;
- change identity codes or legacy IDs;
- update a renderer to conceal a model conflict;
- modify shared contracts without notifying downstream owners;
- claim parity from a sample when the full catalog was not checked;
- move files without updating references and checking history.

## 10. Risk register

| Risk | Signal | Prevention | Response |
|---|---|---|---|
| Translation changes meaning | English/Russian values diverge semantically | provenance and review status | mark `unverified`, return to definitions |
| Identity drift | duplicate code or missing legacy ID | uniqueness and reverse-map tests | stop migration; restore adapter |
| Data loss | lower record/source/export counts | baseline manifest and round trips | rollback consumer slice; retain legacy source |
| Renderer becomes semantic | locale joins or source lookup in JSX | projection contract and audits | extract pure projection before continuing |
| Search regression | localized query misses known records | dual-locale index policy | add indexed normalized fields and tests |
| Mapping corruption | wrong target or missing relationship | endpoint and parity tests | block release; repair canonical instance |
| Import cycle | architecture imports KNIGA or page | dependency graph check | move adapter downward or split contract |
| UI regression | overflow, unreadable labels, broken focus | wide/narrow locale smoke tests | fix projection/display constraints, not model data |
| Scope expansion | requests for broad narrative translation | explicit non-goals | create a follow-up task, do not bypass gates |

## 11. Definition of Done

The sprint is complete only when all statements are true:

### Model and data

- Every existing concept and registry row resolves to one canonical term or an explicit documented exception.
- Every canonical term has a stable ASCII code, preserved legacy ID mapping, explicit provenance, and locale status.
- No existing source URL, edition, anchor, metadata field, mapping endpoint, or export key is lost.
- Duplicate codes, duplicate legacy IDs, invalid locales, and dangling mappings fail validation.

### Projections and UI

- Glossary, core map, registry, comparison, navigation, and source-trail surfaces consume locale-aware projections.
- Renderers do not contain semantic translation joins or raw-catalog searches.
- English and Russian preserve selection, sorting, filtering, deep links, source trails, and stable IDs.
- Missing translations are visible as explicit fallback/status behavior rather than empty or invented content.

### Export and compatibility

- Export contains schema/version metadata, canonical terms, legacy map, locales, sources, provenance, mappings, and derivation metadata.
- Existing consumers can still read the compatibility export shape during the migration window.
- Export/import/export round trip preserves semantic content and all references.

### Engineering and governance

- `pnpm test` passes with focused coverage for contracts, instances, adapters, projections, exports, and existing storage behavior.
- `pnpm run check` and `pnpm run build` pass.
- Markdown links, identity headers, root placement, dependency direction, and `git diff --check` pass.
- Wide and narrow browser verification passes in both locales.
- Documentation, task registry, evidence, and unresolved risks are updated.
- A checkpoint exists; commit and push happen only through explicit release approval.

## 12. Immediate next actions

1. Create WP-00 baseline manifest and task IDs.
2. Complete parity for all current concepts, registry rows, taxonomy records, mappings, and source references.
3. Formalize missing-translation/fallback status before expanding Russian copy.
4. Extract the projection boundary and migrate glossary, registry, and comparison in separate slices.
5. Implement versioned export and round-trip tests before structural cleanup.

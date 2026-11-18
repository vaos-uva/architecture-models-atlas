<!-- ident: docs.project.recommendations-2026-11-18
category: project-record
purpose: recommend
role: architecture-lead
semantic: product-evaluation
universe: kniga -->

# KNIGA in OZCO — Current Analysis and Recommendations

**Date:** 2026-11-18  
**Baseline checkpoint:** `93298c9e`  
**Scope:** architecture atlas product, AutoDev methodology, multilingual model, full-stack storage, and release readiness.

## Executive assessment

KNIGA is now a strong validated research-atlas prototype with a coherent visual identity, typed architecture registry, multilingual foundations, source trail, export/share affordances, File Storage integration, and a first AutoDev control room. The implementation is not yet a production-grade knowledge system because identity, artifact ownership, storage lifecycle, and end-to-end authorization are still prototype-level.

The most important recommendation is to stop adding visual lenses temporarily and complete one vertical slice of trustworthy persistence: authenticated identity → owner-scoped artifact metadata → object lifecycle cleanup → integration tests → browser smoke evidence. This will convert the existing full-stack scaffolding into a reliable product foundation without risking research-data loss.

## What is working well

1. **The product has a clear conceptual identity.** KNIGA is correctly positioned as the product inside OZCO, and the existing editorial design supports dense technical material rather than looking like a generic dashboard.
2. **The domain boundary is unusually strong for this stage.** OZCO abstract foundations, KNIGA product layers, and architecture definitions/models/instances are documented and mostly separated.
3. **The research experience is broad and explorable.** The registry, framework lenses, mappings, UML/MOF/XMI artifacts, source trail, search/filter/sort controls, download, share fallback, and File Storage shelf provide a credible atlas experience.
4. **The agent methodology is reusable.** AutoDev has configuration-driven roles, deterministic scans and metrics, explicit registry/roadmap links, persistent browser evidence, and tests. This is a good foundation for gated delegation rather than ad-hoc execution.
5. **The repository is currently clean and validated.** The latest checkpoint reports 29 passing tests, TypeScript success, production build success, preview verification, and no uncommitted changes.

## Main findings and risks

### P0 — Identity and ownership are not production-safe

`server/db.ts` creates a synthetic `browser:<session>` identity from the `atlas_session` cookie. This is acceptable for a prototype but does not provide explicit authentication, cross-device access, recovery, or reliable ownership semantics. The saved Definition of Done already identifies this as the first production blocker.

**Recommendation:** integrate the existing Manus OAuth path or another explicit identity provider before expanding private collaboration features. Keep public atlas content unauthenticated, but make every private artifact operation require a real authenticated user.

**Acceptance evidence:** login/logout/session-expiry tests; an authenticated user can list only their own artifacts; cross-user read/delete attempts are rejected; the UI clearly distinguishes public atlas content from private shelf content.

### P0 — Storage deletion leaves object-storage risk

`server/index.ts` calls `deleteFile`, while `server/db.ts` deletes only the metadata row. The corresponding object-storage key is not deleted. This creates orphaned objects and makes “Remove” semantically incomplete.

**Recommendation:** change deletion to a two-phase lifecycle: load and authorize metadata, delete the object, then delete metadata; if metadata deletion fails after object deletion, record a recoverable cleanup state or retry job. Also add a safe orphan-audit command/report.

**Acceptance evidence:** successful delete removes both metadata and object; object-delete failure preserves metadata and returns a clear error; database failure is tested; orphan detection identifies unreferenced keys.

### P0 — Upload path is memory-heavy and lacks rollback

The upload API accepts base64 JSON under a 12 MB request limit, decodes the entire file into memory, uploads it, and then inserts metadata. It has no visible progress and no cleanup when the metadata write fails.

**Recommendation:** keep the current path only as a bounded compatibility path. Implement presigned or streaming transfer as the durable path, with a small server-side metadata transaction and explicit cleanup on failure. Do not increase the file-size limit until this is complete.

**Acceptance evidence:** size/type/title/description validation tests; upload progress and failure UI; metadata-write failure cleanup; no full-file base64 buffering in the durable path.

### P1 — AutoDev is evidence display, not yet an execution system

The AutoDev dashboard currently seeds completed evidence into browser local storage and displays role metrics and traceability. It does not yet create, transition, or append evidence to work items from the UI, and its history is not cross-device or authenticated.

**Recommendation:** keep the current dashboard as the read model, then add a small command layer with explicit transitions: `planned → ready → in-progress → done|blocked`. Each transition should require an evidence record and preserve immutable history. Persist this in the database only after identity/ownership is fixed.

**Acceptance evidence:** invalid transitions fail; every `done` item has evidence; work-item, registry, and roadmap IDs remain stable; history is append-only; the dashboard can render an empty, loading, error, and populated state.

### P1 — Multilingual foundations are ahead of multilingual coverage

The canonical normal form, fallback states, projections, and translation completeness metrics are implemented. However, the roadmap still reports that descriptions, details, navigation, controls, comparison content, source-trail copy, and export schema are not fully projection-backed. `Home.tsx` still owns substantial composition and editorial strings.

**Recommendation:** execute the existing roadmap in order: parity inventory → projection boundary → glossary/registry/navigation slices → versioned export round trip. Do not translate more prose before the projection contract and parity report are complete.

**Acceptance evidence:** every visible locale surface is inventoried; no semantic renderer performs ad-hoc translation joins; EN/RU preserve the same IDs, mappings, anchors, sources, and sort semantics; export → import → export is semantically equivalent.

### P1 — Source status needs to be visible at the claim level

The atlas has a source trail and research notes, but users can still experience the comparison as a unified model unless normative claims, secondary explanations, derived mappings, and atlas synthesis are visually distinguished everywhere.

**Recommendation:** add a compact evidence badge/legend to framework cards, mapping rows, artifact readouts, and registry details. Use the existing provenance vocabulary: source-quoted, source-paraphrase, translated, editorial, derived, interpretive-bridge, and atlas synthesis.

**Acceptance evidence:** each major claim or mapping exposes evidence status and source link; derived mappings cannot be mistaken for normative equivalence; export includes provenance and derivation metadata.

### P1 — Taxonomy remains under-exposed

The typed taxonomy is preserved, but the user-facing atlas still exposes it mainly through summaries and code-level records. This limits the product’s value as a reusable architecture knowledge system.

**Recommendation:** build a dedicated taxonomy explorer after persistence hardening. Start with browse/filter by domain, layer, category, framework, and artifact type; then add a detail drawer showing definition, relationships, provenance, and related registry rows.

**Acceptance evidence:** taxonomy records are searchable by stable ID and localized label; detail views retain source and relationship traceability; no taxonomy record is lost from export.

## Recommended execution order

### Phase 1 — Trust boundary and storage safety

1. Replace browser-session identity with explicit authentication.
2. Make all file queries and mutations owner-scoped and test cross-user denial.
3. Implement object deletion and upload rollback.
4. Add integration tests for auth, upload, list, delete, failure, and ownership.

**Stop condition:** do not add collaborative or cross-device artifact features until all four are green.

### Phase 2 — Contract and parity control

5. Freeze the multilingual export contract and version metadata.
6. Produce a no-data-loss manifest for concepts, registry rows, taxonomy entities, mappings, sources, artifacts, and IDs.
7. Extract `kniga/projection/` and formalize locale/search/fallback projections.
8. Complete EN/RU parity for registry, glossary, navigation, comparison, and source trail.

**Stop condition:** do not structurally clean up or delete legacy adapters while parity or round-trip tests are red.

### Phase 3 — AutoDev as a governed workflow

9. Add typed state-transition rules and append-only evidence records.
10. Add a database-backed history projection after authentication.
11. Add roadmap and registry detail links, not only anchor links.
12. Add an operator release gate that reports exact commands, commit SHA, changed paths, and unresolved risks.

**Stop condition:** no work item may be marked `done` without acceptance evidence and a validation result.

### Phase 4 — Knowledge-system expansion

13. Add the taxonomy explorer.
14. Add claim-level provenance badges and an evidence legend.
15. Add framework/version/source filters and deep links.
16. Add browser smoke coverage for both locales and narrow layouts.

## Suggested next task for the agent system

**Task ID:** `TRUST-001`  
**Purpose:** replace synthetic browser identity with explicit authenticated ownership for the File Storage shelf.  
**Owned paths:** `server/auth*`, `server/db.ts`, `server/index.ts`, `drizzle/schema.ts`, ownership tests, relevant UI state.  
**Forbidden paths:** architecture research instances, registry content, visual redesign, multilingual canonical records.  
**Contract:** preserve all existing file metadata fields; keep public atlas content available; reject unauthenticated private operations; no data loss.  
**Output:** changed files, migration SQL, auth/ownership decisions, unresolved risks, and exact validation evidence.  
**Validation:** `pnpm test`, `pnpm run check`, `pnpm run build`, `git diff --check`, and browser smoke checks for login, list, upload, and delete.  
**Stop conditions:** missing OAuth configuration, destructive migration, ambiguous ownership of existing browser-session files, or any failed cross-user isolation test.

## Decision summary

- **Continue:** source-grounded atlas content, typed registry, additive multilingual projections, AutoDev role methodology, and compact evidence-first UI.
- **Pause:** additional framework lenses, broad visual redesign, and large-scale prose translation.
- **Prioritize:** authentication, ownership, storage cleanup, integration tests, export/parity contracts, then taxonomy exploration.
- **Preserve:** all stable IDs, research rows, source URLs, legacy adapters, existing visual language, and rollback checkpoints.

## Reference records

- [`architecture-atlas-state-goal-dod.md`](../../projects/architecture-atlas-e2c8475d/architecture-atlas-state-goal-dod.md) — baseline goal and Definition of Done.
- [`multilingual-refactoring-sprint-roadmap.md`](multilingual-refactoring-sprint-roadmap.md) — active multilingual work packages and gates.
- [`AGENTS.md`](../../AGENTS.md) — repository governance and validation rules.
- `server/db.ts` and `server/index.ts` — current identity, upload, and deletion implementation.

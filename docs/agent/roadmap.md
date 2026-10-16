# KNIGA Product Roadmap

## Product identity

- Product: **KNIGA**.
- Parent brand: **OZCO**.
- Canonical host: `https://kniga.agile-dev.ru`.
- Product promise: a source-grounded architecture knowledge system for exploring, comparing, extending, saving, and safely sharing architecture models and artifacts.
- Visual constraint: keep the existing print-room atlas aesthetic; prefer small, additive changes.

## Current state

The atlas contains ISO/IEC/IEEE 42010, C4, OMG MOF, TOGAF, ArchiMate, Dragon1, a generalized metamodel, a typed architecture registry, preserved taxonomy data, cross-model mappings, UML/MOF artifacts, an XMI walkthrough, source-backed exports, share/download actions, and a prototype File Storage shelf.

The repository has a full-stack Express/database/object-storage path, but identity and storage lifecycle are still prototype-grade. Browser-session identity is not equivalent to authenticated account ownership, base64 uploads are not an ideal durable transfer path, and object cleanup/integration coverage require hardening.

## Execution order

### Milestone 1 — Identity and ownership

1. Replace synthetic browser-session identity with Manus OAuth or another explicit authenticated identity.
2. Make artifact ownership explicit in the database and API.
3. Add session expiry, login/logout, unauthorized behavior, cross-user denial, and owner-scope tests.
4. Keep public atlas content visibly separate from private artifacts.

**Gate:** authenticated owner can create, list, read, and delete only their own artifacts; all authorization tests pass.

### Milestone 2 — Storage lifecycle safety

1. Delete the storage object when metadata is deleted.
2. Clean up the object when a metadata write fails after upload.
3. Prefer streaming or presigned transfer over base64 JSON where practical.
4. Add orphan detection/cleanup and upload progress/failure feedback.

**Gate:** success and every failure path leave no unmanaged object or misleading metadata row.

### Milestone 3 — Taxonomy exploration

1. Expose the preserved taxonomy as a browsable/searchable UI.
2. Filter entities by domain, layer, category, framework, and artifact type.
3. Add detail views for definitions, relationships, provenance, and related frameworks.
4. Preserve stable identifiers and JSON-safe export behavior.

**Gate:** a user can move from a taxonomy entity to related registry entries, sources, and artifacts without losing context.

### Milestone 4 — Knowledge trust and comparison

1. Visually distinguish normative source claims from derived mappings and atlas synthesis.
2. Show mapping status labels and rationales consistently in the registry and comparison UI.
3. Add a clear assumptions/interpretation panel to the source trail.
4. Add derived metrics only with visible counting rules.

**Gate:** users can tell what is sourced, inferred, complementary, or not applicable.

### Milestone 5 — Verification and operations

1. Add browser smoke coverage for registry, metamodel, download/share, upload, and deletion flows.
2. Add operational logging, health visibility, rate limiting, and cleanup tooling.
3. Add release notes with validation evidence, limitations, and rollback/checkpoint references.
4. Keep the KNIGA host, metadata, and parent-brand attribution consistent across UI, export, and deployment.

**Gate:** wide/narrow UI checks, test/check/build, runtime smoke checks, and release evidence are complete before push.

## Definition of Done for Atlas v2

- Knowledge claims, mappings, and exports are traceable and accurately labeled.
- Taxonomy entities are browsable, searchable, related, and provenance-aware.
- Registry interactions remain typed, stable, accessible, and responsive.
- Authentication and ownership are explicit and tested.
- Storage upload, failure, deletion, and cleanup paths are safe.
- Browser smoke checks cover all critical interactions.
- `pnpm test`, `pnpm run check`, `pnpm run build`, and `git diff --check` pass.
- The reusable `research-to-architecture-atlas` skill passes `quick_validate.py`.
- KNIGA branding, `kniga.agile-dev.ru`, OZCO parent attribution, and release metadata are consistent.
- A verified WebDev checkpoint and Git commit/push exist for the delivered state.

# KNIGA Foundation Definitions

## Canonical term normal form

Every user-facing research term or expression is represented as:

```ts
type AtlasTerm = {
  code: string;          // immutable ASCII alphanumeric identity
  display: string;       // preferred display expression
  expressions: string[]; // aliases and source spellings
  english: string;
  russian: string;
  provenance: "source" | "translation" | "editorial" | "synthesis";
  source?: string;       // source-record ID, not a free-form citation
  edition?: string;      // preserved verbatim
};
```

`code` is identity. Labels, translations, editions, and source spellings are not identity. Existing kebab-case IDs remain valid legacy IDs and are mapped additively; they are not silently renamed.

## Model and view

A **model** is source-grounded semantic content: entities, concepts, relationships, constraints, claims, sources, mappings, and version metadata.

A **view** is a purposeful projection of the model for an audience, question, locale, device, or visual form. Examples are glossary, comparison table, relationship graph, timeline, guided path, and artifact diagram.

A **renderer** turns a view projection into UI. It must not search raw catalogs, fetch data, own provenance, or infer semantic equivalence.

## Provenance states

Use explicit states: `source-quoted`, `source-paraphrase`, `normalized`, `derived`, `interpretive-bridge`, `unverified`, and `deprecated`. Secondary explanations never become normative claims by presentation alone.

## Ownership boundaries

- `architecture/definitions` — domain contracts and stable IDs.
- `architecture/models` — reusable model definitions and validation.
- `architecture/instances` — concrete framework and research records.
- `kniga/source` — source, claim, and evidence contracts.
- `kniga/data` — catalogs, queries, adapters, and exports.
- `kniga/projection` — screen-specific view models.
- `kniga/view` / `renderer` — visual composition and rendering.
- `ozco/abstract` — brand-agnostic primitives only.

## Invariants

No duplicate stable IDs. No dangling relationship endpoints. No source-backed claim without evidence or an explicit `unverified` status. No translation may replace source wording. No model module imports React, browser APIs, CSS, or renderer code. No renderer imports persistence or source adapters.

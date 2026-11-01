<!-- ident: artifacts.02-definitions
category: artifact
purpose: define
role: documentation
semantic: definition
universe: kniga -->

# KNIGA Foundation Definitions

## Canonical term normal form

Every user-facing research term or expression is represented as:

```ts
type MultilingualNormalForm = {
  termsExpressions: readonly string[]; // ordered aliases/source spellings
  asciiAlphanumericCode: string;        // immutable identity: [A-Za-z0-9]+
  eng: string;                         // explicit English value
  rus: string;                         // explicit Russian value
};

type MultilingualTermRecord = MultilingualNormalForm & {
  provenance: "source-quoted" | "source-paraphrase" | "normalized" | "translated" | "editorial" | "derived" | "interpretive-bridge" | "unverified" | "deprecated";
  sourceId?: string;
  edition?: string;                    // preserved verbatim
};
```

`asciiAlphanumericCode` is identity. Labels, translations, editions, and source spellings are not identity. Existing kebab-case IDs remain valid legacy IDs and are mapped additively; they are not silently renamed. The executable contract lives in `client/src/components/ozco/abstract/foundation/multilingual.ts`.

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

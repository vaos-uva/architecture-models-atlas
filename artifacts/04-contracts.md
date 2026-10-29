<!-- ident: artifacts.04-contracts
category: artifact
purpose: define
role: documentation
semantic: definition
universe: kniga -->

# KNIGA Contract Baseline

## Term contract

`AtlasTerm.code` matches `/^[A-Za-z0-9]+$/`; codes are unique and immutable. `display`, `english`, and `russian` are non-empty. `expressions` is ordered and deduplicated. `provenance` is explicit. `source` references a source record; `edition` remains opaque and verbatim.

## Compatibility contract

Legacy concept, taxonomy, registry, and source records remain readable. Canonical terms are additive and exposed through adapters. Existing IDs, fields, descriptions, anchors, editions, URLs, and export keys are preserved until a later approved deprecation.

## Model contract

Domain records contain stable IDs, semantics, relationships, claims, source references, status, and version. They do not contain CSS classes, DOM anchors, React nodes, browser state, or renderer callbacks.

## View contract

A view projection declares its source model, purpose, locale, included entities/relationships, filters, derived values, and omissions. A renderer consumes only the projection and narrow callbacks.

## Export contract

Exports include `schemaVersion`, `atlasVersion`, `defaultLocale`, supported locales, stable IDs, localized terms, source references, provenance, mappings, relationships, and derivation metadata. Import → normalize → export → re-import must preserve content and references.

## Invalid cases

Reject duplicate codes, invalid code characters, empty translations, unknown provenance, dangling relationship endpoints, mappings without status/rationale, and exports without version metadata. Do not repair these silently.

<!-- ident: artifacts.01-discovery
category: artifact
purpose: define
role: documentation
semantic: definition
universe: kniga -->

# KNIGA Discovery Baseline

## Facts

- The product is a React/TypeScript full-stack atlas with typed architecture definitions, concrete instances, KNIGA data, OZCO abstract primitives, source links, registry, export, storage, tests, and responsive rendering.
- `Home.tsx` remains a large composition and interaction root with data lookups, filtering, export, storage effects, and JSX.
- Existing research content is primarily English and uses heterogeneous shapes.
- Existing stable IDs, source URLs, mappings, and exports are user-visible compatibility surfaces.
- The requested header identity is a minimal presentation change; broader multilingual/model/view work requires contracts first.

## Risks

- Translation fields could accidentally become identity.
- Model facts and view labels are currently mixed in some data modules.
- A graph built before relationship/provenance contracts would duplicate or overstate content.
- Broad parallel edits could collide or silently lose data.

## Recommended next step

Implement the term contract and validator as an additive layer, then create a lossless legacy adapter before changing search, glossary, or export consumers.

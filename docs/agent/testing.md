# Testing and Validation Guide

## Required gates

Run all three before delivery:

```bash
pnpm test
pnpm run check
pnpm run build
```

## Regression coverage

- Registry tests must prove required rows remain present, metadata is JSON-safe, and stable IDs do not drift.
- Storage tests must cover filename safety, MIME/type checks, size limits, and validation failures.
- Backend changes should add ownership, failure cleanup, and route-level coverage rather than relying only on utility tests.

## Browser smoke checks

For changed UI, verify:

- navigation anchor and section rendering;
- registry search, type/version/tag filters, sorting, empty reset, and detail dialog;
- concept/map selections and metamodel tabs;
- comparison table and mapping labels;
- download output and share/clipboard fallback;
- upload, list, delete, and unauthenticated behavior when storage is changed;
- keyboard focus, dialog naming, table headers, narrow-screen scrolling, and readable contrast.

## Evidence to record

Record the commands run, test count, build result, visual checks, known limitations, and checkpoint/version in the task response or project release note. Do not claim production readiness when browser-session identity, object cleanup, or upload streaming remain prototype limitations.

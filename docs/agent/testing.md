# Testing and Validation Guide

## Required gates

Run all four before delivery:

```bash
pnpm test
pnpm run check
pnpm run build
git diff --check
```

For reusable skill changes, also run:

```bash
python /home/ubuntu/skills/skill-creator/scripts/quick_validate.py research-to-architecture-atlas
```

## Regression coverage

- Registry tests must prove required rows remain present, metadata is JSON-safe, and stable IDs do not drift.
- Storage tests must cover filename safety, MIME/type checks, size limits, and validation failures.
- Backend changes should add ownership, failure cleanup, and route-level coverage rather than relying only on utility tests.
- Product metadata changes should preserve KNIGA, OZCO, canonical host, author, version, and attribution values.

## Browser smoke checks

For changed UI, verify:

- navigation anchor and section rendering;
- registry search, type/version/tag filters, sorting, empty reset, and detail dialog;
- concept/map selections and metamodel tabs;
- comparison table and mapping labels;
- download output and share/clipboard fallback;
- upload, list, delete, and unauthenticated behavior when storage is changed;
- keyboard focus, dialog naming, table headers, narrow-screen scrolling, and readable contrast;
- branding header, footer attribution, document title/metadata, and mobile header when identity changes.

## Evidence to record

Record the commands run, test count, build result, visual checks, known limitations, checkpoint/version, Git commit, branch, remote, and push verification in the task response or project release note. Do not claim production readiness when browser-session identity, object cleanup, or upload streaming remain prototype limitations.

## Release evidence

Before push:

1. Inspect `git status --short`, `git diff --stat`, and `git diff --check`.
2. Confirm no secrets, generated runtime output, or unintended data changes are present.
3. Commit only after all gates pass.
4. Push the intended branch to the configured remote.
5. Verify the remote head with `git ls-remote --heads <remote> <branch>`.

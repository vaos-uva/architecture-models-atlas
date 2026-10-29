<!-- ident: docs.agent.tooling
category: agent-guide
purpose: govern
role: documentation
semantic: rules
universe: documentation -->

# Agent Tooling

## Local commands

```bash
pnpm test                 # Vitest regression suite
pnpm run check            # TypeScript, no emit
pnpm run build            # Vite frontend + bundled Express server
pnpm run dev              # Full-stack development server
pnpm run format           # Prettier
pnpm run db:push          # Generate/apply Drizzle migrations; review first
git status --short        # Pending changes
git diff --check          # Whitespace/error check
git diff --stat           # Change surface
git log --oneline -6      # Recent checkpoints/commits
git ls-remote --heads user_github main  # Verify pushed head
```

Use `git show <checkpoint>:<path>` to recover prior safe versions. Use `rg`, `find`, `sed`, and `cat` for bounded source inspection. Read before editing; prefer precise patches or complete rewrites only when the entire file is intentionally reconstructed.

## Browser and WebDev verification

For UI work, use the project’s WebDev preview and browser-capable tools to:

- open the relevant anchor or route;
- inspect rendered text and screenshots;
- exercise search, filters, sorting, tabs, dialogs, download/share, and storage actions;
- verify wide and narrow viewports;
- inspect console/runtime errors when behavior is unexpected.

Prefer a focused screenshot or anchor check over repeatedly capturing the entire page. For branding changes, verify the header, footer attribution, document title/metadata, and mobile header.

## External research

Use official source pages first. For text-only pages, fetch the page content; for dynamic pages or interactions, use a browser. Record source URLs in the atlas data and visible source trail. For five or more independent comparable research items, route through the workflow-composer skill.

## Manus capabilities and tools

- **WebDev / `manus-tools`:** project initialization, feature edits, status, restart, screenshots, browser preview, checkpoints, and SQL execution.
- **Sandbox file tools:** read/write/edit repository files; use absolute paths in tool calls.
- **`manus-config`:** inspect and save project files, connectors, agent profiles, and schedule configuration; use the relevant skill first.
- **`manus-device`:** inspect authorized execution environments and switch only when required.
- **Search/fetch:** current external research; read deep-research guidance first.
- **Git/GitHub CLI:** inspect, commit, push, and verify the configured project remote. Do not assume access to unrelated repositories.

## Safe file operations

- Use repository-relative paths in documentation.
- Use absolute paths only when operating through the sandbox file tool.
- Read before editing.
- Use guarded scripts or precise patches for large data files.
- Do not modify `node_modules`, `dist`, `.manus-logs`, or secrets.
- Never copy access tokens, cookies, database URLs, or private signed URLs into docs, commits, screenshots, or prompts.

## Database and storage

Review generated SQL before applying it. Never store file bytes in database columns. Keep object keys and metadata coordinated, and test both success and cleanup paths. Confirm owner scoping before exposing any file route.

## Skill validation

When changing `/home/ubuntu/skills/research-to-architecture-atlas/SKILL.md`:

```bash
python /home/ubuntu/skills/skill-creator/scripts/quick_validate.py research-to-architecture-atlas
```

Inspect the skill directory for unused scaffold files and remove them when they are not part of the reusable workflow.

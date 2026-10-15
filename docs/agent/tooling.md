# Agent Tooling

## Local commands

```bash
pnpm test                 # Vitest regression suite
pnpm run check            # TypeScript, no emit
pnpm run build            # Vite frontend + bundled Express server
pnpm run dev              # Full-stack development server
pnpm run format           # Prettier
pnpm run db:push          # Generate/apply Drizzle migrations; review first
```

Use `git status`, `git diff`, `git log`, and `git show` to inspect state and recover prior safe checkpoints. Use `rg`, `find`, `sed`, and `cat` for bounded source inspection.

## Browser and WebDev verification

For UI work, use the project’s WebDev preview and browser-capable tools to:

- open the relevant anchor or route;
- inspect rendered text and screenshots;
- exercise search, filters, sorting, tabs, dialogs, download/share, and storage actions;
- verify wide and narrow viewports;
- inspect console/runtime errors when behavior is unexpected.

Prefer a focused screenshot or anchor check over repeatedly capturing the entire page.

## External research

Use official source pages first. For text-only pages, fetch the page content; for dynamic pages or interactions, use a browser. Record source URLs in the atlas data and visible source trail.

## Safe file operations

- Use repository-relative paths in documentation.
- Use absolute paths only when operating through the sandbox file tool.
- Read before editing.
- Use guarded scripts or precise patches for large data files.
- Do not modify `node_modules`, `dist`, `.manus-logs`, or secrets.

## Database and storage

Review generated SQL before applying it. Never store file bytes in database columns. Keep object keys and metadata coordinated, and test both success and cleanup paths.

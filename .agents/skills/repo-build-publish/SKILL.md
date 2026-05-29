---
name: repo-build-publish
description: |
  Use when building, testing, typechecking, or publishing the Pokemon Pocket MCP server package.
  Activates when user mentions build, publish, release, typecheck, npm publish, or CI/CD.
  Provides build commands, type checking, test running, and semantic release workflow.
---

# Repo Build & Publish

Build, test, and publish the `pokemon-pocket-mcp-server` npm package.

## Commands

```bash
# Type check all workspaces
bun run typecheck

# Build MCP server (copies CSV + compiles TS)
bun run build

# Run tests
cd mcp-server && bun test

# Run MCP server locally (dev mode)
cd mcp-server && bun run dev

# Manual server test
cd mcp-server && bun run test:manual
```

## Build Process

1. `prebuild` — copies `data/pokemon_pocket_cards.csv` to `mcp-server/data/`
2. `tsc` — compiles `mcp-server/src/` → `mcp-server/dist/`
3. Output: `dist/index.js` (standalone entry point)

## Publishing

Package: `pokemon-pocket-mcp-server`

**Manual:**

```bash
cd mcp-server
bun run build
npm publish
```

**Automatic (CI/CD):**

- Push to `master`/`main` triggers `.github/workflows/release.yml`
- Semantic release auto-versions based on conventional commits
- Requires `NPM_TOKEN` secret in GitHub

## Claude Desktop Config

After publishing, users configure:

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"]
    }
  }
}
```

For local development:

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/dist/index.js"]
    }
  }
}
```

## Pre-Release Checklist

- [ ] `bun run typecheck` passes
- [ ] `bun run build` succeeds
- [ ] `cd mcp-server && bun test` passes
- [ ] CSV data fresh (`bun run scrape` if needed)
- [ ] Commit uses conventional commit format (`feat:`, `fix:`, `chore:`)

## CI Pipeline

`.github/workflows/release.yml`: Checkout → Setup Bun → Install → Typecheck → Build → Semantic Release

---
name: build
description: Build the Pokemon Pocket MCP server (compiles TypeScript and copies data)
---

# Build MCP Server

Compile the MCP server from TypeScript to JavaScript and prepare the data files.

## What This Does

1. Copies `data/pokemon_pocket_cards.csv` to `mcp-server/data/`
2. Compiles TypeScript from `mcp-server/src/` to `mcp-server/dist/`

## Usage

```
/repo:build
```

## Execution

Change to the `pokeclaude/` directory and run:

```bash
cd /Volumes/Storage/code/pokeclaude/pokeclaude && npm run build
```

## Output

Build confirmation with:

- Number of files compiled
- Data file size
- Build location (`mcp-server/dist/`)

## Notes

- Build output is in `mcp-server/dist/`
- CSV data is bundled with the build
- Required for local development and npm publishing

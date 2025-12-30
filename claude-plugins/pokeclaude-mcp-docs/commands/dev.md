---
name: mcp:dev
description: Run PokeClaude MCP server from source (development)
---

# Local Development

Run the PokeClaude MCP server from source for development.

## Clone Repository

```bash
git clone https://github.com/briansunter/pokeclaude.git
cd pokeclaude
```

## Install Dependencies

**Using npm:**

```bash
npm install
```

**Using bun:**

```bash
bun install
```

## Build

```bash
npm run build
```

This compiles TypeScript and copies the card database.

## Configure Claude Desktop

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "node",
      "args": ["/absolute/path/to/pokeclaude/mcp-server/dist/index.js"]
    }
  }
}
```

## Development Mode

For development with auto-reload:

```bash
cd mcp-server
npm run dev
```

Uses tsx for hot-reloading during development.

## Project Structure

```
pokeclaude/
├── mcp-server/
│   ├── src/           # TypeScript source
│   ├── dist/          # Compiled output
│   └── data/          # Card database
├── scraper/           # Data scraper
├── data/              # Source CSV
└── claude-plugin/     # Claude Code plugin
```

## Updating Card Data

```bash
npm run scrape        # Incremental
npm run scrape:full   # From scratch
npm run build         # Rebuild after scraping
```

## Full Guide

See `docs/07-local-development.md` for complete development setup.

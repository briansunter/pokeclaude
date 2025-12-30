---
name: mcp:install
description: Install Pokemon Pocket MCP server for Claude Desktop
---

# Install PokeClaude MCP Server

Set up the Pokemon Pocket MCP server for Claude Desktop.

## Quick Install (npx)

Add to your Claude Desktop config:

**macOS/Linux:** `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

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

## Alternative: bunx

Faster, requires bun:

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "bunx",
      "args": ["pokemon-pocket-mcp-server"]
    }
  }
}
```

## Verify Installation

Restart Claude Desktop, then check for available tools:

- search_cards
- get_card
- find_synergies
- find_counters
- get_type_stats
- query_cards
- list_trainers
- analyze_deck

## Full Documentation

See `docs/00-installation.md` for complete installation guide.

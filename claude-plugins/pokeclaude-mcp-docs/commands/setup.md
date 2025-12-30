---
name: mcp:setup
description: Configure Claude Desktop for PokeClaude MCP server
---

# Claude Desktop Setup

Configure Claude Desktop to use the PokeClaude MCP server.

## Config File Location

**macOS/Linux:**

```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**

```
%APPDATA%\Claude\claude_desktop_config.json
```

## Basic Configuration

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"],
      "description": "Pokemon TCG Pocket Server"
    }
  }
}
```

## With Environment Variables (Optional)

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

## Multiple MCP Servers

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"]
    },
    "other-server": {
      "command": "node",
      "args": ["/path/to/other-server"]
    }
  }
}
```

## Restart Required

After editing the config file, restart Claude Desktop completely.

## Troubleshooting

**Server not appearing:**

1. Verify JSON syntax (use a JSON validator)
2. Check file path is correct
3. Restart Claude Desktop
4. Check logs: `~/Library/Logs/Claude/` (macOS)

See `docs/01-claude-desktop-setup.md` for complete troubleshooting.

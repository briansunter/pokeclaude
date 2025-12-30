# Claude Desktop Setup

Complete guide to configuring Claude Desktop for the Pokemon Pocket MCP server.

## Config File Location

Find your Claude Desktop configuration file:

| Platform | Path                                                              |
| -------- | ----------------------------------------------------------------- |
| macOS    | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Linux    | `~/.config/Claude/claude_desktop_config.json`                     |
| Windows  | `%APPDATA%\Claude\claude_desktop_config.json`                     |

## Basic Configuration

### Minimal Config

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

### With Description

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

## Multiple MCP Servers

If you use multiple MCP servers:

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-filesystem", "/path/to/allowed/files"]
    }
  }
}
```

## Environment Variables

Optional environment variables:

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"],
      "env": {
        "NODE_ENV": "production",
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

## Configuring with bunx

For faster performance:

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

## Local Development Configuration

When developing locally:

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

Use `/mcp:dev` to learn about local development.

## Applying Changes

1. **Save the config file**
2. **Quit Claude Desktop completely** (don't just close the window)
3. **Reopen Claude Desktop**

The MCP server will connect on startup.

## Verifying Connection

After restarting, you should see:

### In Claude Desktop

- New tools available in the tools menu
- Pokemon-related queries work automatically

### Test Query

```
Show me Pikachu ex cards
```

Should return card data from the MCP server.

## Troubleshooting

### JSON Errors

**Problem:** Config file has syntax errors

**Solution:**

1. Use a JSON validator
2. Check for missing commas
3. Verify all brackets are closed
4. Check for trailing commas

### Server Not Connecting

**Problem:** Tools don't appear

**Solutions:**

1. Verify config file location
2. Check JSON syntax
3. Restart Claude Desktop fully
4. Check logs for errors

### Path Issues (Local Dev)

**Problem:** Local path doesn't work

**Solution:** Use absolute path, not relative:

- ✅ `/Users/username/pokeclaude/mcp-server/dist/index.js`
- ✗ `./mcp-server/dist/index.js`

## Logs Location

Check for connection issues:

| Platform | Log Path                 |
| -------- | ------------------------ |
| macOS    | `~/Library/Logs/Claude/` |
| Windows  | `%APPDATA%\Claude\logs\` |

Look for entries mentioning "pokemon-pocket-mcp-server".

## See Also

- `docs/00-installation.md` - Installation methods
- `docs/02-tools-reference.md` - Available tools
- `docs/08-troubleshooting.md` - Common issues

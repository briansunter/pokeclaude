# MCP Server Installation

Guide to installing the Pokemon Pocket MCP server for Claude Desktop.

## What is the MCP Server?

The Pokemon Pocket MCP server provides:

- **8 tools** for querying Pokemon cards
- **3 resources** for accessing card databases
- **3 prompts** for AI-guided deck building
- **2,077 cards** from Pokemon TCG Pocket

## Installation Methods

### Method 1: npx (Recommended)

Works with any Node.js installation. No setup required.

**Add to Claude Desktop config:**

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

### Method 2: bunx (Faster)

Requires bun to be installed. Faster startup and execution.

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

## Verification

After adding the configuration:

1. **Restart Claude Desktop completely** (quit and reopen)

2. **Check for tools** - You should see these available:
   - search_cards
   - get_card
   - find_synergies
   - find_counters
   - get_type_stats
   - query_cards
   - list_trainers
   - analyze_deck

3. **Test with a query**:
   ```
   Find Pikachu ex cards
   ```

## Troubleshooting

### Server Not Appearing

**Check:**

- JSON syntax is valid (use a JSON validator)
- Config file is in the correct location
- Claude Desktop was restarted fully

**Location verification:**

```bash
# macOS
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Windows
type %APPDATA%\Claude\claude_desktop_config.json
```

### npx Not Found

**Solution:** Install Node.js from nodejs.org

### Connection Errors

**Check logs:**

- macOS: `~/Library/Logs/Claude/`
- Windows: `%APPDATA%\Claude\logs\`

Look for errors related to "pokemon-pocket-mcp-server".

## Next Steps

- `/mcp:setup` - Configure Claude Desktop properly
- `/mcp:tools` - Learn about available tools
- `/mcp:resources` - Learn about available resources

## Alternative: Local Installation

For development or offline use, see `/mcp:dev` or `docs/07-local-development.md`.

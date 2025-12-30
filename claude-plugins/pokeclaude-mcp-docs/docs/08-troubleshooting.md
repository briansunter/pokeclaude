# Troubleshooting

Solutions to common MCP server issues.

## Installation Issues

### "npx not found"

**Problem:**

```
npx: command not found
```

**Solution:**

1. Install Node.js from nodejs.org
2. Restart your terminal
3. Verify: `npx --version`

### "package not found"

**Problem:**

```
Error: Could not find package 'pokemon-pocket-mcp-server'
```

**Solutions:**

1. Check internet connection
2. Clear npm cache: `npm cache clean --force`
3. Try again: `npx pokemon-pocket-mcp-server`

### "bunx not found"

**Problem:**

```
bunx: command not found
```

**Solution:**

1. Install bun from bun.sh
2. Restart your terminal
3. Verify: `bunx --version`

---

## Claude Desktop Issues

### Server Not Appearing

**Problem:** MCP server doesn't show in Claude Desktop.

**Solutions:**

1. **Verify config location:**
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

2. **Check JSON syntax:**
   - Use a JSON validator
   - Ensure no trailing commas
   - Verify all brackets match

3. **Restart Claude Desktop:**
   - Quit completely (don't just close window)
   - Reopen

4. **Check logs:**
   - macOS: `~/Library/Logs/Claude/`
   - Windows: `%APPDATA%\Claude\logs\`

### Config File Errors

**Problem:** Config file has syntax errors.

**Solutions:**

1. **Validate JSON:**

   ```bash
   # macOS/Linux
   cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | jq .

   # Windows
   type %APPDATA%\Claude\claude_desktop_config.json
   ```

2. **Common issues:**
   - Missing commas between entries
   - Trailing commas (not allowed in JSON)
   - Mismatched brackets `{ }`
   - Quotes around keys

### Tools Not Available

**Problem:** Server connects but tools don't appear.

**Solutions:**

1. **Verify server startup:**
   - Check logs for "Pokemon Pocket MCP Server running"
   - Look for "DuckDB initialized" message

2. **Test with query:**

   ```
   List all Pokemon cards
   ```

3. **Reinstall server:**
   ```bash
   npx pokemon-pocket-mcp-server@latest
   ```

---

## Data Issues

### "Cards not found"

**Problem:** Queries return no results.

**Solutions:**

1. **Check spelling:**

   ```
   Pikachu ex (correct)
   Pikachue ex (wrong)
   ```

2. **Use partial matches:**

   ```
   Find cards with Pikachu in the name
   ```

3. **Check filters:**
   - Are you filtering by wrong type?
   - Is HP filter too restrictive?

### Database Errors

**Problem:** DuckDB initialization fails.

**Solutions:**

1. **Check CSV file:**

   ```bash
   ls mcp-server/data/pokemon_pocket_cards.csv
   ```

2. **Rebuild:**

   ```bash
   npm run build
   ```

3. **Re-scrape if corrupted:**
   ```bash
   npm run scrape:full
   npm run build
   ```

---

## SQL Query Issues

### "Only SELECT allowed"

**Problem:** Attempted to modify database.

**Solution:**

- Only SELECT queries are permitted
- Use SELECT for all queries

### "Invalid SQL syntax"

**Problem:** SQL query has errors.

**Solutions:**

1. **Start simple:**

   ```sql
   SELECT * FROM cards LIMIT 5
   ```

2. **Check column names:**
   - See `docs/09-database-schema.md`
   - Use `SELECT * FROM cards LIMIT 1` to see all columns

3. **Validate SQL:**
   - Single quotes for strings: `'Fire'`
   - Double quotes for identifiers (if needed)

### Type Casting Errors

**Problem:** HP comparisons don't work.

**Solution:**

```sql
-- Wrong
WHERE hp > 100

-- Right
WHERE CAST(hp AS INTEGER) > 100
```

---

## Performance Issues

### Slow Queries

**Problem:** Queries take too long.

**Solutions:**

1. **Use LIMIT:**

   ```sql
   SELECT * FROM cards LIMIT 50
   ```

2. **Use uniqueOnly:**

   ```
   Search for cards with uniqueOnly=true
   ```

3. **Filter by indexed fields:**
   - type
   - name
   - set_code

### High Token Usage

**Problem:** Responses use too many tokens.

**Solutions:**

1. **Use field presets:**

   ```
   Search with fields=minimal  (just names)
   Search with fields=basic   (no images)
   ```

2. **Limit results:**

   ```
   Search for cards with limit=20
   ```

3. **Avoid full unless needed:**
   - Only use `fields=full` for images
   - Default `basic` includes all game data

---

## Local Development Issues

### Build Fails

**Problem:** TypeScript compilation errors.

**Solutions:**

1. **Check Node version:**

   ```bash
   node --version  # Should be 18+
   ```

2. **Clean install:**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Type check:**
   ```bash
   npm run typecheck
   ```

### Path Issues

**Problem:** Claude Desktop can't find local server.

**Solutions:**

1. **Use absolute path:**

   ```json
   "args": ["/Users/username/pokeclaude/mcp-server/dist/index.js"]
   ```

2. **Verify file exists:**

   ```bash
   ls -la /path/to/mcp-server/dist/index.js
   ```

3. **Check permissions:**
   ```bash
   chmod +x /path/to/mcp-server/dist/index.js
   ```

---

## Getting Help

### Still Having Issues?

1. **Check this guide** - Solutions for most issues
2. **Check logs** - Error messages explain the problem
3. **Reinstall** - Often fixes corruption:
   ```bash
   npx pokemon-pocket-mcp-server@latest
   ```

### Report Bugs

If you find a bug:

1. Document the exact steps to reproduce
2. Copy the error message from logs
3. Note your OS and Claude Desktop version
4. Report at: https://github.com/briansunter/pokeclaude/issues

---

## Quick Fixes

| Issue                | Quick Fix                              |
| -------------------- | -------------------------------------- |
| npx not found        | Install Node.js from nodejs.org        |
| Config errors        | Validate JSON, check syntax            |
| Server not appearing | Restart Claude Desktop, check logs     |
| Tools not working    | Check logs, verify config              |
| No cards found       | Check spelling, use partial match      |
| Database errors      | Rebuild: `npm run build`               |
| SQL errors           | Use SELECT only, validate syntax       |
| High token usage     | Use `fields=basic` or `fields=minimal` |
| Build fails          | `npm install`, check Node version      |
| Path issues          | Use absolute path in config            |

---

## See Also

- `docs/00-installation.md` - Installation guide
- `docs/01-claude-desktop-setup.md` - Config file help
- `docs/02-tools-reference.md` - Tool documentation

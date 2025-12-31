# Troubleshooting & FAQ

**Comprehensive guide to solving common issues with PokeClaude MCP Server, Pokemon TCG Pocket gameplay, and database queries**

---

## Table of Contents

1. [MCP Server Issues](#mcp-server-issues)
2. [Claude Desktop Configuration](#claude-desktop-configuration)
3. [Query Problems](#query-problems)
4. [Database Errors](#database-errors)
5. [Performance Issues](#performance-issues)
6. [Card Data Questions](#card-data-questions)
7. [Deck Building Problems](#deck-building-problems)
8. [Installation & Setup](#installation--setup)
9. [Gameplay Questions](#gameplay-questions)
10. [Frequently Asked Questions](#frequently-asked-questions)

---

## MCP Server Issues

### Issue: Server Not Starting

**Symptoms:**

- "Failed to start server" error
- Server logs show crash immediately
- Tools not loading in Claude Desktop

**Diagnosis Steps:**

```bash
# Test server manually
npx pokemon-pocket-mcp-server

# Or for local installation
cd /path/to/mcp-server
npm run dev
```

**Common Causes & Solutions:**

| Cause                       | Solution                                                     |
| --------------------------- | ------------------------------------------------------------ |
| **Port already in use**     | Close other instances or change port via `PORT` env variable |
| **Missing dependencies**    | Run `npm install` or `bun install` in mcp-server directory   |
| **Node.js version too old** | Upgrade to Node.js 18+                                       |
| **Permission denied**       | Check file permissions (chmod 755 on executable files)       |
| **Memory insufficient**     | Restart Claude Desktop, close other applications             |

**Fix: Port Conflict**

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"],
      "env": {
        "PORT": "3001" // Use different port
      }
    }
  }
}
```

**Fix: Clear Cache**

```bash
# Clear npm cache
npm cache clean --force

# Clear node modules
rm -rf node_modules package-lock.json
npm install

# Or for bun
rm -rf node_modules bun.lockb
bun install
```

---

### Issue: Tools Not Showing

**Symptoms:**

- Server connects but shows 0 tools
- Only resources visible, no tools
- "No tools available" message

**Diagnosis:**

1. Check server version:

```bash
npx pokemon-pocket-mcp-server --version
```

2. Check logs in Claude Desktop:
   - Settings → Developer → Server Logs
   - Look for "Tools registered" message

**Solutions:**

✅ **Solution 1: Restart Claude Desktop**

```bash
# Close Claude Desktop completely
# Wait 10 seconds
# Reopen Claude Desktop
```

✅ **Solution 2: Reinstall Server**

```bash
npm uninstall pokemon-pocket-mcp-server
npm install pokemon-pocket-mcp-server@latest
```

✅ **Solution 3: Use bun Instead**

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

---

### Issue: Server Disconnects Randomly

**Symptoms:**

- Server connects then disconnects after a few minutes
- Tools become unavailable
- "Connection lost" errors

**Diagnosis:**

1. Check system resources:

```bash
# macOS/Linux
free -h
df -h

# Windows
wmic OS get TotalVisibleMemorySize,FreePhysicalMemory
```

2. Check logs for crash reasons

**Solutions:**

✅ **Fix 1: Increase Memory**

- Close other applications
- Restart Claude Desktop
- Check for memory leaks in Activity Monitor

✅ **Fix 2: Reduce Query Size**

- Use `limit` parameter (e.g., `limit: 50`)
- Use `uniqueOnly: true`
- Avoid large result sets

✅ **Fix 3: Check for Malware**

- Run antivirus scan
- Check for suspicious processes

---

## Claude Desktop Configuration

### Issue: Config File Not Found

**Symptoms:**

- "Config file not found" error
- Can't find configuration location
- Changes don't persist

**Locate Config File:**

| OS          | Path                                                              |
| ----------- | ----------------------------------------------------------------- |
| **macOS**   | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| **Windows** | `%APPDATA%\Claude\claude_desktop_config.json`                     |
| **Linux**   | `~/.config/claude/claude_desktop_config.json`                     |

**Find via GUI:**

1. Open Claude Desktop
2. Settings → Developer
3. Click "Edit Config" or "Configure MCP Servers"
4. File opens automatically

**Create If Missing:**

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

---

### Issue: Config Changes Not Taking Effect

**Symptoms:**

- Updated config but no changes
- Server still shows old settings
- Tools not updating

**Solution:**

1. **Close Claude Desktop completely** (not just minimize)
2. **Wait 10 seconds**
3. **Reopen Claude Desktop**
4. **Verify in logs**: Settings → Developer → Server Logs

⚠️ **Critical**: Closing the window is NOT enough. Must quit the application.

---

### Issue: Invalid JSON Syntax

**Symptoms:**

- "Invalid JSON" error
- Config file won't save
- Claude Desktop won't start

**Validate JSON:**

```bash
# Using Python
python -m json.tool claude_desktop_config.json

# Using Node.js
node -e "JSON.parse(require('fs').readFileSync('claude_desktop_config.json', 'utf8'))"

# Using jq (Linux/macOS)
cat claude_desktop_config.json | jq .
```

**Common Errors:**

```json
// ❌ Wrong: Trailing commas
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"],  // ❌ Trailing comma
    }
  }
}

// ✅ Correct
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"]
    }
  }
}

// ❌ Wrong: Single quotes
{
  "mcpServers": {
    "pokemon-pocket": {
      'command': 'npx'  // ❌ JSON requires double quotes
    }
  }
}

// ✅ Correct
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"]
    }
  }
}
```

---

### Issue: Permission Denied

**Symptoms:**

- "Permission denied" error
- Cannot write to config file
- Changes revert after restart

**Fix Permissions:**

```bash
# macOS/Linux
chmod 644 ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Or allow user to write
chmod u+w ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**

1. Right-click config file
2. Properties → Security
3. Select your user
4. Check "Full Control"
5. Apply → OK

---

## Query Problems

### Issue: "No Cards Found"

**Symptoms:**

- Query returns empty results
- Expected cards not appearing

**Diagnosis:**

```sql
-- Check if card exists
SELECT name, set_code FROM cards WHERE name ILIKE '%pikachu%';

-- Check total cards
SELECT COUNT(*) FROM cards;
```

**Common Causes:**

| Cause                      | Example                         | Solution                |
| -------------------------- | ------------------------------- | ----------------------- |
| **Wrong name**             | `"pikachu"` vs `"Pikachu ex"`   | Use exact name or ILIKE |
| **Wrong set**              | Looking in A1 vs card is in A2  | Check set_code          |
| **Type filter too strict** | `type='Fire'` excludes Trainers | Remove type filter      |
| **HP range too narrow**    | `minHp=200` (no cards)          | Adjust range            |

**Solutions:**

✅ **Solution 1: Use ILIKE for Partial Match**

```javascript
{
  "name": "pikachu"  // Finds all Pikachu variants
}
```

✅ **Solution 2: Check Available Sets**

```sql
SELECT DISTINCT set_code FROM cards ORDER BY set_code;
```

✅ **Solution 3: Remove Filters**

```javascript
{
  // Start simple, add filters gradually
  "name": "Pikachu ex"
}
```

---

### Issue: Too Many Results

**Symptoms:**

- Query returns thousands of cards
- Performance is slow
- Can't find specific cards

**Solutions:**

✅ **Add Limit**

```javascript
{
  "name": "Pikachu",
  "limit": 20  // Only return 20 results
}
```

✅ **Use uniqueOnly**

```javascript
{
  "type": "Fire",
  "uniqueOnly": true  // Remove art variants (50% fewer results)
}
```

✅ **Be More Specific**

```javascript
{
  "type": "Fire",
  "minHp": 100,
  "rarity": "Rare Ultra"
}
```

---

### Issue: Wrong Results

**Symptoms:**

- Cards don't match filter criteria
- HP values incorrect
- Wrong types appearing

**Diagnosis:**

```sql
-- Check card details
SELECT name, type, hp, rarity FROM cards WHERE name = 'Pikachu ex';

-- Verify filters
SELECT * FROM cards WHERE type = 'Lightning';
```

**Common Issues:**

| Issue                | Problem                        | Solution                             |
| -------------------- | ------------------------------ | ------------------------------------ |
| **String HP**        | `hp` is VARCHAR, not INTEGER   | Use `CAST(hp AS INTEGER)` in SQL     |
| **Case sensitivity** | `Type='fire'` vs `type='Fire'` | Use ILIKE for case-insensitive       |
| **NULL values**      | Trainers have `type=NULL`      | Handle NULL in queries               |
| **Partial matches**  | ILIKE vs exact match           | Use `=` for exact, ILIKE for partial |

**Correct Query:**

```sql
-- For numeric comparisons, use CAST
SELECT name, type, CAST(hp AS INTEGER) as hp_value
FROM cards
WHERE CAST(hp AS INTEGER) > 100;
```

---

## Database Errors

### Issue: "Column Does Not Exist"

**Symptoms:**

- SQL query fails with column error
- "Unknown column" message

**Diagnosis:**

```sql
-- Check actual schema
PRAGMA table_info(cards);

-- List all columns
SELECT * FROM cards LIMIT 1;
```

**Available Columns:**

- id, set_code, set_name, card_number
- name, type, hp, rarity
- abilities, attacks, weakness, resistance
- retreat_cost, image_url, card_url

**Common Mistakes:**

```sql
-- ❌ Wrong: Invalid column
SELECT power FROM cards;

-- ✅ Correct: Use hp
SELECT hp, CAST(hp AS INTEGER) as numeric_hp FROM cards;
```

---

### Issue: "No Such Table"

**Symptoms:**

- "Table cards not found" error
- SQL query fails

**Diagnosis:**

```sql
-- List all tables
.tables

-- Check current database
DATABASE();
```

**Expected Output:**

```
cards
```

**If No Tables:**

- CSV file not loaded
- Server not initialized properly
- Restart server

**Fix:**

```bash
# For local setup
cd mcp-server
npm run build  # Rebuilds with CSV
npm run dev    # Restarts server
```

---

### Issue: Type Mismatch

**Symptoms:**

- "Type mismatch" error
- Cannot compare hp values
- String/number conflicts

**Problem:** `hp` and `retreat_cost` are VARCHAR (strings), not integers

**Solution: Use CAST**

```sql
-- ❌ Wrong: Comparing string to number
SELECT * FROM cards WHERE hp > 100;

-- ✅ Correct: Cast to integer
SELECT * FROM cards WHERE CAST(hp AS INTEGER) > 100;

-- ✅ Or in filter
SELECT * FROM cards WHERE CAST(hp AS INTEGER) BETWEEN 80 AND 120;
```

**Aggregate Functions:**

```sql
-- ✅ Average HP
SELECT type, AVG(CAST(hp AS INTEGER)) as avg_hp
FROM cards
WHERE type IS NOT NULL
GROUP BY type;
```

---

## Performance Issues

### Issue: Slow Queries

**Symptoms:**

- Queries take 5+ seconds
- Timeout errors
- Claude Desktop freezes

**Solutions:**

✅ **1. Add LIMIT**

```javascript
{
  "limit": 50  // Always limit results
}
```

✅ **2. Use uniqueOnly**

```javascript
{
  "uniqueOnly": true  // 50% fewer results
}
```

✅ **3. Minimize Fields**

```javascript
{
  "fields": "minimal"  // Smaller response size
}
```

✅ **4. Avoid Large SQL Queries**

```sql
-- ❌ Bad: No LIMIT
SELECT * FROM cards ORDER BY hp DESC;

-- ✅ Good: With LIMIT
SELECT * FROM cards ORDER BY CAST(hp AS INTEGER) DESC LIMIT 100;
```

---

### Issue: Memory High Usage

**Symptoms:**

- System becomes slow
- Claude Desktop uses lots of RAM
- Other apps crash

**Solutions:**

✅ **1. Close Other Apps**

- Browser tabs
- Games
- Video players

✅ **2. Restart Regularly**

- Restart Claude Desktop daily
- Reboot system weekly

✅ **3. Reduce Query Size**

- Use `limit` parameter
- Filter more strictly
- Paginate results

---

### Issue: Network Timeouts

**Symptoms:**

- "Request timeout" error
- Connection drops during query
- Partial results

**Solutions:**

✅ **1. Simplify Query**

```javascript
{
  "name": "Pikachu",  // Simple filter
  "limit": 20
}
```

✅ **2. Check Internet**

```bash
# Test connection
ping google.com

# Check DNS
nslookup pokemon.com
```

✅ **3. Use Local Server**

- Install locally instead of npx
- Avoid network dependency

---

## Card Data Questions

### Issue: Missing Cards

**Symptoms:**

- New cards not appearing
- Set seems incomplete
- Card data looks outdated

**Check Database Version:**

```sql
-- Check latest set
SELECT set_code, set_name, COUNT(*) as card_count
FROM cards
GROUP BY set_code, set_name
ORDER BY set_code DESC
LIMIT 1;
```

**Expected Output:**

```
set_code: "A4b"
set_name: "Mythical Island"
card_count: 85
```

**Update Database:**

```bash
# For local setup
cd scraper
npm run scrape  # Incremental update

# Or full refresh
npm run scrape:full
```

**Verify New Cards:**

```sql
-- Cards added recently (example query)
SELECT name, set_code, rarity
FROM cards
WHERE set_code = 'A4b'
ORDER BY name;
```

---

### Issue: Incorrect Card Stats

**Symptoms:**

- HP values wrong
- Attack damage incorrect
- Weakness/resistance mismatched

**Verify Against Official Source:**

1. Check limitlesstcg.com
2. Compare with Pokemon official website

**If Data Wrong:**

```bash
# Report the issue
# GitHub: https://github.com/briansunter/pokeclaude/issues
# Include: Card name, expected stats, actual stats
```

**Scraper May Have Error:**

- Network issue during scraping
- Parsing error on website change
- Manual verification needed

---

### Issue: Art Variants

**Symptoms:**

- Duplicate cards with same name
- Multiple versions of same Pokemon
- Confusion about "unique" cards

**Understanding Variants:**

```
Pikachu ex appears 7 times:
- Genetic Apex (A1) art variant 1
- Genetic Apex (A1) art variant 2
- Promo (P-A) art variant 1
- etc.

Same stats, different artwork
```

**Deduplicate:**

```javascript
{
  "uniqueOnly": true  // Removes art variants
}
```

**Keep All:**

```javascript
{
  "uniqueOnly": false  // Includes all variants
}
```

---

## Deck Building Problems

### Issue: Deck Analysis Fails

**Symptoms:**

- analyze_deck returns error
- Deck validation fails
- Wrong card count

**Validate Input:**

```javascript
// ✅ Correct format
{
  "cardNames": [
    "Pikachu ex",
    "Raichu",
    "Professor's Research",
    "Erika"
    // ... 20 cards total
  ]
}

// ❌ Wrong format
{
  "cardNames": "Pikachu ex, Raichu, ..."  // Should be array
}
```

**Common Errors:**

| Error            | Cause          | Fix                              |
| ---------------- | -------------- | -------------------------------- |
| "Array required" | Passed string  | Pass array: `["Card1", "Card2"]` |
| "Max 20 cards"   | Too many cards | Reduce to 20                     |
| "Card not found" | Wrong name     | Check exact card names           |

---

### Issue: Invalid Deck

**Symptoms:**

- Deck fails validation
- "Max 2 copies" error
- Missing basic Pokemon

**Deck Rules:**

- ✅ Exactly 20 cards
- ✅ Max 2 copies per card
- ✅ At least 5-6 basic Pokemon
- ✅ 0 energy cards (energy zone)

**Check Your Deck:**

```javascript
{
  "cardNames": ["Card1", "Card2", ...]  // 20 cards
}

// The tool will return:
{
  "valid": true/false,
  "errors": [...],
  "warnings": [...],
  "suggestions": [...]
}
```

---

### Issue: Missing Synergies

**Symptoms:**

- find_synergies returns poor matches
- Cards don't work together
- Confusing recommendations

**Understand Synergy Logic:**

```
Synergy finds:
1. Same-type Pokemon (complementary roles)
2. Recommended Trainers (support cards)
3. Energy curve (cost distribution)
```

**To Get Better Results:**

✅ **Use Specific Core Card**

```javascript
{
  "cardName": "Pikachu ex"  // Specific, not "Pikachu"
}
```

✅ **Check Type Match**

```sql
-- Verify your card's type
SELECT name, type FROM cards WHERE name = 'Charizard ex';
```

---

## Installation & Setup

### Issue: npx Not Found

**Symptoms:**

- "npx: command not found"
- Cannot install via npx
- Need alternative method

**Install npm/npx:**

**macOS:**

```bash
# Using Homebrew
brew install node

# npx comes with Node.js
node --version
npm --version
```

**Windows:**

- Download from: https://nodejs.org
- Choose LTS version
- Run installer

**Linux (Ubuntu/Debian):**

```bash
sudo apt update
sudo apt install nodejs npm
```

**Alternative: Use bun**

```bash
# Install bun
curl -fsSL https://bun.sh/install | bash

# Use bunx instead of npx
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "bunx",
      "args": ["pokemon-pocket-mcp-server"]
    }
  }
}
```

---

### Issue: Node.js Version Too Old

**Symptoms:**

- "unsupported Node.js version" error
- Installation fails
- Features don't work

**Check Version:**

```bash
node --version
# Should be v18.0.0 or higher
```

**Update Node.js:**

**Option 1: Official Installer**

- Download: https://nodejs.org
- Choose LTS version

**Option 2: Package Manager**

macOS (Homebrew):

```bash
brew update
brew upgrade node
```

Linux:

```bash
sudo npm install -g n
sudo n stable
```

**Option 3: Use bun**

- bun works with older Node.js versions
- Better performance

```bash
curl -fsSL https://bun.sh/install | bash
```

---

### Issue: Permission Errors (macOS/Linux)

**Symptoms:**

- "EACCES" error
- Cannot write to directory
- Permission denied on npm install

**Fix Global Install:**

```bash
# Option 1: Use npx (no global install needed)
# npx downloads and runs temporarily
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"]
    }
  }
}

# Option 2: Configure npm
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Option 3: Use sudo (not recommended)
sudo npm install -g pokemon-pocket-mcp-server
```

---

## Gameplay Questions

### Issue: Understanding Energy Zone

**FAQ:**

**Q: Do I put energy cards in my deck?**
A: No! The energy zone auto-generates 1 energy per turn. All 20 cards are Pokemon or Trainers.

**Q: When do I get energy?**
A: You get 1 energy at the start of each turn (after turn 1).

**Q: Can I use 3+ energy types?**
A: Yes, but it's not recommended. 1-2 types for best consistency.

**Reference:** See `strategies/04-energy-zone-mastery.md`

---

### Issue: Pokemon vs ex Pokemon

**FAQ:**

**Q: What's the difference?**
A: ex Pokemon have higher HP (100-120) and are worth 2 points when knocked out. Regular Pokemon are 70-90 HP and worth 1 point.

**Q: Should I use ex Pokemon?**
A: Yes! They're the primary win condition. Build around your ex Pokemon.

**Q: How many ex Pokemon in a deck?**
A: Typically 2-3 ex Pokemon. They need support.

---

### Issue: Win Conditions

**FAQ:**

**Q: How do I win?**
A: Knock out 3 Pokemon (worth 3 points total). ex Pokemon = 2 points, regular = 1 point.

**Q: Can I win with 2 ex Pokemon?**
A: Yes! Knock out 2 ex Pokemon = 2+1 = 3 points.

**Q: What if opponent has 1 HP left?**
A: Attack to knock out. You get the point.

---

## Frequently Asked Questions

### General

**Q: How many cards are in the database?**
A: 2,077 total cards (including art variants), 1,068 unique cards.

**Q: How often is data updated?**
A: Incremental updates weekly, full refreshes with new sets.

**Q: Is this official Pokemon data?**
A: Yes, scraped from limitlesstcg.com, verified against official sources.

**Q: Can I use this for standard TCG?**
A: No, this is specifically for Pokemon TCG Pocket (20-card format).

---

### Technical

**Q: What database does this use?**
A: DuckDB (in-memory SQL database for fast queries).

**Q: Can I run queries manually?**
A: Yes, use the `query_cards` tool with SQL.

**Q: Is the database saved?**
A: Data loads on each server start. No permanent storage needed.

**Q: Can I add custom cards?**
A: Yes, modify the CSV file and rebuild the server.

---

### Deck Building

**Q: What's the best starter deck?**
A: See `deckbuilding/03-budget-decks.md` for 3 complete builds.

**Q: How many Trainer cards?**
A: Typically 4-6 trainers. The rest are Pokemon.

**Q: What about evolution lines?**
A: Include both basic and evolved Pokemon. See deck building guides.

**Q: How important is the bench?**
A: Very! You can have up to 3 benched Pokemon for support.

---

### Competitive Play

**Q: What deck is meta right now?**
A: See `meta/02-top-tier-decks.md` for current S-tier decks.

**Q: What counters Pikachu ex?**
A: Fighting-type Pokemon (see `strategies/03-type-matchups.md`).

**Q: Is budget viable?**
A: Yes! See `meta/03-budget-vs-premium-analysis.md` - only 3-4% difference.

**Q: How to improve?**
A: Practice with `complete-guides/01-beginner-to-advanced.md` progression path.

---

## Getting Help

### Self-Service Resources

1. **This Guide**: Search for your issue
2. **README**: https://github.com/briansunter/pokeclaude
3. **Other Docs**: In `docs/pokemon-tcg-pocket-research/`

### Before Reporting an Issue

**Checklist:**

- ✅ Restarted Claude Desktop
- ✅ Verified config file syntax
- ✅ Tested simple query (search for Pikachu)
- ✅ Checked server logs
- ✅ Noted exact error messages
- ✅ Noted OS and software versions

### Report Bug

**GitHub Issues:** https://github.com/briansunter/pokeclaude/issues

**Include:**

- Operating System (macOS/Windows/Linux)
- Node.js/Bun version (`node --version`)
- Claude Desktop version
- Config file (sanitized)
- Error logs (Settings → Developer → Server Logs)
- Steps to reproduce
- Expected vs actual behavior

**Template:**

```markdown
**Describe the bug**
Clear description of the issue

**To Reproduce**
Steps to reproduce:

1. Install MCP server
2. Configure Claude Desktop
3. Query for...
4. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**

- OS: [e.g. macOS 14.1]
- Node.js: [e.g. v20.0.0]
- Claude Desktop: [e.g. 0.9.2]

**Logs**
Paste relevant log entries
```

### Community

- **GitHub Discussions**: https://github.com/briansunter/pokeclaude/discussions
- **Discord**: [Invite link in README]
- **Reddit**: r/PokemonTCG

---

## Conclusion

**Most Common Issues (Quick Fix):**

| Issue               | Quick Fix                      |
| ------------------- | ------------------------------ |
| Server not starting | Restart Claude Desktop         |
| Tools not showing   | Use `bunx` instead of `npx`    |
| Empty results       | Use ILIKE: `"name": "pikachu"` |
| Too slow            | Add `"limit": 50`              |
| Invalid JSON        | Validate with `jq .`           |
| Permission denied   | `chmod 644 config.json`        |

**Remember:**

1. Always restart Claude Desktop after changes
2. Use `limit` parameter for performance
3. Validate JSON config syntax
4. Check server logs for errors
5. Start with simple queries

**Happy deck building!** 🃏

---

## Quick Reference

### Essential Commands

```bash
# Test server
npx pokemon-pocket-mcp-server

# Check versions
node --version
npm --version

# Validate JSON
python -m json.tool config.json

# Clear cache
npm cache clean --force
```

### Config Validation

```bash
# Check if valid JSON
cat claude_desktop_config.json | jq .

# Check file permissions
ls -la claude_desktop_config.json
```

### Performance Tips

```javascript
// Always use:
{
  "limit": 50,        // Limit results
  "uniqueOnly": true, // Deduplicate
  "fields": "minimal" // Smaller response
}
```

### Useful Queries

```sql
-- Find specific card
SELECT * FROM cards WHERE name ILIKE '%pikachu%';

-- Count cards
SELECT COUNT(*) FROM cards;

-- Check types
SELECT DISTINCT type FROM cards WHERE type IS NOT NULL;

-- HP statistics
SELECT type, AVG(CAST(hp AS INTEGER)) FROM cards WHERE type IS NOT NULL GROUP BY type;
```

---

_This troubleshooting guide covers the most common issues and provides solutions to keep your PokeClaude MCP Server running smoothly._

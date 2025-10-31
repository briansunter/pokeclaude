# MCP Server Integration Guide

**Complete guide to setting up, configuring, and using the PokeClaude Pokemon TCG Pocket MCP Server with Claude Desktop**

---

## Table of Contents

1. [What is an MCP Server?](#what-is-an-mcp-server)
2. [Prerequisites](#prerequisites)
3. [Installation Methods](#installation-methods)
4. [Claude Desktop Configuration](#claude-desktop-configuration)
5. [Verification & Testing](#verification--testing)
6. [Available Tools](#available-tools)
7. [Available Resources](#available-resources)
8. [Available Prompts](#available-prompts)
9. [Example Workflows](#example-workflows)
10. [Advanced Configuration](#advanced-configuration)
11. [Troubleshooting](#troubleshooting)

---

## What is an MCP Server?

### Model Context Protocol (MCP)

**MCP** is an open standard that enables AI assistants like Claude to connect to external tools, databases, and services through a standardized protocol.

**How It Works:**

```
┌───────────────┐
│  Claude AI    │◄─────┐
│  (Assistant)  │      │
└───────┬───────┘      │
        │              │
        │ MCP Protocol │
        │              │
        ▼              │
┌───────────────┐      │
│  MCP Server   │      │
│ (PokeClaude)  │      │
└───────┬───────┘      │
        │              │
        │              │
        ▼              │
┌───────────────┐      │
│   Database    │      │
│ (2000+ cards) │      │
└───────────────┘      │
                        │
┌─────────────────────────────────┐
│  Standardized JSON-RPC          │
│  - Tool calls                   │
│  - Resource access              │
│  - Prompt templates             │
└─────────────────────────────────┘
```

**Benefits:**

- **Structured Communication**: Clear tool definitions and responses
- **Rich Capabilities**: Database queries, file access, API calls
- **Real-time Data**: Access to up-to-date information
- **Extensibility**: Add new tools without changing Claude
- **Security**: Sandboxed execution

### PokeClaude MCP Server Features

**What PokeClaude Provides:**

✅ **7 Powerful Tools**:

- Search 2000+ Pokemon cards with advanced filters
- Get detailed information for specific cards
- Find cards that synergize well together
- Identify cards that counter specific strategies
- Analyze deck composition and energy curves
- Get type statistics and distributions
- Run custom SQL queries

✅ **3 Database Resources**:

- Full card database (2077 cards)
- Unique cards only (1068 cards - art variants deduped)
- Type statistics and metrics

✅ **3 Prompt Templates**:

- Build competitive deck around a Pokemon
- Counter specific deck types
- Optimize existing deck lists

✅ **Built-in Intelligence**:

- Pokemon TCG Pocket game rules
- Energy zone calculations
- Type effectiveness chart
- Deck building best practices

---

## Prerequisites

### System Requirements

**Operating System:**

- ✅ macOS (10.15+)
- ✅ Windows 10/11
- ✅ Linux (Ubuntu 20.04+)

**Required Software:**

| Option          | Software    | Install Link       | Best For                |
| --------------- | ----------- | ------------------ | ----------------------- |
| **Recommended** | **Bun**     | https://bun.sh     | Fastest performance     |
| Alternative     | **Node.js** | https://nodejs.org | Widest compatibility    |
| Alternative     | **npm**     | https://npmjs.org  | Node.js package manager |

**Claude Desktop:**

- Download from: https://claude.ai/desktop
- Version: Latest (MCP support built-in)

### Verify Installation

**Check Bun:**

```bash
# Install Bun (macOS/Linux)
curl -fsSL https://bun.sh/install | bash

# Verify
bun --version
# Expected output: bun 1.x.x or higher
```

**Check Node.js:**

```bash
# Install via package manager or website
node --version
# Expected output: v18.x.x or higher

npm --version
# Expected output: 9.x.x or higher
```

**Check Claude Desktop:**

```bash
# Open Claude Desktop app
# Should start without errors
# Check About for version info
```

---

## Installation Methods

### Method 1: Using npx (Recommended for Beginners)

**Easiest setup - no local installation required**

**Step 1: Configure Claude Desktop**

1. Open Claude Desktop
2. Go to Settings → Developer
3. Click "Edit Config" or "Configure MCP Servers"
4. This opens your config file

**Step 2: Add Configuration**

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"],
      "env": {}
    }
  }
}
```

**Step 3: Restart Claude Desktop**

1. Close Claude Desktop completely
2. Reopen the application
3. The server will auto-download on first use

**Pros:**

- ✅ No manual installation
- ✅ Always latest version
- ✅ Easy to update
- ✅ Perfect for beginners

**Cons:**

- ❌ Requires internet for first run
- ❌ Slightly slower startup (downloads on first use)

---

### Method 2: Using bunx (Recommended for Developers)

**Faster execution with Bun runtime**

**Step 1: Install Bun (if not already installed)**

```bash
curl -fsSL https://bun.sh/install | bash
```

**Step 2: Configure Claude Desktop**

Edit your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "bunx",
      "args": ["pokemon-pocket-mcp-server"],
      "env": {}
    }
  }
}
```

**Step 3: Restart Claude Desktop**

**Pros:**

- ✅ Fastest performance
- ✅ Automatic updates
- ✅ Built on modern runtime

**Cons:**

- ❌ Requires Bun installation

---

### Method 3: Local Development Setup

**For contributors and developers who want to modify the code**

**Step 1: Clone Repository**

```bash
# Clone the repository
git clone https://github.com/briansunter/pokeclaude.git
cd pokeclaude

# Install dependencies
cd mcp-server
npm install
# or
bun install
```

**Step 2: Build the Project**

```bash
# Build TypeScript to JavaScript
npm run build
# or
bun run build

# This creates dist/index.js
```

**Step 3: Configure Claude Desktop**

Edit your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "node",
      "args": ["/absolute/path/to/pokeclaude/mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

⚠️ **Important**: Use absolute path, not relative paths

**Step 4: Test Locally**

```bash
# Test server manually
cd mcp-server
npm run dev
# or
bun run dev

# Test in another terminal
curl http://localhost:3000/health
```

**Pros:**

- ✅ Full control over code
- ✅ Can modify and test changes
- ✅ Offline use
- ✅ Development workflow

**Cons:**

- ❌ Manual updates required
- ❌ Requires TypeScript knowledge

---

## Claude Desktop Configuration

### Finding Your Config File

**Claude Desktop stores config in:**

**macOS:**

```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**

```
%APPDATA%\Claude\claude_desktop_config.json
```

**Linux:**

```
~/.config/claude/claude_desktop_config.json
```

**To Find It:**

1. Open Claude Desktop
2. Settings → Developer
3. Click "Show Config" or "Edit Config"
4. File will open automatically

### Full Configuration Example

**Complete config with all features:**

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"],
      "env": {}
    }
  },
  "logging": {
    "level": "info"
  }
}
```

**For Developers (Local Setup):**

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "node",
      "args": ["/Users/yourusername/projects/pokeclaude/mcp-server/dist/index.js"],
      "env": {
        "NODE_ENV": "development"
      }
    }
  },
  "logging": {
    "level": "debug"
  }
}
```

### Environment Variables

**Optional configuration for developers:**

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/index.js"],
      "env": {
        "DATABASE_PATH": "/custom/path/to/cards.csv",
        "PORT": "3000",
        "LOG_LEVEL": "info"
      }
    }
  }
}
```

**Available Variables:**

- `DATABASE_PATH`: Custom CSV file location
- `PORT`: Server port (default: auto-assigned)
- `LOG_LEVEL`: debug/info/warn/error

---

## Verification & Testing

### Step 1: Restart Claude Desktop

**Critical**: Always restart Claude Desktop after config changes

1. Close Claude Desktop completely
2. Wait 5 seconds
3. Reopen Claude Desktop

### Step 2: Check Server Status

**In Claude Desktop, you should see:**

```
✅ Pokemon Pocket Server Connected
Tools: 7 tools loaded
Resources: 3 resources available
```

**Or check console logs:**

1. Settings → Developer → Server Logs
2. Look for: `Pokemon Pocket MCP Server started`
3. Should see no error messages

### Step 3: Test a Simple Query

**Try in Claude Desktop:**

```
Type: "Search for Pikachu cards"

Expected Response:
- List of Pikachu cards
- Including ex versions
- Card details (HP, attacks, etc.)
```

**Success Indicators:**

- ✅ Response within 2 seconds
- ✅ Correct data from database
- ✅ No error messages in logs

### Step 4: Test Advanced Features

**Try these queries:**

1. **"Find all Fire-type Pokemon with HP over 100"**
   - Tests: Filtering and statistics

2. **"Build a deck around Charizard ex"**
   - Tests: Deck building prompt

3. **"What counters Water-type Pokemon?"**
   - Tests: Synergy and counter finding

4. **"Show me the rarest cards in Genetic Apex"**
   - Tests: Rarity filtering

**All should return structured, accurate data**

### Troubleshooting: Server Not Loading

**Common Issues:**

| Symptom                | Solution                               |
| ---------------------- | -------------------------------------- |
| "Server not connected" | Restart Claude Desktop                 |
| Config file not found  | Use Settings → Developer → Edit Config |
| Permission denied      | Check file permissions (chmod)         |
| Port already in use    | Change PORT env variable               |
| Tools not showing      | Check logs for errors                  |

---

## Available Tools

### 1. search_cards

**Search and filter Pokemon cards**

```javascript
// Example usage
{
  "name": "Pikachu",
  "type": "Lightning",
  "minHp": 100,
  "set": "A1",
  "uniqueOnly": true
}
```

**Parameters:**

- `name` (string): Card name (partial match)
- `type` (string): Pokemon type (Fire, Water, Grass, etc.)
- `hasAttacks` (boolean): True = Pokemon, False = Trainers/Items
- `minHp` / `maxHp` (number): HP range filter
- `set` (string): Set code (A1, A2, A3, A4b, P-A)
- `retreatCost` (number): Retreat cost (0-4)
- `weakness` (string): Weakness type
- `rarity` (string): Rarity level
- `uniqueOnly` (boolean): Remove art variants (default: true)
- `fields` (string): Response detail level (minimal/basic/full)
- `limit` (number): Max results (default: 50)

**Example Queries:**

```
"Search for all Grass Pokemon"
"Find cards with HP over 120"
"Show me rare cards from Genetic Apex"
"Find Pokemon weak to Fire"
```

---

### 2. get_card

**Get detailed information about a specific card**

```javascript
{
  "name": "Pikachu ex",
  "fields": "full"
}
```

**Parameters:**

- `name` (string, required): Exact card name
- `fields` (string): Detail level (minimal/basic/full)

**Returns:**

- Full card data including:
  - HP, attacks, abilities
  - Rarity and set information
  - Image URL and card URL
  - Weakness, resistance, retreat cost

**Example Queries:**

```
"Tell me about Mewtwo ex"
"Get details on Charizard ex"
"Show me Pikachu ex card"
```

---

### 3. find_synergies

**Find cards that work well together**

```javascript
{
  "cardName": "Pikachu ex",
  "fields": "basic"
}
```

**Parameters:**

- `cardName` (string, required): Main card to build around
- `fields` (string): Response detail level

**Returns:**

- Same-type Pokemon that synergize
- Recommended Trainer/Item cards
- Synergy explanations

**Example Queries:**

```
"What cards work well with Charizard ex?"
"Find synergies for a Grass deck"
"Build around Venusaur ex"
```

---

### 4. find_counters

**Find cards that counter specific strategies**

```javascript
{
  "targetType": "Fire"
}
```

**Parameters:**

- `targetType` (string, required): Type to counter
- `fields` (string): Response detail level

**Returns:**

- Cards that exploit weaknesses
- Counter strategy explanations
- Recommended counters for each type

**Example Queries:**

```
"What counters Water-type Pokemon?"
"Find counters to Fire decks"
"Show me cards that beat Lightning"
```

---

### 5. get_type_stats

**Get statistics by Pokemon type**

```javascript
{
}
```

**Parameters:**

- None

**Returns:**

- Type distribution (count of cards)
- Average HP per type
- Average retreat cost per type
- Strongest Pokemon per type

**Example Queries:**

```
"What are the stats for Lightning type?"
"Show me type distributions"
"Which type has the highest HP average?"
```

---

### 6. query_cards

**Run custom SQL queries**

```javascript
{
  "sql": "SELECT name, hp, type FROM cards WHERE hp > 100 ORDER BY hp DESC LIMIT 10"
}
```

**Parameters:**

- `sql` (string, required): SQL query
- `fields` (string): Response detail level

**Available Tables:**

- `cards`: Main card database

**Safe Queries Only:** DuckDB prevents destructive operations

**Example Queries:**

```
"Show top 10 highest HP Pokemon"
"Count cards by rarity"
"Find all ex Pokemon"
```

---

### 7. analyze_deck

**Analyze deck composition and balance**

```javascript
{
  "cardNames": ["Pikachu ex", "Raichu", "Professor's Research", "Erika"]
}
```

**Parameters:**

- `cardNames` (array, required): List of 20 cards

**Validates:**

- ✅ 20-card limit
- ✅ Max 2 copies per card
- ✅ Energy type count (1-2 recommended)
- ✅ Evolution lines present
- ✅ Basic Pokemon count (5-6 minimum)
- ✅ Pokemon/Trainer ratio (12/8 recommended)

**Returns:**

- Deck composition analysis
- Energy curve assessment
- Missing cards suggestions
- Validation summary

**Example Queries:**

```
"Analyze my Lightning deck"
"Check if this deck is legal"
"Optimize my current 20 cards"
```

---

## Available Resources

### 1. pokemon://cards/all

**Full database of all cards**

- Returns: 2077 cards (including art variants)
- Use case: Complete card catalog
- Format: JSON array

**Example Usage:**

```
"Show me all cards in the database"
```

---

### 2. pokemon://cards/unique

**Deduplicated card database**

- Returns: 1068 unique cards
- Art variants removed (different artwork, same stats)
- Use case: Card evaluation, deck building
- Format: JSON array

**Example Usage:**

```
"Show me unique cards only"
```

---

### 3. pokemon://stats/types

**Type statistics**

- Returns: Statistics by type
- Includes: Count, avg HP, avg retreat cost
- Use case: Meta analysis, type distribution
- Format: JSON object

**Example Usage:**

```
"Show type statistics"
```

---

## Available Prompts

### 1. build-deck

**Build competitive deck around a Pokemon**

**Usage:**

```
Use the build-deck prompt with card name "Charizard ex"
```

**What it does:**

- Analyzes the card's type and abilities
- Finds synergistic Pokemon
- Suggests Trainer cards
- Calculates energy requirements
- Provides complete 20-card list
- Explains deck strategy

**Example:**

```
Prompt: build-deck
Input: "Pikachu ex"
Output: Complete Lightning-type deck with 20 cards
```

---

### 2. counter-deck

**Counter specific deck strategies**

**Usage:**

```
Use the counter-deck prompt with type "Fire"
```

**What it does:**

- Identifies Water-type counters
- Explains why Water beats Fire
- Suggests specific Pokemon
- Recommends Trainer cards
- Provides counter-strategy explanation

**Example:**

```
Prompt: counter-deck
Input: "Lightning"
Output: Counter strategy using Fighting-type
```

---

### 3. optimize-deck

**Improve existing deck lists**

**Usage:**

```
Use the optimize-deck prompt with deck list
```

**What it does:**

- Validates deck legality
- Analyzes energy curve
- Suggests improvements
- Identifies weak matchups
- Recommends replacements

**Example:**

```
Prompt: optimize-deck
Input: [list of 20 cards]
Output: Optimization suggestions + improved list
```

---

## Example Workflows

### Workflow 1: Building a New Deck

**Step 1: Choose Core Pokemon**

```
User: "I want to build a competitive deck. What are the best Pokemon?"

Claude: [Uses search_cards to find top Pokemon]
→ Lists S-tier Pokemon with stats
```

**Step 2: Research Synergies**

```
User: "Build around Charizard ex"

Claude: [Uses find_synergies tool]
→ Suggests Fire-type Pokemon and Trainers
→ Provides strategy explanation
```

**Step 3: Analyze Energy**

```
User: "What's the energy curve for this deck?"

Claude: [Uses analyze_deck tool]
→ Calculates energy requirements
→ Suggests energy-efficient alternatives
```

**Step 4: Find Counters**

```
User: "What counters this deck?"

Claude: [Uses find_counters tool]
→ Identifies Water-type threats
→ Explains counter-strategy
```

**Result:** Complete competitive deck with 20 cards and strategy guide

---

### Workflow 2: Meta Analysis

**Step 1: Research Top Decks**

```
User: "What are the top 5 most played decks?"

Claude: [Uses query_cards + analysis]
→ Ranks decks by usage
→ Provides win rates
→ Lists deck archetypes
```

**Step 2: Type Distribution**

```
User: "Show me type statistics"

Claude: [Uses get_type_stats tool]
→ Bar chart of type distribution
→ Average HP by type
→ Strongest Pokemon per type
```

**Step 3: Counter Strategies**

```
User: "What counters the current meta?"

Claude: [Analyzes find_counters for multiple types]
→ Counter matrix
→ Recommended tech cards
→ Meta predictions
```

**Result:** Comprehensive meta analysis with counter-strategies

---

### Workflow 3: Card Collection

**Step 1: Find Target Cards**

```
User: "I want to collect all Pikachu cards"

Claude: [Uses search_cards with name="Pikachu"]
→ Lists all Pikachu variants
→ Shows rarity and set info
→ Provides image links
```

**Step 2: Evaluate Value**

```
User: "Which Pikachu is most valuable?"

Claude: [Analyzes rarity, stats, competitive play]
→ Ranks by value
→ Explains why each is valuable
→ Suggests collection priorities
```

**Step 3: Track Collection**

```
User: "Help me track my collection"

Claude: [Uses query_cards]
→ Shows cards you have/don't have
→ Suggests cards to acquire
→ Tracks completion percentage
```

**Result:** Organized collection plan with priorities

---

## Advanced Configuration

### Multiple MCP Servers

**Run multiple Pokemon MCP servers (different versions)**

```json
{
  "mcpServers": {
    "pokemon-pocket-stable": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server@1.0.0"]
    },
    "pokemon-pocket-latest": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server@latest"]
    }
  }
}
```

---

### Custom Database Path

**Use custom CSV file**

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "node",
      "args": ["/path/to/mcp-server/dist/index.js"],
      "env": {
        "DATABASE_PATH": "/path/to/custom/cards.csv"
      }
    }
  }
}
```

**CSV Format:**

```csv
id,name,set,set_name,card_number,type,hp,rarity,abilities,attacks,weakness,resistance,retreat_cost,image_url,card_url
uuid,Pikachu ex,Genetic Apex,A1,012,Lightning,110,Rare Ultra,None,Thunder Shock=20|Please Paralyze=20,Fighting,None,1,https://...,https://...
```

---

### Logging Configuration

**Enable debug logging**

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"],
      "env": {
        "LOG_LEVEL": "debug"
      }
    }
  },
  "logging": {
    "level": "debug",
    "file": "/path/to/logs/mcp.log"
  }
}
```

**Log Levels:**

- `error`: Only errors
- `warn`: Warnings and errors
- `info`: General information
- `debug`: Detailed debugging

---

### Custom Port

**Avoid port conflicts**

```json
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"],
      "env": {
        "PORT": "3001"
      }
    }
  }
}
```

---

## Troubleshooting

### Issue: "Server not found"

**Symptoms:**

- Error: "Failed to connect to MCP server"
- Tools not available

**Solutions:**

1. Restart Claude Desktop completely
2. Check config file syntax (use JSON validator)
3. Verify command path (absolute vs relative)
4. Check logs: Settings → Developer → Server Logs

**Config Validation:**

```bash
# Validate JSON syntax
python -m json.tool claude_desktop_config.json
# or
cat config.json | jq .
```

---

### Issue: "Tools not showing"

**Symptoms:**

- Server connected but no tools available
- Only resources show, no tools

**Solutions:**

1. Check server version: `npx pokemon-pocket-mcp-server --version`
2. Clear npm cache: `npm cache clean --force`
3. Force reinstall: `npm uninstall pokemon-pocket-mcp-server && npm install`
4. Use bun instead: `bunx pokemon-pocket-mcp-server`

---

### Issue: Slow Performance

**Symptoms:**

- Queries take 5+ seconds
- Timeouts

**Solutions:**

1. Use `uniqueOnly: true` (reduces result size)
2. Add `limit` parameter (e.g., `limit: 50`)
3. Use `fields: "minimal"` for quick results
4. Upgrade to bun runtime (faster)

**Performance Tips:**

```javascript
// Fast query
{
  "name": "Pikachu",
  "uniqueOnly": true,
  "fields": "minimal",
  "limit": 20
}

// Slow query
{
  "uniqueOnly": false,
  "fields": "full"
}
```

---

### Issue: Database errors

**Symptoms:**

- "Card not found"
- Empty results
- SQL errors

**Solutions:**

1. Check if card name is exact: `Pikachu ex` not `pikachu`
2. Verify set code: `A1` not `genetic-apex`
3. Check available sets: Use `get_type_stats` or `query_cards`

**Debug SQL:**

```sql
-- List all available sets
SELECT DISTINCT set_code FROM cards ORDER BY set_code;

-- Find exact card name
SELECT name FROM cards WHERE name ILIKE '%pikachu%' LIMIT 10;

-- Check total cards
SELECT COUNT(*) FROM cards;
```

---

### Issue: Permission Denied

**Symptoms:**

- Error: "Cannot read/write file"
- Config file won't save

**Solutions:**

```bash
# Fix permissions (macOS/Linux)
chmod 644 ~/Library/Application\ Support/Claude/claude_desktop_config.json

# Or use sudo (not recommended)
sudo chmod 777 ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

**Windows:**

1. Right-click file
2. Properties → Security
3. Add your user with "Full Control"

---

### Issue: Server Crashes

**Symptoms:**

- Server disconnects randomly
- Errors in logs
- Tools become unavailable

**Solutions:**

1. Check available memory: `free -h` or Activity Monitor
2. Reduce query size: Use `limit` parameter
3. Restart regularly: Claude Desktop auto-restarts
4. Report issue: GitHub issue with logs

**Check Logs:**

1. Claude Desktop → Settings → Developer → Server Logs
2. Look for error messages
3. Share relevant log snippets when reporting

---

### Getting Help

**Documentation:**

- README: https://github.com/briansunter/pokeclaude
- Issues: https://github.com/briansunter/pokeclaude/issues
- Discussions: https://github.com/briansunter/pokeclaude/discussions

**Before Reporting:**

1. ✅ Restart Claude Desktop
2. ✅ Check logs for errors
3. ✅ Try simple query (search for Pikachu)
4. ✅ Note exact version (npx --version)

**Information to Include:**

- Operating System (macOS/Windows/Linux)
- Software versions (Node.js/Bun, Claude Desktop)
- Config file (sanitized)
- Error logs
- Steps to reproduce

---

## Conclusion

**You now have:**

✅ MCP server successfully installed and configured
✅ 7 powerful tools for card analysis
✅ 3 database resources for research
✅ 3 prompt templates for deck building
✅ Knowledge of advanced configuration options

**Next Steps:**

1. **Experiment**: Try different tools and queries
2. **Build Decks**: Use the deck building prompts
3. **Research**: Analyze the meta with queries
4. **Contribute**: Submit improvements to the project

**Happy Deck Building!** 🃏

---

## Quick Reference

### Essential Commands

```json
// Basic setup (npx)
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"]
    }
  }
}

// Fast setup (bunx)
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "bunx",
      "args": ["pokemon-pocket-mcp-server"]
    }
  }
}

// Local development
{
  "mcpServers": {
    "pokemon-pocket": {
      "command": "node",
      "args": ["/absolute/path/to/dist/index.js"]
    }
  }
}
```

### Key Tools

| Tool             | Purpose            | Example                       |
| ---------------- | ------------------ | ----------------------------- |
| `search_cards`   | Find cards         | `{"type":"Fire","minHp":100}` |
| `get_card`       | Get details        | `{"name":"Pikachu ex"}`       |
| `find_synergies` | Build decks        | `{"cardName":"Charizard ex"}` |
| `find_counters`  | Counter strategies | `{"targetType":"Fire"}`       |
| `get_type_stats` | Meta analysis      | `{}`                          |
| `query_cards`    | Custom SQL         | `{"sql":"SELECT..."}`         |
| `analyze_deck`   | Deck validation    | `{"cardNames":[...]}`         |

### Config File Locations

| OS          | Path                                                              |
| ----------- | ----------------------------------------------------------------- |
| **macOS**   | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| **Windows** | `%APPDATA%\Claude\claude_desktop_config.json`                     |
| **Linux**   | `~/.config/claude/claude_desktop_config.json`                     |

### Performance Tips

✅ Use `uniqueOnly: true` (50% fewer results)
✅ Add `limit` parameter (default 50, max 100)
✅ Use `fields: "minimal"` for speed
✅ Avoid `uniqueOnly: false` unless needed
✅ Use bun instead of Node.js for speed

---

_This guide provides everything needed to integrate the PokeClaude MCP Server with Claude Desktop for Pokemon TCG Pocket analysis and deck building._

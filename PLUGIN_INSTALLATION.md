# Pokemon TCG Pocket Claude Plugin - Installation Guide

This guide provides step-by-step instructions for installing and using the Pokemon TCG Pocket Claude Code plugin.

## 🚀 Quick Start (Claude Code)

If you're using **Claude Code**, the easiest installation method is:

```
# In Claude Code
/plugin marketplace add /path/to/pokeclaude
/plugin install pokemon-tcg-pocket@pokemon-tcg-pocket-marketplace
```

That's it! Skip to [Usage Examples](#-usage-examples) to start using the plugin.

---

## 📋 Installation Options

You have 4 installation options depending on your needs:

1. **[Claude Code Plugin Marketplace](#option-1-claude-code-plugin-marketplace-recommended)** - Easiest for Claude Code users
2. **[MCP Server Only (npx)](#option-2-mcp-server-only-npx)** - Simple, always up-to-date
3. **[Full Plugin Manual](#option-3-full-plugin-manual)** - Complete with commands and skills
4. **[Local Development](#option-4-local-development)** - For contributors and custom builds

---

## Option 1: Claude Code Plugin Marketplace (Recommended) ⭐

This is the **easiest** way to use Pokemon TCG Pocket with **Claude Code**.

### Prerequisites

- Claude Code installed
- Access to this repository (local path)

### Installation Steps

#### Step 1: Add Marketplace in Claude Code

In Claude Code, run:

```
/plugin marketplace add /path/to/pokeclaude
```

#### Step 2: Install Plugin

```
/plugin install pokemon-tcg-pocket@pokemon-tcg-pocket-marketplace
```

#### Step 3: Verify Installation

The plugin is ready when you see:

- Commands: `/pokemon:build-deck`, `/pokemon:analyze`, `/pokemon:find-counters`, `/pokemon:meta`
- Skills auto-activate based on context

### What You Get

✅ **4 Commands** - Slash commands for common tasks
✅ **4 Skills** - Auto-activating based on context
✅ **MCP Server** - 7 tools for card search and analysis
✅ **2,077 Cards** - Complete Pokemon Pocket TCG database

---

## Option 2: MCP Server Only (npx)

This is a simple way to use Pokemon TCG Pocket with **Claude Desktop** (without plugin features).

### Prerequisites

- Claude Desktop installed
- Node.js 18+ installed (check with `node --version`)
- Internet connection

### Installation Steps

#### Step 1: Find Claude Desktop Config File

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

#### Step 2: Add MCP Server Configuration

Open the config file in your favorite editor and add:

```json
{
  "mcpServers": {
    "pokemon-pocket-mcp": {
      "command": "npx",
      "args": ["pokemon-pocket-mcp-server"],
      "env": {}
    }
  }
}
```

#### Step 3: Restart Claude Desktop

Close Claude Desktop completely and restart it.

#### Step 4: Test Installation

In Claude, try:

```
search_cards for "Pikachu"
```

You should see Pokemon card results!

### Advantages

✅ Simple one-time setup
✅ Always uses latest version
✅ No building or cloning required
✅ Works with any Node.js version
✅ Automatic updates

### Disadvantages

❌ No access to plugin commands
❌ No auto-activating skills
❌ Manual query required

---

## Option 3: Full Plugin Manual

Get the complete plugin experience with 4 commands and 4 auto-activating skills.

### Prerequisites

- Claude Desktop with plugin support
- Node.js 18+ installed
- Git installed

### Installation Steps

#### Step 1: Clone Repository

```bash
git clone https://github.com/briansunter/pokeclaude.git
cd pokeclaude
```

#### Step 2: Verify Plugin Structure

```bash
ls -la claude-plugins/

# Should show:
# marketplace.json
# pokemon-tcg-pocket/
```

#### Step 3: Build MCP Server

```bash
# Install dependencies
npm install

# Build MCP server
npm run build

# Copy card data
cp data/pokemon_pocket_cards.csv mcp-server/data/
```

#### Step 4: Get Absolute Path

```bash
pwd

# Example output:
# /Users/username/code/pokeclaude
```

Use this path in the next step.

#### Step 5: Configure Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "pokemon-pocket-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/pokeclaude/mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

**Replace `/absolute/path/to/pokeclaude` with your actual path!**

#### Step 6: Restart Claude Desktop

Close Claude Desktop completely and restart it.

#### Step 7: Test Plugin Commands

In Claude, try:

```
/pokemon:build-deck Build a Pikachu ex deck
/pokemon:analyze Analyze Charizard ex
/pokemon:find-counters What counters Lightning?
/pokemon:meta Current S-tier list
```

### Advantages

✅ Full plugin experience
✅ 4 powerful commands
✅ 4 auto-activating skills
✅ Complete customization
✅ Works offline after initial setup

### Disadvantages

❌ Requires manual updates
❌ Need to rebuild after changes
❌ Path-specific configuration

---

## Option 4: Local Development

**For contributors, developers, and those who want to customize the plugin.**

This is the only option where you need to clone the repository.

### Installation Steps

#### Step 1: Clone Repository

```bash
git clone https://github.com/briansunter/pokeclaude.git
cd pokeclaude
```

#### Step 2: Install Dependencies

```bash
npm install
# or
bun install
```

#### Step 3: Build Everything

```bash
# Type check
npm run typecheck

# Build MCP server
npm run build

# Run tests
npm run test

# Copy data
cp data/pokemon_pocket_cards.csv mcp-server/data/
```

#### Step 4: Configure Claude Desktop

Use absolute path:

```bash
pwd
# Example: /Users/username/code/pokeclaude
```

Add to config:

```json
{
  "mcpServers": {
    "pokemon-pocket-mcp": {
      "command": "node",
      "args": ["/Users/username/code/pokeclaude/mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

#### Step 5: Start Development Server

```bash
cd mcp-server
npm run dev
```

#### Step 6: Test Everything

In Claude:

```
# Test MCP tools
search_cards for "Pikachu"

# Test commands
/pokemon:build-deck Build a deck
/pokemon:analyze Analyze a card

# Test skills
Build a Pikachu ex deck
```

### Development Workflow

```bash
# Make changes to code
vim mcp-server/src/index.ts

# Rebuild
npm run build

# Test in Claude
# (No restart needed, auto-reload)

# Run tests
npm run test

# Update card data
npm run scrape
```

### Advantages

✅ Full development setup
✅ Auto-reload on changes
✅ Easy testing and debugging
✅ Contribute to the project
✅ Customize as needed

### Disadvantages

❌ Requires development knowledge
❌ Manual setup process
❌ Need to rebuild after changes

---

## 🔧 Configuration Details

### Config File Location

**Claude Desktop Config:**

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux:** `~/.config/claude/claude_desktop_config.json`

### Configuration Format

```json
{
  "mcpServers": {
    "server-name": {
      "command": "executable",
      "args": ["argument1", "argument2"],
      "env": {
        "KEY": "value"
      }
    }
  }
}
```

### MCP Server Fields

- **command**: Executable to run (npx, node, bunx)
- **args**: Arguments array
- **env**: Environment variables (optional)

### Finding Your Path

**macOS/Linux:**

```bash
pwd
# Returns: /Users/username/code/pokeclaude

# Use this in config:
"args": ["/Users/username/code/pokeclaude/mcp-server/dist/index.js"]
```

**Windows (PowerShell):**

```powershell
pwd
# Returns: C:\Users\username\code\pokeclaude

# Use this in config:
"args": ["C:\\Users\\username\\code\\pokeclaude\\mcp-server\\dist\\index.js"]
```

---

## ✅ Verification & Testing

### Verify Installation

#### Test 1: MCP Tools

In Claude, type:

```
search_cards for "Pikachu"
```

**Expected Result:** Returns Pikachu cards with details

#### Test 2: Commands (Full Plugin Only)

```
/pokemon:build-deck
```

**Expected Result:** Claude explains how to build a deck

```
/pokemon:analyze Charizard ex
```

**Expected Result:** Claude analyzes Charizard ex card

#### Test 3: Skills (Full Plugin Only)

Type:

```
Build a Lightning deck for competitive play
```

**Expected Result:** Pokemon Deck Builder Skill activates automatically

#### Test 4: Check Logs

If issues, check Claude Desktop logs:

**macOS:**

```bash
tail -f ~/Library/Logs/Claude/*.log
```

**Windows:**

```powershell
Get-Content $env:APPDATA\Claude\logs\*.log -Wait
```

**Linux:**

```bash
tail -f ~/.config/claude/logs/*.log
```

---

## 🚨 Troubleshooting

### MCP Server Not Starting

**Symptoms:**

- No response from Claude
- "Server not found" error
- Empty search results

**Solutions:**

1. Check Node.js version:

```bash
node --version
# Should be 18.0.0 or higher
```

2. Test npx manually:

```bash
npx pokemon-pocket-mcp-server --version
```

3. Check config file syntax:

```bash
jq . claude_desktop_config.json
# Should return valid JSON
```

4. Restart Claude Desktop

### Permission Denied

**Symptoms:**

- "Permission denied" error
- Cannot execute command

**Solutions:**

1. Make sure you have permissions:

```bash
chmod +x /path/to/pokeclaude/mcp-server/dist/index.js
```

2. Check ownership:

```bash
ls -la /path/to/pokeclaude/mcp-server/dist/index.js
```

### Command Not Found

**Symptoms:**

- "Command not found" error
- npx not working

**Solutions:**

1. Reinstall npx:

```bash
npm install -g npx
```

2. Use full path:

```bash
# Instead of "npx"
# Use full path to node
"command": "/usr/local/bin/node",
"args": ["/usr/local/bin/npx", "pokemon-pocket-mcp-server"]
```

### No Cards Returned

**Symptoms:**

- Empty search results
- Database not loaded

**Solutions:**

1. Check CSV file exists:

```bash
ls -la mcp-server/data/pokemon_pocket_cards.csv
# Should show file size > 0
```

2. Rebuild with data:

```bash
npm run build
cp data/pokemon_pocket_cards.csv mcp-server/data/
```

3. Check server logs:

```bash
# In Claude Desktop logs, look for:
# "DuckDB initialized"
# "2077 cards loaded"
```

### Plugin Commands Not Working

**Symptoms:**

- Slash commands not recognized
- Skills not auto-activating

**Solutions:**

1. Verify plugin structure:

```bash
ls -la claude-plugins/pokemon-tcg-pocket/
# Should show commands/, skills/, .claude-plugin/
```

2. Check plugin.json:

```bash
cat claude-plugins/pokemon-tcg-pocket/.claude-plugin/plugin.json
# Should be valid JSON
```

3. Restart Claude Desktop completely

### Config File Issues

**Symptoms:**

- Invalid JSON error
- Config not loading

**Solutions:**

1. Validate JSON:

```bash
jq . claude_desktop_config.json
# Should show config, not error
```

2. Backup and recreate:

```bash
cp claude_desktop_config.json claude_desktop_config.json.backup
```

3. Check file permissions:

```bash
# File should be readable by your user
chmod 600 claude_desktop_config.json
```

---

## 📚 Additional Resources

### Documentation

- **PLUGIN_MARKETPLACE.md** - Complete plugin documentation
- **README.md** - Project overview and MCP server docs
- **CLAUDE.md** - Claude Code instructions for this repo
- **PLUGIN_SUMMARY.md** - Plugin creation summary

### Useful Commands

```bash
# Update card data
npm run scrape

# Build everything
npm run build

# Run tests
npm run test

# Type check
npm run typecheck

# Clean build
rm -rf mcp-server/dist && npm run build
```

### File Locations

```
/path/to/pokeclaude/
├── mcp-server/              # MCP server source
│   ├── src/
│   ├── dist/               # Built output
│   └── data/
│       └── pokemon_pocket_cards.csv
├── claude-plugins/         # Plugin marketplace
│   ├── marketplace.json
│   └── pokemon-tcg-pocket/
├── data/                   # Card database source
└── .mcp.json              # MCP config template
```

---

## ❓ FAQ

### Q: Do I need to rebuild after updating the repo?

**A:** Only for Option 2 (Full Plugin) and Option 3 (Local Development). Option 1 (MCP Server Only) automatically uses the latest version.

### Q: Can I use both the MCP server and the full plugin?

**A:** No, you should only use one. The MCP server provides the backend tools, and the plugin provides the commands and skills. Using both would be redundant.

### Q: How do I update the card database?

**A:** Run `npm run scrape` in the repository root. This fetches new cards from limitlesstcg.com and updates the database.

### Q: Can I customize the plugin?

**A:** Yes! With Option 3 (Local Development), you can modify commands, skills, and the MCP server. See PLUGIN_MARKETPLACE.md for details.

### Q: Does this work with Claude on the web?

**A:** No, this only works with Claude Desktop (the app), not the web version.

### Q: Can I install multiple MCP servers?

**A:** Yes! You can have multiple entries in your `mcpServers` config. Just give each one a unique name.

### Q: What's the difference between commands and skills?

**A:** Commands are manually typed (e.g., `/pokemon:build-deck`). Skills auto-activate based on context (e.g., typing "build a deck" automatically triggers the Pokemon Deck Builder Skill).

### Q: How many cards are in the database?

**A:** 2,077 total cards, 1,068 unique cards (art variants removed).

### Q: How often is the data updated?

**A:** The scraper runs on-demand. New sets are automatically discovered, but you need to run `npm run scrape` to update.

### Q: Can I use this for standard Pokemon TCG (not Pocket)?

**A:** This plugin is specifically for Pokemon TCG Pocket format (20-card decks, energy zone). Standard TCG has different rules (60-card decks, energy in deck).

---

## 🆘 Need Help?

If you're still having issues:

1. Check the troubleshooting section above
2. Look at Claude Desktop logs
3. Read PLUGIN_MARKETPLACE.md for detailed docs
4. Open an issue on GitHub: https://github.com/briansunter/pokeclaude/issues
5. Join the Pokemon TCG Pocket community

---

**Happy deck building!** 🎮

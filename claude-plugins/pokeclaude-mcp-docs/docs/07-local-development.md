# Local Development

Running the Pokemon Pocket MCP server from source.

## Prerequisites

- Node.js 18+ or Bun
- Git
- TypeScript knowledge (optional but helpful)

## Getting the Source

### Clone Repository

```bash
git clone https://github.com/briansunter/pokeclaude.git
cd pokeclaude
```

### Directory Structure

```
pokeclaude/
├── mcp-server/          # MCP server source
│   ├── src/            # TypeScript files
│   ├── dist/           # Compiled output (generated)
│   └── data/           # Card database (generated)
├── scraper/            # Data scraper
├── data/               # Source CSV data
├── claude-plugin/      # Claude Code plugin
└── package.json        # Root workspace config
```

## Installation

### Using npm

```bash
npm install
```

### Using bun (faster)

```bash
bun install
```

## Building

### Development Build

```bash
cd mcp-server
npm run build
```

This:

1. Creates `data/` directory
2. Copies CSV from `../data/` to `mcp-server/data/`
3. Compiles TypeScript to `dist/`

### Production Build

```bash
npm run build
```

Output is in `mcp-server/dist/`.

## Running Locally

### Method 1: Development Mode

```bash
cd mcp-server
npm run dev
```

Uses tsx for hot-reloading during development.

### Method 2: Compiled Output

```bash
cd mcp-server
npm run build
npm start
```

Runs the compiled JavaScript from `dist/`.

## Claude Desktop Configuration

### Point to Local Build

Add to Claude Desktop config:

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

**Important:** Use absolute path, not relative!

### Example Paths

| Platform | Example Path                                                  |
| -------- | ------------------------------------------------------------- |
| macOS    | `/Users/username/pokeclaude/mcp-server/dist/index.js`         |
| Linux    | `/home/username/pokeclaude/mcp-server/dist/index.js`          |
| Windows  | `C:\\Users\\username\\pokeclaude\\mcp-server\\dist\\index.js` |

## Updating Card Data

### Incremental Update (6-7 minutes)

```bash
cd /path/to/pokeclaude
npm run scrape
```

Fetches only new cards from limitlesstcg.com.

### Full Refresh

```bash
npm run scrape:full
```

Fetches all cards from scratch.

### Rebuild After Scraping

```bash
npm run build
```

Required to update the MCP server with new data.

## Testing

### Run Tests

```bash
cd mcp-server
npm run test
```

Uses bun test with 120s timeout.

### Manual Testing

```bash
cd mcp-server
npm run test:manual
```

Starts server for manual tool testing.

## Development Workflow

### Typical Session

1. **Make changes to `mcp-server/src/`**

   ```bash
   # Edit files in src/
   ```

2. **Type check**

   ```bash
   npm run typecheck
   ```

3. **Run in dev mode**

   ```bash
   npm run dev
   ```

4. **Test changes**

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Update Claude Desktop**
   ```json
   "args": ["/absolute/path/to/pokeclaude/mcp-server/dist/index.js"]
   ```

## Code Quality

### Linting

```bash
npm run lint          # Check
npm run lint:fix      # Fix auto-fixable issues
```

### Formatting

```bash
npm run format        # Format code
npm run format:check  # Check formatting
```

### Type Checking

```bash
npm run typecheck
```

### All Checks

```bash
npm run check:all
```

## Publishing

### Preparing for Release

1. **Update version** in `mcp-server/package.json`
2. **Build** the server
3. **Run tests** to verify
4. **Commit** changes

### Publishing to npm

From `mcp-server/`:

```bash
npm publish
```

Or use the automated CI/CD pipeline (push to main branch).

## Troubleshooting

### Build Fails

**Check:**

- Node.js version 18+
- Dependencies installed: `npm install`
- CSV file exists: `ls data/pokemon_pocket_cards.csv`

### Server Not Starting

**Check:**

- Build succeeded: `ls dist/index.js`
- CSV was copied: `ls mcp-server/data/pokemon_pocket_cards.csv`
- Run in dev mode for better errors: `npm run dev`

### Data Issues

**Re-scrape:**

```bash
npm run scrape:full
npm run build
```

## Project-Specific Scripts

| Script      | Command               | Purpose           |
| ----------- | --------------------- | ----------------- |
| scrape      | `npm run scrape`      | Update card data  |
| scrape:full | `npm run scrape:full` | Full data refresh |
| build       | `npm run build`       | Build MCP server  |
| typecheck   | `npm run typecheck`   | Type validation   |
| test        | `npm run test`        | Run tests         |
| lint        | `npm run lint`        | Code quality      |
| format      | `npm run format`      | Code formatting   |

## See Also

- `docs/00-installation.md` - Published package installation
- `docs/02-tools-reference.md` - MCP tools reference
- `../CLAUDE.md` - Developer documentation

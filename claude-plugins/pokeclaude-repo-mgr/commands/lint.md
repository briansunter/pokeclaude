---
name: lint
description: Run ESLint on all TypeScript files in mcp-server and scraper
---

# Lint Code

Run ESLint to check code quality and find potential issues.

## What This Does

- Checks `mcp-server/src/**/*.{ts,js}`
- Checks `scraper/src/**/*.{ts,js}`
- Reports code quality issues and suggestions

## Usage

```
/repo:lint
```

## Execution

Change to the `pokeclaude/` directory and run:

```bash
cd /Volumes/Storage/code/pokeclaude/pokeclaude && npm run lint
```

## Auto-Fix Option

To automatically fix lint issues:

```bash
npm run lint:fix
```

## Output

- List of lint errors and warnings
- File and line numbers for issues
- Auto-fixable issues are resolved with `--fix`

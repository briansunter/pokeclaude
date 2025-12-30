---
name: format
description: Format code using Prettier (TypeScript, JavaScript, JSON, Markdown, YAML)
---

# Format Code

Format all project files using Prettier for consistent code style.

## What This Does

Formats files matching patterns:

- `**/*.{ts,js}` - TypeScript and JavaScript
- `**/*.json` - JSON files
- `**/*.md` - Markdown files
- `**/*.{yml,yaml}` - YAML files

## Usage

```
/repo:format
```

## Execution

Change to the `pokeclaude/` directory and run:

```bash
cd /Volumes/Storage/code/pokeclaude/pokeclaude && npm run format
```

## Check Format Only

To check formatting without making changes:

```bash
npm run format:check
```

## Output

- Lists files that were formatted
- Shows differences if check fails
- Exit code 1 if formatting is needed

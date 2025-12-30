---
name: typecheck
description: Run TypeScript type checking on both mcp-server and scraper workspaces
---

# Type Check

Run TypeScript compiler to verify type correctness across all workspaces.

## What This Does

- Type checks `mcp-server/src/**/*.ts`
- Type checks `scraper/src/**/*.ts`
- Reports type errors without emitting JavaScript

## Usage

```
/repo:typecheck
```

## Execution

Change to the `pokeclaude/` directory and run:

```bash
cd /Volumes/Storage/code/pokeclaude/pokeclaude && npm run typecheck
```

## Output

Type validation results:

- Number of files checked
- Any type errors found
- Error locations and descriptions
- Exit code 0 if valid, 1 if errors exist

## Notes

- Uses `tsc --noEmit` flag
- Checks both workspace packages
- Required before CI/CD deployment

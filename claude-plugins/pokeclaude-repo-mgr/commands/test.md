---
name: test
description: Run all PokeClaude tests (MCP server and scraper)
---

# Run PokeClaude Tests

Execute the full test suite for the PokeClaude project.

## What This Does

Runs both test suites:

1. `npm run test:mcp-server` - MCP server unit tests
2. `npm run test:scraper` - Scraper validation tests

## Usage

```
/repo:test
```

## Execution

Change to the `pokeclaude/` directory and run:

```bash
cd /Volumes/Storage/code/pokeclaude/pokeclaude && npm run test
```

## Output

Test results including:

- MCP server API tests
- Scraper functionality tests
- Pass/fail status for each suite
- Total execution time

## Notes

- Tests use bun test runner with 120s timeout
- MCP server tests include CSV data loading
- Scraper tests validate data parsing

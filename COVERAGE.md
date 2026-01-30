# Test Coverage

## Current Status

Bun's test coverage is currently experimental and has known issues with:
- `beforeAll/afterAll` hooks
- Async test cleanup
- Coverage instrumentation with certain test patterns

## Running Coverage

```bash
# Basic coverage (may have issues with lifecycle hooks)
bun run test:coverage

# Standard tests
bun run test
```

## Coverage Goals

| Component | Target | Current |
|-----------|--------|---------|
| Core functionality | 80% | TBD |
| MCP tools | 80% | TBD |
| CLI commands | 80% | TBD |
| Database queries | 90% | TBD |

## Alternative Coverage Tools

When bun coverage is stable, or if you need coverage now:

```bash
# Using c8 with Node.js (requires running tests with node)
npx c8 bun test

# Or switch to a test framework with mature coverage:
# - Vitest (has excellent coverage support)
# - Jest (industry standard)
```

## Tracking

See GitHub issues for progress on bun test coverage:
- https://github.com/oven-sh/bun/issues/
- Search for "test coverage" label

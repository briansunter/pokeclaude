---
name: check-all
description: Run all quality checks (format, lint, typecheck, test) - full CI/CD validation
---

# Check All

Run the complete quality check pipeline - same as CI/CD validation.

## What This Does

Executes all checks in order:

1. `npm run format:check` - Verify formatting
2. `npm run lint` - Code quality checks
3. `npm run typecheck` - Type validation
4. `npm run test` - Full test suite

## Usage

```
/repo:check-all
```

## Execution

Change to the `pokeclaude/` directory and run:

```bash
cd /Volumes/Storage/code/pokeclaude/pokeclaude && npm run check:all
```

## Output

Comprehensive report including:

- Format validation status
- Lint findings
- Type check results
- Test pass/fail summary
- Overall status (PASS/FAIL)

## Exit Codes

- 0: All checks passed
- 1: One or more checks failed

## Notes

- This is the same pipeline used in GitHub Actions CI/CD
- All checks must pass for deployment
- Run this before committing major changes

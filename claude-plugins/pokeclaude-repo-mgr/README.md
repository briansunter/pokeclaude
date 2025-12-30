# PokeClaude Repository Manager

Developer commands for managing the PokeClaude repository.

## Commands

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `/repo:test`      | Run all PokeClaude tests               |
| `/repo:build`     | Build the MCP server                   |
| `/repo:lint`      | Run ESLint code quality checks         |
| `/repo:format`    | Format code with Prettier              |
| `/repo:scrape`    | Update Pokemon card data               |
| `/repo:typecheck` | Run TypeScript type checking           |
| `/repo:check-all` | Run all quality checks (CI validation) |

## Usage

Run commands from the repository root (`pokeclaude/`):

```
/repo:test
/repo:build
/repo:check-all
```

## Working Directory

All commands assume execution from the `pokeclaude/` directory.

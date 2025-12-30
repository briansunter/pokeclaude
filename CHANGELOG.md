## [1.3.0](https://github.com/briansunter/pokeclaude/compare/v1.2.1...v1.3.0) (2025-12-30)

### Features

- add CLI mode and fix findCounters bug ([0db9da0](https://github.com/briansunter/pokeclaude/commit/0db9da00c17b6324f1ae004a4cc172cae769b244))

### Bug Fixes

- add legacy-peer-deps to npmrc for semantic-release ([ac39051](https://github.com/briansunter/pokeclaude/commit/ac39051f2cea9fa7a58045e8d9a72dced4e19d3f))
- add NPM_CONFIG_LEGACY_PEER_DEPS env var for semantic-release ([84f67a0](https://github.com/briansunter/pokeclaude/commit/84f67a0cad8f1557eca49a36c10a368cc0d8b905))
- add npmVersionArgs to semantic-release for legacy-peer-deps ([d8ceeb6](https://github.com/briansunter/pokeclaude/commit/d8ceeb6bcc22d662767aecea2062deb109d4f339))
- move zod to peerDependencies to resolve npm pack issue ([3bd442c](https://github.com/briansunter/pokeclaude/commit/3bd442cbf8611bb1cf23bfba710c00f0ec5e4dd1))

## [1.2.1](https://github.com/briansunter/pokeclaude/compare/v1.2.0...v1.2.1) (2025-12-30)

### Bug Fixes

- pin bun version and move .npmrc creation to CI step ([366752a](https://github.com/briansunter/pokeclaude/commit/366752aacc2a47974dc8a1a5ebb01df69d0084b2))
- remove --frozen-lockfile to allow platform differences ([6461308](https://github.com/briansunter/pokeclaude/commit/6461308b9b3395cbf01cfa81149a64255083867b))

## [1.2.0](https://github.com/briansunter/pokeclaude/compare/v1.1.0...v1.2.0) (2025-10-31)

### Features

- Add Pokemon TCG Pocket comprehensive research documentation ([0ec3ab3](https://github.com/briansunter/pokeclaude/commit/0ec3ab37a4c7fe8be4b113192620f740e43353eb))
- enhance docs and claude skills with company history and technical guides ([038cdb1](https://github.com/briansunter/pokeclaude/commit/038cdb18374f2a615ff9691cf24a3c0040c07c4d))
- Update for b1 mega evolutions ([dad3c05](https://github.com/briansunter/pokeclaude/commit/dad3c052780603f6eb118fe5ed293fd3cb4142f2))

### Bug Fixes

- Add --timeout flag to bun test command ([cfb4726](https://github.com/briansunter/pokeclaude/commit/cfb47264f6e4155001487b4d8c30b5e7fb194655))
- Add .bunfig.toml to increase test timeout to 60s ([4b6554f](https://github.com/briansunter/pokeclaude/commit/4b6554fa97a69d5c5ae61a319f4b2c0dd6679c8d))
- add build step before tests in CI to copy CSV data ([f3fd5a2](https://github.com/briansunter/pokeclaude/commit/f3fd5a24b803d23a918f7d49a7051c6175d9625d))
- Add cleanup step to kill stuck Bun processes in CI ([bf57d23](https://github.com/briansunter/pokeclaude/commit/bf57d23b246aa38d39bf7652133dc4d8a6d74235))
- Add cleanup step to release workflow too ([5fd58b5](https://github.com/briansunter/pokeclaude/commit/5fd58b57a241aed839e0aaa84b866d3a6d78e331))
- Add missing @eslint/js dependency for ESLint 9 ([b0cccb3](https://github.com/briansunter/pokeclaude/commit/b0cccb3f5badc8d94950007d74cca725673c072e))
- Add test script to scraper for CI/CD ([e4fdf23](https://github.com/briansunter/pokeclaude/commit/e4fdf23626cd8da8dee8bcb65a2995fe59cd9fa2))
- Add zod dependency and properly type MCP tool parameters ([23c012d](https://github.com/briansunter/pokeclaude/commit/23c012d7495700f4f45687849ddf057d2c69b42c))
- ensure data file is available before running tests ([824b2c1](https://github.com/briansunter/pokeclaude/commit/824b2c13b16054b059a49a33f1570428fe487ab7))
- Increase MCP request timeout from 5s to 60s ([da712e7](https://github.com/briansunter/pokeclaude/commit/da712e78fae2a33deee67339dfefd0dbd50c178e))
- Increase server wait to 4.5s to fit under 5s timeout ([0c58e53](https://github.com/briansunter/pokeclaude/commit/0c58e532d1a80a7db9a95a83b0f140361615729e))
- Increase timeouts to 120 seconds for CI ([f489c63](https://github.com/briansunter/pokeclaude/commit/f489c6313ae7e67629ec0e6db5126259235f8792))
- linting ([8da702c](https://github.com/briansunter/pokeclaude/commit/8da702c9059d67961f4546d551560b6ed0ea2e19))
- resolve integration test timeout in CI ([b577d08](https://github.com/briansunter/pokeclaude/commit/b577d0870c083a3f506e6dc3307ee7c01716c786))
- Simplify test timeout - only increase server startup wait time ([3415ae7](https://github.com/briansunter/pokeclaude/commit/3415ae7272d6b373b388bd485a4687ce81edd971))

## [1.1.0](https://github.com/briansunter/pokeclaude/compare/v1.0.0...v1.1.0) (2025-10-04)

### Features

- integrate Pokemon TCG Pocket game rules into MCP server ([ee05331](https://github.com/briansunter/pokeclaude/commit/ee053311f6dda3520f6668dd8908496d4ea41f32))

## 1.0.0 (2025-10-04)

### Bug Fixes

- add bun support with conventionalcommits preset and update README for both npm and bun ([422079e](https://github.com/briansunter/pokeclaude/commit/422079ebcdf71dfbc1419219740438b4948d6d9b))
- add timeouts to all GitHub Actions workflow jobs and steps ([d15e98b](https://github.com/briansunter/pokeclaude/commit/d15e98b60059db5a8b92b5248b0d84506b5b3a6a))
- exclude test files from typecheck to avoid bun:test module errors ([e0f81e0](https://github.com/briansunter/pokeclaude/commit/e0f81e085f7795d0d2f1f94b7cfbfb1b1087809e))
- publishing ([0c0b27c](https://github.com/briansunter/pokeclaude/commit/0c0b27c533667d854e66fd14ed33d6a769b1a59e))
- publishing ([07e9a7d](https://github.com/briansunter/pokeclaude/commit/07e9a7da88e9ddff373403a9cf61c37b4bc1b9c0))
- set up publish ([8bf3d68](https://github.com/briansunter/pokeclaude/commit/8bf3d689394c9d0fcd03b93dc3dff41896a5e0a2))
- update readme ([38b4dfa](https://github.com/briansunter/pokeclaude/commit/38b4dfa54706795baa43f5868462f4e852dfb127))

# 1.0.0 (2025-10-04)

### Bug Fixes

- add timeouts to all GitHub Actions workflow jobs and steps ([d15e98b](https://github.com/briansunter/pokeclaude/commit/d15e98b60059db5a8b92b5248b0d84506b5b3a6a))
- exclude test files from typecheck to avoid bun:test module errors ([e0f81e0](https://github.com/briansunter/pokeclaude/commit/e0f81e085f7795d0d2f1f94b7cfbfb1b1087809e))
- publishing ([0c0b27c](https://github.com/briansunter/pokeclaude/commit/0c0b27c533667d854e66fd14ed33d6a769b1a59e))
- publishing ([07e9a7d](https://github.com/briansunter/pokeclaude/commit/07e9a7da88e9ddff373403a9cf61c37b4bc1b9c0))
- set up publish ([8bf3d68](https://github.com/briansunter/pokeclaude/commit/8bf3d689394c9d0fcd03b93dc3dff41896a5e0a2))
- update readme ([38b4dfa](https://github.com/briansunter/pokeclaude/commit/38b4dfa54706795baa43f5868462f4e852dfb127))

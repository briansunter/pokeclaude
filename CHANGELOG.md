# Changelog

All notable changes to this project will be documented in this file.

## [3.0.1](https://github.com/briansunter/pokeclaude/compare/v3.0.0...v3.0.1) (2026-01-30)


### Bug Fixes

* add smart data directory path finding to root index.ts ([7ce1808](https://github.com/briansunter/pokeclaude/commit/7ce1808c1e6b72dbf95474c3b97d699ee87ef74f))

# [3.0.0](https://github.com/briansunter/pokeclaude/compare/v2.0.0...v3.0.0) (2026-01-30)


### Bug Fixes

* correct data file copy path in CI workflow ([3ec2035](https://github.com/briansunter/pokeclaude/commit/3ec2035706cc9bd5082372c23a942a3f692c4ef7))
* disable npm publishing due to invalid NPM_TOKEN ([29557cf](https://github.com/briansunter/pokeclaude/commit/29557cf4ff30fced84d569673c830263fcaa99c1))
* setup Node.js 22 for semantic-release compatibility ([beb86fa](https://github.com/briansunter/pokeclaude/commit/beb86fab7d59cfdcdbae396724a3f68ba2b41f92))
* update CI workflow for root-level package structure ([0cd1509](https://github.com/briansunter/pokeclaude/commit/0cd1509c325126155315988dccfa1da365eda0d3))


### Code Refactoring

* unify to single remote plugin with mcp subcommand ([f252544](https://github.com/briansunter/pokeclaude/commit/f2525445426e4205afe57094963467b9864899d7))


### Features

* add latest cards, infrastructure improvements, and quality enhancements ([e80f636](https://github.com/briansunter/pokeclaude/commit/e80f63654b995e3f665d9c0e3e0bc6881b653a9b))


### BREAKING CHANGES

* package renamed from pokemon-pocket-mcp-server to pokeclaude

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>

# Changelog

All notable changes to the Pokemon TCG Pocket card database and MCP server will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Attack format validation to CSV validation script
- Detailed error reporting for skipped cards during scraping
- Improved path resolution in full_update.sh script
- Evolution data validation

### Changed
- Increased server initialization timeout from 3s to 5s for better reliability
- Improved weakness field parsing (fixed bug including retreat cost and ex rules)
- Increased weakness field max length from 50 to 100 characters in schema

### Fixed
- **Critical**: Weakness field parsing bug - now correctly extracts only type weakness (e.g., "Fire") instead of including retreat cost and ex rules
- Test timeout issue - increased initialization wait time
- Script path resolution - full_update.sh now works from any directory

## [2.0.0] - 2026-01-30

### Added
- **B2: Fantastical Parade** (234 cards) - Latest expansion set
- **B1a: Crimson Blaze** (103 cards)
- **B1: Mega Rising** (331 cards)
- **P-B: Promo-B** (32 cards)
- Evolution metadata fields for all 2,777 cards:
  - `evolution_stage` - Basic/Stage 1/Mega Evolution
  - `evolves_from`, `evolves_to` - Evolution chain
  - `evolution_type` - Regular/Mega
  - `base_pokemon_id` - Base Pokemon UUID
  - `is_evolution` - true/false
  - `evolution_method` - Evolution method description
- CSV validation script with comprehensive checks:
  - Required fields validation
  - Data type validation (UUIDs, URLs, HP, retreat cost)
  - Duplicate detection
  - Attack format validation
  - Statistics generation
  - Sample verification against website
- Automated workflow script (full_update.sh) for end-to-end updates

### Changed
- Total card count: **2,777 cards** across 16 sets
- Auto-discovery now detects 16 sets (previously 12)
- Improved parallel scraping performance

### Fixed
- CSV parsing now properly handles quoted strings with commas and newlines
- Text sanitization removes extra whitespace and newlines
- Zod validation ensures data integrity during scraping

## [1.0.0] - 2025-10-04

### Added
- Initial release of Pokemon TCG Pocket MCP server
- Support for A1-A4 sets (Genetic Apex, Space-Time Smackdown, Celestial Guardians, Wisdom of Sea and Sky)
- 7 MCP tools: search_cards, get_card, find_synergies, find_counters, get_type_stats, query_cards, analyze_deck
- 3 MCP resources: full cards database, unique cards, type statistics
- 3 MCP prompts: build-deck, counter-deck, optimize-deck
- DuckDB integration for fast SQL queries
- Pokemon TCG Pocket game rules integration (20-card decks, 3-point win condition, energy zone mechanics)

### Database
- **1,068 unique cards** (2,077 total with art variants)
- 12 sets: A1, A1a, A2, A2a, A2b, A3, A3a, A3b, A4, A4a, A4b, P-A

[Unreleased]: https://github.com/briansunter/pokeclaude/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/briansunter/pokeclaude/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/briansunter/pokeclaude/releases/tag/v1.0.0

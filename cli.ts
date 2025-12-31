#!/usr/bin/env bun

import { serveMcp, runCli } from './index';

// ============================================================================
// HELP
// ============================================================================

function showHelp(): void {
	console.log(`
PokeClaude - Pokemon TCG Pocket deck builder and card database

USAGE:
    pokeclaude <command> [options]

COMMANDS:
    search        Search for Pokemon cards with filters
    get           Get specific card by name
    synergies     Find synergies for a card
    counters      Find counters for a Pokemon type
    stats         Show type statistics
    query         Run custom SQL query
    trainers      List all trainer and item cards
    analyze       Analyze deck composition
    mcp           Start MCP server (for Claude Code integration)
    help          Show this help message

EXAMPLES:
    # Search for Fire type Pokemon
    pokeclaude search --type Fire --limit 10

    # Get details for a specific card
    pokeclaude get --name "Pikachu ex"

    # Find synergies for a card
    pokeclaude synergies --card-name "Charizard ex"

    # Find counters to Fire type
    pokeclaude counters --target-type Fire

    # Analyze a deck
    pokeclaude analyze --card-names "Pikachu ex" "Raichu" "Professor's Research"

    # Start MCP server for Claude Code
    pokeclaude mcp

For more information, see: https://github.com/briansunter/pokeclaude
`);
}

// ============================================================================
// MAIN
// ============================================================================

async function main(): Promise<void> {
	const args = process.argv.slice(2);

	if (args.length === 0 || args[0] === 'help' || args[0] === '--help' || args[0] === '-h') {
		showHelp();
		process.exit(0);
	}

	// MCP server command
	if (args[0] === 'mcp') {
		await serveMcp();
		return;
	}

	// Run CLI commands
	const exitCode = await runCli(args);
	process.exit(exitCode ?? 0);
}

main().catch((error) => {
	console.error('Error:', error instanceof Error ? error.message : String(error));
	process.exit(1);
});

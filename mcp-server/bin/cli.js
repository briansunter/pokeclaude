#!/usr/bin/env node

// CLI wrapper for pokemon-pocket-mcp-server
// Explicitly runs CLI mode for bunx/npx compatibility

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the CLI module directly
const { runCli } = await import(resolve(__dirname, '../dist/cli.js'));

// Run CLI with current process arguments
const exitCode = await runCli(process.argv.slice(2));
process.exit(exitCode ?? 0);

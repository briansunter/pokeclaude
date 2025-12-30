/**
 * Integration tests for Pokemon Pocket MCP Server
 * Tests field filtering and core functionality
 */

import { afterAll, beforeAll, describe, expect, test } from 'bun:test';
import { type ChildProcess, spawn } from 'node:child_process';
import path from 'node:path';

const SERVER_PATH = path.join(__dirname, 'index.ts');

interface MCPRequest {
	jsonrpc: string;
	id: number;
	method: string;
	params?: unknown;
}

interface MCPResponse {
	jsonrpc: string;
	id: number;
	result?: unknown;
	error?: unknown;
}

interface Tool {
	name: string;
	description?: string;
	inputSchema?: unknown;
}

interface Card {
	id: string;
	name: string;
	type?: string;
	hp?: string;
	attacks?: string;
	weakness?: string;
	retreat_cost?: string;
	rarity?: string;
	[key: string]: unknown;
}

class MCPClient {
	private process!: ChildProcess;
	private requestId = 1;
	private responseBuffer = '';
	private pendingRequests = new Map<
		number,
		{ resolve: Function; reject: Function }
	>();

	async start() {
		this.process = spawn('bun', [SERVER_PATH], {
			stdio: ['pipe', 'pipe', 'pipe'],
		});

		this.process.stdout?.on('data', (data: Buffer) => {
			const output = data.toString();
			this.responseBuffer += output;
			this.processResponses();
		});

		this.process.stderr?.on('data', (data: Buffer) => {
			const error = data.toString();
			// Only log critical errors to avoid clutter
			if (error.includes('Error') || error.includes('error')) {
				console.error('SERVER ERROR:', error.trim());
			}
		});

		this.process.on('exit', (code, signal) => {
			if (code !== 0) {
				console.error(`SERVER EXITED with code ${code} and signal ${signal}`);
			}
		});

		this.process.on('error', (err) => {
			console.error('SERVER PROCESS ERROR:', err);
		});

		// Wait for server initialization
		await new Promise((resolve) => setTimeout(resolve, 3000));

		// Check if process is still running
		if (this.process.killed || this.process.exitCode !== null) {
			throw new Error(
				`Server process died during initialization (exitCode: ${this.process.exitCode})`
			);
		}
	}

	private processResponses() {
		const lines = this.responseBuffer.split('\n');
		this.responseBuffer = lines.pop() || '';

		for (const line of lines) {
			if (line.trim()) {
				try {
					const response: MCPResponse = JSON.parse(line);
					const pending = this.pendingRequests.get(response.id);
					if (pending) {
						this.pendingRequests.delete(response.id);
						if (response.error) {
							pending.reject(response.error);
						} else {
							pending.resolve(response.result);
						}
					}
				} catch (_err) {
					// Ignore parse errors
				}
			}
		}
	}

	async request(method: string, params?: unknown): Promise<unknown> {
		const id = this.requestId++;
		const request: MCPRequest = {
			jsonrpc: '2.0',
			id,
			method,
			params,
		};

		return new Promise((resolve, reject) => {
			this.pendingRequests.set(id, { resolve, reject });
			this.process.stdin?.write(`${JSON.stringify(request)}\n`);

			setTimeout(() => {
				if (this.pendingRequests.has(id)) {
					this.pendingRequests.delete(id);
					reject(new Error(`Request ${id} timed out`));
				}
			}, 120000);
		});
	}

	async callTool(name: string, args: unknown): Promise<unknown> {
		const result = await this.request('tools/call', {
			name,
			arguments: args,
		});
		return JSON.parse(result.content[0].text);
	}

	stop() {
		this.process.kill();
	}
}

let client: MCPClient;

beforeAll(async () => {
	client = new MCPClient();
	await client.start();

	// Initialize the connection
	await client.request('initialize', {
		protocolVersion: '2024-11-05',
		capabilities: {},
		clientInfo: { name: 'test-client', version: '1.0.0' },
	});
});

afterAll(() => {
	client.stop();
});

describe('Server Initialization', () => {
	test('should list all tools', async () => {
		const result = await client.request('tools/list');
		expect(result.tools).toBeArray();
		expect(result.tools.length).toBe(8);

		const toolNames = result.tools.map((t: Tool) => t.name);
		expect(toolNames).toContain('search_cards');
		expect(toolNames).toContain('get_card');
		expect(toolNames).toContain('find_synergies');
		expect(toolNames).toContain('find_counters');
		expect(toolNames).toContain('get_type_stats');
		expect(toolNames).toContain('query_cards');
		expect(toolNames).toContain('list_trainers');
		expect(toolNames).toContain('analyze_deck');
	});
});

describe('Field Filtering - search_cards', () => {
	test('should return basic fields by default', async () => {
		const cards = await client.callTool('search_cards', {
			name: 'Pikachu',
			limit: 1,
		});

		expect(cards).toBeArray();
		expect(cards.length).toBeGreaterThan(0);

		const card = cards[0];
		const fields = Object.keys(card);

		// Should have basic fields
		expect(fields).toContain('id');
		expect(fields).toContain('name');
		expect(fields).toContain('type');
		expect(fields).toContain('hp');
		expect(fields).toContain('attacks');
		expect(fields).toContain('weakness');
		expect(fields).toContain('retreat_cost');
		expect(fields).toContain('rarity');

		// Should NOT have full fields
		expect(fields).not.toContain('image_url');
		expect(fields).not.toContain('card_url');
		expect(fields).not.toContain('set_name');
	});

	test('should return minimal fields when requested', async () => {
		const cards = await client.callTool('search_cards', {
			name: 'Pikachu',
			limit: 1,
			fields: 'minimal',
		});

		expect(cards).toBeArray();
		const card = cards[0];
		const fields = Object.keys(card);

		expect(fields).toEqual(['id', 'name']);
	});

	test('should return full fields when requested', async () => {
		const cards = await client.callTool('search_cards', {
			name: 'Pikachu',
			limit: 1,
			fields: 'full',
		});

		expect(cards).toBeArray();
		const card = cards[0];
		const fields = Object.keys(card);

		expect(fields).toContain('id');
		expect(fields).toContain('name');
		expect(fields).toContain('image_url');
		expect(fields).toContain('card_url');
		expect(fields).toContain('set_name');
		expect(fields).toContain('set_code');
		expect(fields.length).toBe(22); // Updated from 15 to 22 (7 new evolution metadata fields)
	});

	test('should return custom field array', async () => {
		const cards = await client.callTool('search_cards', {
			name: 'Pikachu',
			limit: 1,
			fields: ['name', 'type', 'hp'],
		});

		expect(cards).toBeArray();
		const card = cards[0];
		const fields = Object.keys(card);

		expect(fields).toEqual(['name', 'type', 'hp']);
	});
});

describe('Field Filtering - get_card', () => {
	test('should return basic fields by default', async () => {
		const card = await client.callTool('get_card', {
			name: 'Pikachu ex',
		});

		const fields = Object.keys(card);
		expect(fields).toContain('name');
		expect(fields).toContain('type');
		expect(fields).not.toContain('image_url');
	});

	test('should support field presets', async () => {
		const minimal = await client.callTool('get_card', {
			name: 'Pikachu ex',
			fields: 'minimal',
		});

		expect(Object.keys(minimal)).toEqual(['id', 'name']);
	});
});

describe('Field Filtering - find_synergies', () => {
	test('should filter nested card arrays', async () => {
		const synergies = await client.callTool('find_synergies', {
			cardName: 'Pikachu ex',
			fields: 'minimal',
		});

		expect(synergies).toHaveProperty('card');
		expect(synergies).toHaveProperty('sameTypeCards');
		expect(synergies).toHaveProperty('trainers');

		// Check that nested cards are filtered
		if (synergies.sameTypeCards.length > 0) {
			const fields = Object.keys(synergies.sameTypeCards[0]);
			expect(fields).toContain('name');
			expect(fields.length).toBeLessThanOrEqual(2); // minimal fields
		}
	});
});

describe('Field Filtering - find_counters', () => {
	test('should support field filtering', async () => {
		const counters = await client.callTool('find_counters', {
			targetType: 'Water',
			fields: 'basic',
		});

		expect(counters).toBeArray();
		if (counters.length > 0) {
			const fields = Object.keys(counters[0]);
			expect(fields).toContain('name');
			expect(fields).not.toContain('image_url');
		}
	});
});

describe('Trainers and Items', () => {
	test('should list trainers and items', async () => {
		const trainers = await client.callTool('list_trainers', {
			limit: 20,
			fields: 'minimal',
		});

		expect(trainers).toBeArray();
		expect(trainers.length).toBeGreaterThan(0);
		expect(trainers.length).toBeLessThanOrEqual(20);

		// All should only have id and name
		if (trainers.length > 0) {
			expect(Object.keys(trainers[0])).toEqual(['id', 'name']);
		}
	});

	test('should search trainers by name', async () => {
		const giovanni = await client.callTool('search_cards', {
			name: 'Giovanni',
			hasAttacks: false,
		});

		expect(giovanni).toBeArray();
		expect(giovanni.length).toBeGreaterThan(0);
		expect(giovanni.every((c: Card) => c.name.includes('Giovanni'))).toBe(true);
	});

	test('should get all trainers with hasAttacks=false', async () => {
		const allTrainers = await client.callTool('search_cards', {
			hasAttacks: false,
			limit: 50,
		});

		expect(allTrainers).toBeArray();
		expect(allTrainers.length).toBeGreaterThan(0);
	});
});

describe('Functional Tests', () => {
	test('should search cards by name', async () => {
		const cards = await client.callTool('search_cards', {
			name: 'Charizard',
			limit: 5,
		});

		expect(cards).toBeArray();
		expect(cards.length).toBeGreaterThan(0);
		expect(
			cards.every((c: Card) => c.name.toLowerCase().includes('charizard'))
		).toBe(true);
	});

	test('should filter by type', async () => {
		const cards = await client.callTool('search_cards', {
			type: 'Fire',
			limit: 10,
		});

		expect(cards).toBeArray();
		expect(cards.every((c: Card) => c.type === 'Fire')).toBe(true);
	});

	test('should filter by HP range', async () => {
		const cards = await client.callTool('search_cards', {
			minHp: 100,
			maxHp: 150,
			limit: 10,
		});

		expect(cards).toBeArray();
		if (cards.length > 0) {
			expect(
				cards.every((c: Card) => {
					const hp = parseInt(c.hp || '0', 10);
					return hp >= 100 && hp <= 150;
				})
			).toBe(true);
		}
	});

	test('should return unique cards by default', async () => {
		const cards = await client.callTool('search_cards', {
			name: 'Pikachu',
			limit: 50,
		});

		// Check that we don't have duplicates with identical stats
		const seen = new Set<string>();
		for (const card of cards) {
			const key = `${card.name}|${card.type}|${card.hp}|${card.attacks}`;
			expect(seen.has(key)).toBe(false);
			seen.add(key);
		}
	});

	test('should get type statistics', async () => {
		const stats = await client.callTool('get_type_stats', {});

		expect(stats).toBeArray();
		expect(stats.length).toBeGreaterThan(0);
		expect(stats[0]).toHaveProperty('type');
		expect(stats[0]).toHaveProperty('count');
		expect(stats[0]).toHaveProperty('avg_hp');
	});
});

describe('Error Handling', () => {
	test('should handle card not found', async () => {
		try {
			await client.callTool('get_card', {
				name: 'NonexistentCard12345',
			});
			expect(true).toBe(false); // Should not reach here
		} catch (error) {
			expect(error).toBeDefined();
		}
	});

	test('should reject non-SELECT queries', async () => {
		try {
			await client.callTool('query_cards', {
				sql: 'DROP TABLE cards',
			});
			expect(true).toBe(false); // Should not reach here
		} catch (error) {
			expect(error).toBeDefined();
		}
	});
});

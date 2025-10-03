#!/usr/bin/env bun
/**
 * Manual test script for the Pokemon Pocket MCP server
 * Tests field filtering and basic functionality
 */

import { spawn } from 'child_process';
import path from 'path';

const SERVER_PATH = path.join(__dirname, 'src', 'index.ts');

interface MCPRequest {
  jsonrpc: string;
  id: number;
  method: string;
  params?: any;
}

interface MCPResponse {
  jsonrpc: string;
  id: number;
  result?: any;
  error?: any;
}

class MCPTestClient {
  private process: any;
  private requestId = 1;
  private responseBuffer = '';
  private pendingRequests = new Map<number, { resolve: Function; reject: Function }>();

  async start() {
    console.log('🚀 Starting MCP server...');
    this.process = spawn('bun', [SERVER_PATH], {
      stdio: ['pipe', 'pipe', 'pipe']
    });

    this.process.stdout.on('data', (data: Buffer) => {
      this.responseBuffer += data.toString();
      this.processResponses();
    });

    this.process.stderr.on('data', (data: Buffer) => {
      const msg = data.toString();
      if (!msg.includes('DuckDB') && !msg.includes('running on stdio')) {
        console.error('Server stderr:', msg);
      }
    });

    // Wait for server to initialize
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('✅ Server started\n');
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
        } catch (err) {
          // Ignore parse errors for non-JSON lines
        }
      }
    }
  }

  async sendRequest(method: string, params?: any): Promise<any> {
    const id = this.requestId++;
    const request: MCPRequest = {
      jsonrpc: '2.0',
      id,
      method,
      params
    };

    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject });
      this.process.stdin.write(JSON.stringify(request) + '\n');

      // Timeout after 5 seconds
      setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject(new Error(`Request ${id} timed out`));
        }
      }, 5000);
    });
  }

  async stop() {
    console.log('\n🛑 Stopping server...');
    this.process.kill();
  }
}

async function runTests() {
  const client = new MCPTestClient();

  try {
    await client.start();

    // Test 1: Initialize
    console.log('📋 Test 1: Initialize');
    const initResult = await client.sendRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'test-client',
        version: '1.0.0'
      }
    });
    console.log('✅ Server initialized:', initResult.serverInfo.name);

    // Test 2: List tools
    console.log('\n📋 Test 2: List tools');
    const tools = await client.sendRequest('tools/list');
    console.log(`✅ Found ${tools.tools.length} tools:`, tools.tools.map((t: any) => t.name).join(', '));

    // Test 3: Search cards with basic fields (default)
    console.log('\n📋 Test 3: Search cards - basic fields (default)');
    const basicSearch = await client.sendRequest('tools/call', {
      name: 'search_cards',
      arguments: {
        name: 'Pikachu',
        limit: 2
      }
    });
    const basicCards = JSON.parse(basicSearch.content[0].text);
    console.log(`✅ Found ${basicCards.length} cards with basic fields`);
    console.log('   Fields returned:', Object.keys(basicCards[0]).join(', '));
    console.log('   Should NOT have: image_url, card_url, set_name');
    const hasImages = 'image_url' in basicCards[0];
    console.log(hasImages ? '❌ FAIL: Has image_url' : '✅ PASS: No image_url');

    // Test 4: Search cards with minimal fields
    console.log('\n📋 Test 4: Search cards - minimal fields');
    const minimalSearch = await client.sendRequest('tools/call', {
      name: 'search_cards',
      arguments: {
        name: 'Pikachu',
        limit: 2,
        fields: 'minimal'
      }
    });
    const minimalCards = JSON.parse(minimalSearch.content[0].text);
    console.log('✅ Minimal fields:', Object.keys(minimalCards[0]).join(', '));
    const onlyIdName = Object.keys(minimalCards[0]).length === 2 && 'id' in minimalCards[0] && 'name' in minimalCards[0];
    console.log(onlyIdName ? '✅ PASS: Only id and name' : '❌ FAIL: Has extra fields');

    // Test 5: Search cards with full fields
    console.log('\n📋 Test 5: Search cards - full fields');
    const fullSearch = await client.sendRequest('tools/call', {
      name: 'search_cards',
      arguments: {
        name: 'Pikachu',
        limit: 1,
        fields: 'full'
      }
    });
    const fullCards = JSON.parse(fullSearch.content[0].text);
    console.log(`✅ Full fields (${Object.keys(fullCards[0]).length}):`, Object.keys(fullCards[0]).join(', '));
    const hasFull = 'image_url' in fullCards[0] && 'card_url' in fullCards[0] && 'set_name' in fullCards[0];
    console.log(hasFull ? '✅ PASS: Has all fields' : '❌ FAIL: Missing fields');

    // Test 6: Custom field array
    console.log('\n📋 Test 6: Search cards - custom field array');
    const customSearch = await client.sendRequest('tools/call', {
      name: 'search_cards',
      arguments: {
        name: 'Pikachu',
        limit: 1,
        fields: ['name', 'type', 'hp']
      }
    });
    const customCards = JSON.parse(customSearch.content[0].text);
    console.log('✅ Custom fields:', Object.keys(customCards[0]).join(', '));
    const customCorrect = Object.keys(customCards[0]).length === 3;
    console.log(customCorrect ? '✅ PASS: Exactly 3 fields' : '❌ FAIL: Wrong number of fields');

    // Test 7: Get card with fields
    console.log('\n📋 Test 7: Get card - basic fields');
    const getCard = await client.sendRequest('tools/call', {
      name: 'get_card',
      arguments: {
        name: 'Pikachu ex',
        fields: 'basic'
      }
    });
    const card = JSON.parse(getCard.content[0].text);
    console.log('✅ Card fields:', Object.keys(card).join(', '));

    // Test 8: Find synergies with fields
    console.log('\n📋 Test 8: Find synergies - minimal fields');
    const synergies = await client.sendRequest('tools/call', {
      name: 'find_synergies',
      arguments: {
        cardName: 'Pikachu ex',
        fields: 'minimal'
      }
    });
    const synData = JSON.parse(synergies.content[0].text);
    console.log('✅ Synergies found');
    if (synData.sameTypeCards && synData.sameTypeCards[0]) {
      console.log('   Same type cards fields:', Object.keys(synData.sameTypeCards[0]).join(', '));
    }

    console.log('\n✅ All tests completed!');

  } catch (error) {
    console.error('\n❌ Test failed:', error);
  } finally {
    await client.stop();
  }
}

runTests().catch(console.error);

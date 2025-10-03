import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";

interface PokemonCard {
  id: string;
  set_code: string;
  set_name: string;
  card_number: string;
  name: string;
  type: string;
  hp: string;
  rarity: string;
  abilities: string;
  attacks: string;
  weakness: string;
  resistance: string;
  retreat_cost: string;
  image_url: string;
  card_url: string;
}

let cards: PokemonCard[] = [];

// Load cards from CSV
function loadCards() {
  try {
    const csvContent = readFileSync("pokemon_pocket_cards.csv", "utf-8");
    cards = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    });
    console.error(`Loaded ${cards.length} Pokemon cards`);
  } catch (error) {
    console.error("Error loading cards:", error);
    cards = [];
  }
}

const server = new Server(
  {
    name: "pokeclaude",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_cards",
        description: "Search Pokemon cards by name (case-insensitive partial match)",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Card name to search for",
            },
            limit: {
              type: "number",
              description: "Maximum number of results (default: 20)",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get_card_by_id",
        description: "Get a specific card by its UUID",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Card UUID",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "get_cards_by_type",
        description: "Get all cards of a specific type (Grass, Fire, Water, Lightning, Psychic, Fighting, Darkness, Metal, Dragon, Colorless)",
        inputSchema: {
          type: "object",
          properties: {
            type: {
              type: "string",
              description: "Pokemon type",
            },
            limit: {
              type: "number",
              description: "Maximum number of results (default: 50)",
            },
          },
          required: ["type"],
        },
      },
      {
        name: "get_cards_by_set",
        description: "Get all cards from a specific set",
        inputSchema: {
          type: "object",
          properties: {
            set_code: {
              type: "string",
              description: "Set code (e.g., A1, A2, A4b)",
            },
          },
          required: ["set_code"],
        },
      },
      {
        name: "list_sets",
        description: "List all available Pokemon card sets",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "filter_cards",
        description: "Advanced filtering: search by multiple criteria",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Card name (partial match)",
            },
            type: {
              type: "string",
              description: "Pokemon type",
            },
            set_code: {
              type: "string",
              description: "Set code",
            },
            min_hp: {
              type: "number",
              description: "Minimum HP",
            },
            max_hp: {
              type: "number",
              description: "Maximum HP",
            },
            rarity: {
              type: "string",
              description: "Card rarity",
            },
            limit: {
              type: "number",
              description: "Maximum results (default: 50)",
            },
          },
        },
      },
      {
        name: "get_stats",
        description: "Get database statistics (total cards, sets, types, etc.)",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "search_cards": {
      const query = String(args?.query || "").toLowerCase();
      const limit = Number(args?.limit || 20);
      const results = cards
        .filter((card) => card.name.toLowerCase().includes(query))
        .slice(0, limit);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }

    case "get_card_by_id": {
      const id = String(args?.id || "");
      const card = cards.find((c) => c.id === id);

      if (!card) {
        return {
          content: [
            {
              type: "text",
              text: `Card not found with ID: ${id}`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(card, null, 2),
          },
        ],
      };
    }

    case "get_cards_by_type": {
      const type = String(args?.type || "");
      const limit = Number(args?.limit || 50);
      const results = cards
        .filter(
          (card) => card.type.toLowerCase() === type.toLowerCase()
        )
        .slice(0, limit);

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }

    case "get_cards_by_set": {
      const setCode = String(args?.set_code || "");
      const results = cards.filter(
        (card) => card.set_code.toLowerCase() === setCode.toLowerCase()
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results, null, 2),
          },
        ],
      };
    }

    case "list_sets": {
      const sets = Array.from(
        new Map(
          cards.map((card) => [
            card.set_code,
            { code: card.set_code, name: card.set_name },
          ])
        ).values()
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(sets, null, 2),
          },
        ],
      };
    }

    case "filter_cards": {
      const limit = Number(args?.limit || 50);
      let results = [...cards];

      if (args?.name) {
        const query = String(args.name).toLowerCase();
        results = results.filter((card) =>
          card.name.toLowerCase().includes(query)
        );
      }

      if (args?.type) {
        const type = String(args.type).toLowerCase();
        results = results.filter(
          (card) => card.type.toLowerCase() === type
        );
      }

      if (args?.set_code) {
        const setCode = String(args.set_code).toLowerCase();
        results = results.filter(
          (card) => card.set_code.toLowerCase() === setCode
        );
      }

      if (args?.min_hp !== undefined) {
        const minHp = Number(args.min_hp);
        results = results.filter((card) => Number(card.hp) >= minHp);
      }

      if (args?.max_hp !== undefined) {
        const maxHp = Number(args.max_hp);
        results = results.filter((card) => Number(card.hp) <= maxHp);
      }

      if (args?.rarity) {
        const rarity = String(args.rarity).toLowerCase();
        results = results.filter(
          (card) => card.rarity.toLowerCase() === rarity
        );
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(results.slice(0, limit), null, 2),
          },
        ],
      };
    }

    case "get_stats": {
      const sets = new Set(cards.map((c) => c.set_code));
      const types = new Set(cards.map((c) => c.type));
      const rarities = new Set(cards.map((c) => c.rarity));

      const stats = {
        total_cards: cards.length,
        total_sets: sets.size,
        sets: Array.from(sets).sort(),
        types: Array.from(types).sort(),
        rarities: Array.from(rarities).sort(),
        avg_hp:
          cards.reduce((sum, c) => sum + (Number(c.hp) || 0), 0) /
          cards.length,
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(stats, null, 2),
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

async function main() {
  loadCards();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Pokemon Pocket MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});

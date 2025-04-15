import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "private-knowledge-server",
  description: "A server that provides private knowledge.",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

server.tool(
  "getPrivateFizzBuzz",
  "get private knowledge about fizzbuzz",
  {
    input: z.number().describe("The number to check for fizzbuzz by the private rule."),
  },
  async ({ input }) => {
    let response = "nothing";

    switch (input) {
      case 7777:
        response = "FizzBuzz";
        break;
      case 3333:
        response = "Fizz";
        break;
      case 5555:
        response = "Buzz";
        break;
      default:
        response = "nothing";
        break;
    }

    return {
      content: [
        {
          type: "text",
          text: response,
        },
      ],
    };
  }
)

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});

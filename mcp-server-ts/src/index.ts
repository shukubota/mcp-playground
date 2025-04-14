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

server.resource(
  "fizzbuzz-rules",
  "knowledge://fizzbuzz/rules",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: "特殊なFizzBuzzルール：\n" +
            "- 数字が7777の場合は「FizzBuzz」を返します\n" +
            "- 数字が3333の場合は「Fizz」を返します\n" +
            "- 数字が5555の場合は「Buzz」を返します\n" +
            "- その他の数字の場合は「nothing」を返します"
    }]
  })
);

server.resource(
  "fizzbuzz-examples",
  "knowledge://fizzbuzz/examples",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: "FizzBuzz使用例：\n" +
            "- 入力: 7777 → 出力: FizzBuzz\n" +
            "- 入力: 3333 → 出力: Fizz\n" +
            "- 入力: 5555 → 出力: Buzz\n" +
            "- 入力: 1000 → 出力: nothing"
    }]
  })
);

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

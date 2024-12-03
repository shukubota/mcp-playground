import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { ListResourcesResultSchema, ReadResourceResultSchema } from "@modelcontextprotocol/sdk/types.js";

const transport = new StdioClientTransport({
  // command: "weathre://aaa/current",
  command: "./index.js",
});

const client = new Client({
  name: "example-client",
  version: "1.0.0",
}, {
  capabilities: {}
});

await client.connect(transport);

// List available resources
const resources = await client.request(
  { method: "resources/list" },
  ListResourcesResultSchema
);

// Read a specific resource
// const resourceContent = await client.request(
//   {
//     method: "resources/read",
//     params: {
//       uri: "file:///example.txt"
//     }
//   },
//   ReadResourceResultSchema
// );

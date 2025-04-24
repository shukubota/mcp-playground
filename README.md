# mcp-playground

## python mcp server

```shell
brew install uv
```


### inspection
```shell
npx @modelcontextprotocol/inspector \
  uv \
  --directory /Users/shukubota/projects/mcp-playground/mcp-server-python \
  run \
  card-server
```


## json backup
```json
{
  "mcpServers": {
    "sqlite": {
      "command": "uvx",
      "args": [
        "mcp-server-sqlite",
        "--db-path",
        "/Users/shukubota/projects/mcp-playground/test.db"
      ]
    },
    "filesystem": {
      "command": "/Users/shukubota/.anyenv/envs/nodenv/shims/npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/shukubota/Desktop/mcp"
      ]
    },
    "brave-search": {
      "command": "/Users/shukubota/.anyenv/envs/nodenv/shims/npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-brave-search"
      ],
      "env": {
        "BRAVE_API_KEY": "BSAvAM0Ah0yNK6ZTaPvnWcrjAZTWIYI"
      }
    },
    "card_server": {
      "command": "uv",
      "args": [
        "--directory",
        "/Users/shukubota/projects/mcp-playground/mcp-server-python",
        "run",
        "card-server"
      ]
    }
  }
}
```
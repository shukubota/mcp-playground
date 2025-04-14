## MCPサーバ(typescript)
### inspector
基本的に
https://modelcontextprotocol.io/docs/tools/inspector
の通りに設定する。

```shell
npx @modelcontextprotocol/inspector node /path/to/mcp-playground/mcp-server-ts/build/index.js
```

でinspectorでmcpサーバの挙動を確認できる。

### 設定
```json
{
    "mcpServers": {
      "private-knowledge": {
        "command": "/Users/shu.kubota/.anyenv/envs/nodenv/shims/node",
        "args": [
          "/path/to/mcp-playground/mcp-server-ts/build/index.js"
        ]
      }
    }
  }
```
### build
```shell
npm install
npm run build
```

でbuild配下にbuildされる。

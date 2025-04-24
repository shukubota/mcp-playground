## MCPサーバ(typescript)
### example
https://github.com/modelcontextprotocol/servers/blob/c19925b8f0f2815ad72b08d2368f0007c86eb8e6/src/brave-search/index.ts#L315
brave-searchの例.

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

#### プロンプト例
braveでfizbuzzの一般的な仕様を調べて、
7777を入力として与えた時にどうなるかを日本語一文で結果を示して。

private-knowledgeのfizbuzzの仕様に対し、7777を入力として与えた時にどうなるかを日本語一文で結果を示して。

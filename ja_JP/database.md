---
title: データベースの構成
---

# データベースの構成

データベース構成には、「db\_name」と「db\_config」の 2 つの環境変数があります。

「db\_name」はデータベースの種類の名前を意味し、「db\_config」はデータベースの構成を意味します。

CranSurveyは「unstorage」を使用してデータベースに接続し、ほとんどすべてのデータベース構成オプションを使用できます。

## 記憶

> [メモリドライバ](https://unstorage.unjs.io/drivers/memory) は既定のデータベースであり、構成は必要ありません。

ただし、 [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)であるため、メモリがクリアされるとデータが失われる可能性があります。

メモリ ドライバーは、運用モードでは使用できません。

```env
db_name=メモリ
db_config={}
```

## ノード.js ファイルシステム

> [ノード.jsファイルシステム](https://unstorage.unjs.io/drivers/fs)。
>
> ネストされたキーのディレクトリ構造を使用して、データを実際のファイルシステムにマップします。 を使用した視聴をサポート [chokidar](https://github.com/paulmillr/chokidar)。
> このドライバは、'fs.stat' を使用して、'mtime' (最終更新時刻)、'atime' (最終アクセス時刻)、サイズ (ファイルサイズ) を含む各キーのメタを実装します。

オプション：

- 'base': このディレクトリに対する操作を分離するベースディレクトリ
- 'ignore': ウォッチのパターンを無視します

```env
db_name=fs
db_config={"base": "./.tmp"}
```

## Redis(レディス)

> [Redis](https://unstorage.unjs.io/drivers/redis)。
>
> データを [Redis](https://redis.com/)ストレージを使用して、 [ioredis](https://github.com/luin/ioredis)。

オプション：

- 'base': すべてのキーに使用するオプションのプレフィックス。 名前空間に使用できます。 redisクラスタモードのhastagプレフィックスとして使用する必要があります。
- 'url': redis への接続に使用する URL。 ホスト・オプションよりも優先されます。 形式は 'redis\://\<REDIS\_USER>:\<REDIS\_PASSWORD>@\<REDIS\_HOST>:\<REDIS\_PORT>'.
- 'cluster': クラスター モードに使用する Redis ノードのリスト。 url と host オプションよりも優先されます。
- 'clusterOptions': クラスター モードに使用するオプション。
- 'ttl': すべての項目の既定の TTL (秒単位)。

```env
db_name=redis
db_config={"base": "csur", "url": "redis://<REDIS_USER>:<REDIS_PASSWORD>@<REDIS_HOST>:<REDIS_PORT>"}
```

## HTTPの

> [HTTP](https://unstorage.unjs.io/drivers/http)。
>
> リモートの HTTP/HTTPS エンドポイントをデータ ストレージとして使用します。 組み込みの [http server](https://unstorage.unjs.io/http-server) メソッドをサポートします。
> このドライバは、'HEAD' リクエストを行うことで、HTTP ヘッダから 'mtime' (最終更新時刻) や 'status' を含む各キーのメタを実装します。

オプション：

- 'base': URL のベース URL (必須)
- 'headers': すべてのリクエストで送信するカスタムヘッダー

```env
db_name=http
db_config={"ベース": "http://example.com"}
```

## Cloudflare KV (バインディング)

> 【Cloudflare KV(バインディング)】(https\://unstorage.unjs.io/drivers/cloudflare-kv-binding)。
>
> [Cloudflare KV](https://developers.cloudflare.com/workers/runtime-apis/kv)にデータを保存し、ワーカーバインディングからアクセスします。

\*\*注:このドライバーはCloudflare Workers環境でのみ動作します。 [cloudflare-kv-http](https://unstorage.unjs.io/drivers/cloudflare-kv-http)その他の環境の場合。

KV を作成して割り当てる必要があります。 詳細については、[KV Bindings](https://developers.cloudflare.com/workers/runtime-apis/kv#kv-bindings) を参照してください。

オプション：

- 'binding': KV バインディングまたは名前空間の名前。 デフォルトは STORAGE です。
- 'base': 保存されているすべてのキーに接頭辞を追加します

```env
db_name=cloudflare-kv-binding
db_config={"binding": "ストレージ"}
```

## Cloudflare KV(HTTP)

> 【Cloudflare KV(HTTP)の場合】(https\://unstorage.unjs.io/drivers/cloudflare-kv-http)。
>
> [Cloudflare API v4](https://api.cloudflare.com/)を使用して[Cloudflare KV](https://developers.cloudflare.com/workers/learning/how-kv-works/)にデータを保存します。

KV 名前空間を作成する必要があります。 詳細については、[KV Bindings](https://developers.cloudflare.com/workers/runtime-apis/kv#kv-bindings) を参照してください。
注:このドライバーはネイティブフェッチを使用し、普遍的に動作します。 cloudflareワーカー環境で直接使用する場合は、cloudflare-kv-bindingドライバーを使用して最高のパフォーマンスを得てください。

オプション：

- 'accountId':CloudflareアカウントID。
- 'namespaceId': ターゲットとする KV 名前空間の ID。 注: ワーカー環境で使用される名前やバインディングではなく、名前空間の ID を必ず使用してください。
- 'apiToken': [ユーザープロファイルの「APIトークン」ページ](https://dash.cloudflare.com/profile/api-tokens)から生成されたAPIトークン。
- 'email': アカウントに関連付けられているメールアドレス。 apiKey と共に使用して、apiToken の代わりに認証できます。
- 'apiKey':Cloudflareコンソールの「マイアカウント」ページで生成されたAPIキー。 apiTokenの代わりに認証するために電子メールと一緒に使用できます。
- 'userServiceKey':限定されたエンドポイントセットに適した特別なCloudflare APIキー。 常に「v1.0-」で始まり、長さが異なる場合があります。 apiTokenまたはapiKeyと電子メールの代わりに認証するために使用できます。
- 'apiURL': カスタム API URL。 既定値は https\://api.cloudflare.com です。
- 'base': 保存されているすべてのキーに接頭辞を追加します

```env
db_name=cloudflare-kv-http
db_config={"accountId": "my-account-id", "namespaceId": "my-kv-namespace-id", "apiToken": "supersecret-api-token"}
```

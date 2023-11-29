---
title: 配置資料庫
---

# 配置資料庫

有兩個環境變數對資料庫配置很重要，分別是“db\_name”和“db\_config”。

“db\_name”表示資料庫類型的名稱，“db\_config”表示資料庫的配置。

CranSurvey使用“unstorage”連接到您的資料庫，幾乎可以使用所有資料庫配置選項。

## 記憶

> \[記憶體驅動程式]（https\://unstorage.unjs.io/drivers/memory） 是預設資料庫，不需要任何配置。

但是，它使用 \[Map]（https\://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Map），因此在清除記憶體時數據可能會丟失。

記憶體驅動程式不能在生產模式下使用。

```env
db_name=記憶體
db_config={}
```

## Node.js 檔案系統

> \[Node.js 檔案系統]（https\://unstorage.unjs.io/drivers/fs）。
>
> 使用嵌套鍵的目錄結構將數據映射到實際文件系統。 支援使用 \[chokidar]（https\://github.com/paulmillr/chokidar）。
> 此驅動程式使用 『fs.stat』 為每個鍵實現元，包括 『mtime』（上次修改時間）、『atime』（上次存取時間）和 size（檔大小）。

選項：

- “base”：用於隔離此目錄上的操作的基目錄
- “ignore”：忽略監視的模式

```env
db_name=fs
db_config={“base”： “./.tmp”}
```

## 雷迪斯

> \[Redis]（https\://unstorage.unjs.io/drivers/redis）。
>
> 將數據存儲在 \[Redis]（https\://redis.com/） 存儲使用 \[ioredis]（https\://github.com/luin/ioredis）。

選項：

- “base”：用於所有鍵的可選前綴。 可用於命名空間。 必須用作 redis 集群模式的 hastag 前置綴。
- 'url'：用於連接到 redis 的 URL。 優先於主機選項。 格式為「redis\://\<REDIS\_USER>:\<REDIS\_PASSWORD>@\<REDIS\_HOST>:\<REDIS\_PORT>'.
- “cluster”：用於集群模式的 redis 節點清單。 優先於url和host選項。
- “clusterOptions”：用於群集模式的選項。
- “ttl”：所有項目的預設TTL（秒為單位）。

```env
db_name=redis
db_config={“base”： “csur”， “url”： “redis://<REDIS_USER>:<REDIS_PASSWORD>@<REDIS_HOST>:<REDIS_PORT>"}
```

## HTTP協定

> \[HTTP]（https\://unstorage.unjs.io/drivers/http）。
>
> 使用遠端 HTTP/HTTPS 端點作為資料存儲。 支援內置 \[http server]（https\://unstorage.unjs.io/http-server） 方法。
> 此驅動程式通過發出“HEAD”請求，為每個鍵實現元，包括 HTTP 標頭中的“mtime”（上次修改時間）和“status”。

選項：

- “base”：url 的基本 URL（必填）
- “headers”：針對所有請求發送的自定義標頭

```env
db_name=http
db_config={“base”： “http://example.com”}
```

## Cloudflare KV（綁定）

> \[Cloudflare KV（綁定）]（https\://unstorage.unjs.io/drivers/cloudflare-kv-binding）。
>
> 將數據存儲在 \[Cloudflare KV]（https\://developers.cloudflare.com/workers/runtime-apis/kv） 中，並從 worker 綁定訪問。

\*\*注意：此驅動程式僅適用於 Cloudflare Workers 環境，請使用 \[cloudflare-kv-http]（https\://unstorage.unjs.io/drivers/cloudflare-kv-http） 用於其他環境。

您需要建立並分配 KV。 有關詳細資訊，請參見 \[KV 綁定]（https\://developers.cloudflare.com/workers/runtime-apis/kv#kv-bindings）。

選項：

- “binding”：KV 綁定或命名空間的名稱。 預設值為 STORAGE。
- “base”： 為所有存儲的鍵添加前綴

```env
db_name=cloudflare-kv-binding
db_config={“binding”： “存儲”}
```

## Cloudflare KV （HTTP）

> \[Cloudflare KV （HTTP）]（https\://unstorage.unjs.io/drivers/cloudflare-kv-http）。
>
> 使用 \[Cloudflare API v4]（https\://api.cloudflare.com/） 將數據存儲在 \[Cloudflare KV]（https\://developers.cloudflare.com/workers/learning/how-kv-works/） 中。

您需要建立 KV 命名空間。 有關詳細資訊，請參見 \[KV 綁定]（https\://developers.cloudflare.com/workers/runtime-apis/kv#kv-bindings）。
注意：此驅動程式使用本機提取並普遍工作！ 要直接在 cloudflare worker 環境中使用，請使用 cloudflare-kv-binding 驅動程式以獲得最佳性能！

選項：

- “accountId”：Cloudflare 帳戶 ID。
- “namespaceId”：要面向的 KV 命名空間的ID。 注意：請務必使用命名空間的ID，而不是工作線程環境中使用的名稱或綁定。
- 'apiToken'：從\[使用者配置檔'API Tokens'頁面]（https\://dash.cloudflare.com/profile/api-tokens）生成的API Token。
- “email”：與您的帳戶關聯的電子郵件位址。 可以與 apiKey 一起使用，以代替 apiToken 進行身份驗證。
- “apiKey”：在Cloudflare控制台的“我的帳戶”頁面上生成的 API 密鑰。 可以與電子郵件一起使用，以代替 apiToken 進行身份驗證。
- 'userServiceKey'：一個特殊的 Cloudflare API 密鑰，適用於一組受限的端點。 始終以「v1.0-」開頭，長度可能不同。 可用於 - 代替 apiToken 或 apiKey 和電子郵件進行身份驗證。
- “apiURL”：自定義 API URL。 預設值為 https\://api.cloudflare.com。
- “base”： 為所有存儲的鍵添加前綴

```env
db_name=cloudflare-kv-http
db_config={“accountId”： “我的帳戶ID”， “namespaceId”： “我的kv命名空間ID”， “apiToken”： “supersecret-api-token”}
```

---
title: 配置数据库
---

# 配置数据库

有两个环境变量对数据库配置很重要，分别是“db\_name”和“db\_config”。

“db\_name”表示数据库类型的名称，“db\_config”表示数据库的配置。

CranSurvey使用“unstorage”连接到您的数据库，几乎可以使用所有数据库配置选项。

## 记忆

> \[内存驱动程序]（https\://unstorage.unjs.io/drivers/memory） 是默认数据库，不需要任何配置。

但是，它使用 \[Map]（https\://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global\_Objects/Map），因此在清除内存时数据可能会丢失。

内存驱动程序不能在生产模式下使用。

```env
db_name=内存
db_config={}
```

## Node.js 文件系统

> \[Node.js 文件系统]（https\://unstorage.unjs.io/drivers/fs）。
>
> 使用嵌套键的目录结构将数据映射到实际文件系统。 支持使用 \[chokidar]（https\://github.com/paulmillr/chokidar）。
> 此驱动程序使用 'fs.stat' 为每个键实现元，包括 'mtime'（上次修改时间）、'atime'（上次访问时间）和 size（文件大小）。

选项：

- “base”：用于隔离此目录上的操作的基目录
- “ignore”：忽略监视的模式

```env
db_name=fs
db_config={“base”： “./.tmp”}
```

## 雷迪斯

> \[Redis]（https\://unstorage.unjs.io/drivers/redis）。
>
> 将数据存储在 \[Redis]（https\://redis.com/） 存储使用 \[ioredis]（https\://github.com/luin/ioredis）。

选项：

- “base”：用于所有键的可选前缀。 可用于命名空间。 必须用作 redis 集群模式的 hastag 前缀。
- 'url'：用于连接到 redis 的 URL。 优先于主机选项。 格式为“redis\://\<REDIS\_USER>:\<REDIS\_PASSWORD>@\<REDIS\_HOST>:\<REDIS\_PORT>'.
- “cluster”：用于集群模式的 redis 节点列表。 优先于 url 和 host 选项。
- “clusterOptions”：用于群集模式的选项。
- “ttl”：所有项目的默认 TTL（以秒为单位）。

```env
db_name=redis
db_config={“base”： “csur”， “url”： “redis://<REDIS_USER>:<REDIS_PASSWORD>@<REDIS_HOST>:<REDIS_PORT>"}
```

## HTTP协议

> \[HTTP]（https\://unstorage.unjs.io/drivers/http）。
>
> 使用远程 HTTP/HTTPS 端点作为数据存储。 支持内置 \[http server]（https\://unstorage.unjs.io/http-server） 方法。
> 此驱动程序通过发出“HEAD”请求，为每个键实现元，包括 HTTP 标头中的“mtime”（上次修改时间）和“status”。

选项：

- “base”：url 的基本 URL（必填）
- “headers”：针对所有请求发送的自定义标头

```env
db_name=http
db_config={“base”： “http://example.com”}
```

## Cloudflare KV（绑定）

> \[Cloudflare KV（绑定）]（https\://unstorage.unjs.io/drivers/cloudflare-kv-binding）。
>
> 将数据存储在 \[Cloudflare KV]（https\://developers.cloudflare.com/workers/runtime-apis/kv） 中，并从 worker 绑定访问。

\*\*注意：此驱动程序仅适用于 Cloudflare Workers 环境，请使用 \[cloudflare-kv-http]（https\://unstorage.unjs.io/drivers/cloudflare-kv-http） 用于其他环境。

您需要创建并分配 KV。 有关详细信息，请参见 \[KV 绑定]（https\://developers.cloudflare.com/workers/runtime-apis/kv#kv-bindings）。

选项：

- “binding”：KV 绑定或命名空间的名称。 默认值为 STORAGE。
- “base”： 为所有存储的键添加前缀

```env
db_name=cloudflare-kv-binding
db_config={“binding”： “存储”}
```

## Cloudflare KV （HTTP）

> \[Cloudflare KV （HTTP）]（https\://unstorage.unjs.io/drivers/cloudflare-kv-http）。
>
> 使用 \[Cloudflare API v4]（https\://api.cloudflare.com/） 将数据存储在 \[Cloudflare KV]（https\://developers.cloudflare.com/workers/learning/how-kv-works/） 中。

您需要创建一个 KV 命名空间。 有关详细信息，请参见 \[KV 绑定]（https\://developers.cloudflare.com/workers/runtime-apis/kv#kv-bindings）。
注意：此驱动程序使用本机提取并普遍工作！ 要直接在 cloudflare worker 环境中使用，请使用 cloudflare-kv-binding 驱动程序以获得最佳性能！

选项：

- “accountId”：Cloudflare 帐户 ID。
- “namespaceId”：要面向的 KV 命名空间的 ID。 注意：请务必使用命名空间的 ID，而不是工作线程环境中使用的名称或绑定。
- 'apiToken'：从\[用户配置文件'API Tokens'页面]（https\://dash.cloudflare.com/profile/api-tokens）生成的API Token。
- “email”：与您的帐户关联的电子邮件地址。 可以与 apiKey 一起使用，以代替 apiToken 进行身份验证。
- “apiKey”：在 Cloudflare 控制台的“我的帐户”页面上生成的 API 密钥。 可以与电子邮件一起使用，以代替 apiToken 进行身份验证。
- 'userServiceKey'：一个特殊的 Cloudflare API 密钥，适用于一组受限的端点。 始终以“v1.0-”开头，长度可能不同。 可用于 - 代替 apiToken 或 apiKey 和电子邮件进行身份验证。
- “apiURL”：自定义 API URL。 默认值为 https\://api.cloudflare.com。
- “base”： 为所有存储的键添加前缀

```env
db_name=cloudflare-kv-http
db_config={“accountId”： “我的账户ID”， “namespaceId”： “我的kv命名空间ID”， “apiToken”： “supersecret-api-token”}
```

---
title: Configure the Database
---

# Configure the Database

There are two environment variables that matter to database configuration, which are `db_name` and `db_config`.

The `db_name` means the name of the type of the database, the `db_config` means the configuration of it.

CranSurvey uses `unstorage` to connect to your database, almost every database configuration option can be used.

## Memory

> [Memory Driver](https://unstorage.unjs.io/drivers/memory) is the default database and it doesn't need any configuration.

However, it keeps data in memory using [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), so the data may be lost when the memory is cleared.

Memory Driver can't be used in production mode.

```env
db_name=memory
db_config={}
```

## Node.js Filesystem

> [Node.js Filesystem](https://unstorage.unjs.io/drivers/fs).
>
> Maps data to the real filesystem using directory structure for nested keys. Supports watching using [chokidar](https://github.com/paulmillr/chokidar).
> This driver implements meta for each key including `mtime` (last modified time), `atime` (last access time), and size (file size) using `fs.stat`.

Options:

- `base`: Base directory to isolate operations on this directory
- `ignore`: Ignore patterns for watch

```env
db_name=fs
db_config={"base": "./.tmp"}
```

## Redis

> [Redis](https://unstorage.unjs.io/drivers/redis).
>
> Store data in a [Redis](https://redis.com/) storage using [ioredis](https://github.com/luin/ioredis).

Options:

- `base`: Optional prefix to use for all keys. Can be used for namespacing. Has to be used as hastag prefix for redis cluster mode.
- `url`: Url to use for connecting to redis. Takes precedence over host option. Has the format `redis://<REDIS_USER>:<REDIS_PASSWORD>@<REDIS_HOST>:<REDIS_PORT>`.
- `cluster`: List of redis nodes to use for cluster mode. Takes precedence over url and host options.
- `clusterOptions`: Options to use for cluster mode.
- `ttl`: Default TTL for all items in seconds.

```env
db_name=redis
db_config={"base": "csur", "url": "redis://<REDIS_USER>:<REDIS_PASSWORD>@<REDIS_HOST>:<REDIS_PORT>"}
```

## HTTP

> [HTTP](https://unstorage.unjs.io/drivers/http).
>
> Use a remote HTTP/HTTPS endpoint as data storage. Supports built-in [http server](https://unstorage.unjs.io/http-server) methods.
> This driver implements meta for each key including `mtime` (last modified time) and `status` from HTTP headers by making a `HEAD` request.

Options:

- `base`: Base URL for urls (required)
- `headers`: Custom headers to send on all requests

```env
db_name=http
db_config={"base": "http://example.com"}
```

## Cloudflare KV (Binding)

> [Cloudflare KV (Binding)](https://unstorage.unjs.io/drivers/cloudflare-kv-binding).
>
> Store data in [Cloudflare KV](https://developers.cloudflare.com/workers/runtime-apis/kv) and access from worker bindings.

**Note: This driver only works in a Cloudflare Workers environment, use [cloudflare-kv-http](https://unstorage.unjs.io/drivers/cloudflare-kv-http) for other environments.**

You need to create and assign a KV. See [KV Bindings](https://developers.cloudflare.com/workers/runtime-apis/kv#kv-bindings) for more information.

Options:

- `binding`: KV binding or name of namespace. Default is STORAGE.
- `base`: Adds prefix to all stored keys

```env
db_name=cloudflare-kv-binding
db_config={"binding": "STORAGE"}
```

## Cloudflare KV (HTTP)

> [Cloudflare KV (HTTP)](https://unstorage.unjs.io/drivers/cloudflare-kv-http).
>
> Store data in [Cloudflare KV](https://developers.cloudflare.com/workers/learning/how-kv-works/) using the [Cloudflare API v4](https://api.cloudflare.com/).

You need to create a KV namespace. See [KV Bindings](https://developers.cloudflare.com/workers/runtime-apis/kv#kv-bindings) for more information.
Note: This driver uses native fetch and works universally! For using directly in a cloudflare worker environment, please use cloudflare-kv-binding driver for best performance!

Options:

- `accountId`: Cloudflare account ID.
- `namespaceId`: The ID of the KV namespace to target. Note: be sure to use the namespace's ID, and not the name or binding used in a worker environment.
- `apiToken`: API Token generated from the [User Profile 'API Tokens' page](https://dash.cloudflare.com/profile/api-tokens).
- `email`: Email address associated with your account. May be used along with apiKey to authenticate in place of apiToken.
- `apiKey`: API key generated on the "My Account" page of the Cloudflare console. May be used along with email to authenticate in place of apiToken.
- `userServiceKey`: A special Cloudflare API key good for a restricted set of endpoints. Always begins with "v1.0-", may vary in length. May be used to - authenticate in place of apiToken or apiKey and email.
- `apiURL`: Custom API URL. Default is https\://api.cloudflare.com.
- `base`: Adds prefix to all stored keys

```env
db_name=cloudflare-kv-http
db_config={"accountId": "my-account-id", "namespaceId": "my-kv-namespace-id", "apiToken": "supersecret-api-token"}
```

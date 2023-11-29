---
title: Konfigurieren der Datenbank
---

# Konfigurieren der Datenbank

Es gibt zwei Umgebungsvariablen, die für die Datenbankkonfiguration von Bedeutung sind: "db\_name" und "db\_config".

Der "db\_name" bezeichnet den Namen des Typs der Datenbank, der "db\_config" bezeichnet die Konfiguration der Datenbank.

CranSurvey verwendet 'unstorage', um sich mit Ihrer Datenbank zu verbinden, fast jede Datenbankkonfigurationsoption kann verwendet werden.

## Gedächtnis

> \[Speichertreiber] (https\://unstorage.unjs.io/drivers/memory) ist die Standarddatenbank und benötigt keine Konfiguration.

Es hält die Daten jedoch im Arbeitsspeicher mit [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), sodass die Daten verloren gehen können, wenn der Speicher gelöscht wird.

Der Speichertreiber kann nicht im Produktionsmodus verwendet werden.

```env
db_name=Speicher
db_config={}
```

## Node.js Dateisystem

> \[Node.js Dateisystem] (https\://unstorage.unjs.io/drivers/fs).
>
> Ordnet Daten dem realen Dateisystem zu, wobei die Verzeichnisstruktur für verschachtelte Schlüssel verwendet wird. Unterstützt das Beobachten mit [chokidar](https://github.com/paulmillr/chokidar).
> Dieser Treiber implementiert meta für jeden Schlüssel, einschließlich 'mtime' (Zeitpunkt der letzten Änderung), 'atime' (Zeitpunkt des letzten Zugriffs) und size (Dateigröße) unter Verwendung von 'fs.stat'.

Optionen:

- 'base': Basisverzeichnis zum Isolieren von Vorgängen in diesem Verzeichnis
- 'ignore': Muster für die Uhr ignorieren

```env
db_name=FS
db_config={"Basis": "./.tmp"}
```

## Redis

> [Redis](https://unstorage.unjs.io/drivers/redis).
>
> Speichern von Daten in einem \[Redis]https\://redis.com/) Speicherung unter Verwendung von [ioredis](https://github.com/luin/ioredis).

Optionen:

- 'base': Optionales Präfix, das für alle Schlüssel verwendet werden soll. Kann für den Namensraum verwendet werden. Muss als Hastag-Präfix für den Redis-Cluster-Modus verwendet werden.
- 'url': URL, die für die Verbindung mit Redis verwendet werden soll. Hat Vorrang vor der Hostoption. Hat das Format 'redis\://\<REDIS\_USER>:\<REDIS\_PASSWORD>@\<REDIS\_HOST>:\<REDIS\_PORT>'.
- 'cluster': Liste der Redis-Knoten, die für den Cluster-Modus verwendet werden sollen. Hat Vorrang vor URL- und Hostoptionen.
- 'clusterOptions': Optionen, die für den Cluster-Modus verwendet werden sollen.
- 'ttl': Standard-TTL für alle Elemente in Sekunden.

```env
db_name=Redis
db_config={"base": "csur", "url": "redis://<REDIS_USER>:<REDIS_PASSWORD>@<REDIS_HOST>:<REDIS_PORT>"}
```

## HTTP (Englisch)

> [HTTP](https://unstorage.unjs.io/drivers/http).
>
> Verwenden Sie einen Remote-HTTP/HTTPS-Endpunkt als Datenspeicher. Unterstützt integrierte [http server](https://unstorage.unjs.io/http-server)-Methoden.
> Dieser Treiber implementiert Meta für jeden Schlüssel, einschließlich 'mtime' (Zeitpunkt der letzten Änderung) und 'status' aus HTTP-Headern, indem er eine 'HEAD'-Anforderung stellt.

Optionen:

- 'base': Basis-URL für URLs (erforderlich)
- "headers": Benutzerdefinierte Header, die bei allen Anforderungen gesendet werden sollen

```env
db_name=http
db_config={"Basis": "http://example.com"}
```

## Cloudflare KV (Bindung)

> \[Cloudflare KV (Bindung)] (https\://unstorage.unjs.io/drivers/cloudflare-kv-binding).
>
> Speichern Sie Daten in [Cloudflare KV](https://developers.cloudflare.com/workers/runtime-apis/kv) und greifen Sie über Worker-Bindungen darauf zu.

**Hinweis: Dieser Treiber funktioniert nur in einer Cloudflare Worker-Umgebung, verwenden Sie [cloudflare-kv-http](https://unstorage.unjs.io/drivers/cloudflare-kv-http) für andere Umgebungen.**

Sie müssen einen KV erstellen und zuweisen. Weitere Informationen finden Sie unter [KV-Bindungen](https://developers.cloudflare.com/workers/runtime-apis/kv#kv-bindings).

Optionen:

- 'binding': KV-Bindung oder Name des Namespaces. Der Standardwert ist STORAGE.
- 'base': Fügt allen gespeicherten Schlüsseln ein Präfix hinzu

```env
db_name=Cloudflare-KV-Bindung
db_config={"binding": "SPEICHER"}
```

## Cloudflare KV (HTTP)

> \[Cloudflare KV (HTTP)] (https\://unstorage.unjs.io/drivers/cloudflare-kv-http).
>
> Speichern Sie Daten in [Cloudflare KV](https://developers.cloudflare.com/workers/learning/how-kv-works/) mit der [Cloudflare API v4](https://api.cloudflare.com/).

Sie müssen einen KV-Namespace erstellen. Weitere Informationen finden Sie unter [KV-Bindungen](https://developers.cloudflare.com/workers/runtime-apis/kv#kv-bindings).
Hinweis: Dieser Treiber verwendet natives Abrufen und funktioniert universell! Für die direkte Verwendung in einer Cloudflare-Worker-Umgebung verwenden Sie bitte den cloudflare-kv-binding-Treiber, um die beste Leistung zu erzielen!

Optionen:

- "accountId": Cloudflare-Konto-ID.
- "namespaceId": Die ID des KV-Namespaces, auf den das Ziel abzielt. Hinweis: Stellen Sie sicher, dass Sie die ID des Namespace verwenden und nicht den Namen oder die Bindung, die in einer Workerumgebung verwendet werden.
- 'apiToken': API-Token, das von der [Seite 'API-Token' des Benutzerprofils](https://dash.cloudflare.com/profile/api-tokens) generiert wurde.
- "E-Mail": E-Mail-Adresse, die mit Ihrem Konto verknüpft ist. Kann zusammen mit apiKey verwendet werden, um sich anstelle von apiToken zu authentifizieren.
- "apiKey": API-Schlüssel, der auf der Seite "Mein Konto" der Cloudflare-Konsole generiert wird. Kann zusammen mit E-Mail verwendet werden, um sich anstelle von apiToken zu authentifizieren.
- "userServiceKey": Ein spezieller Cloudflare-API-Schlüssel, der für eine eingeschränkte Anzahl von Endpunkten geeignet ist. Beginnt immer mit "v1.0-", kann in der Länge variieren. Kann verwendet werden, um sich anstelle von apiToken oder apiKey und E-Mail zu authentifizieren.
- "apiURL": Benutzerdefinierte API-URL. Der Standardwert ist https\://api.cloudflare.com.
- 'base': Fügt allen gespeicherten Schlüsseln ein Präfix hinzu

```env
db_name=cloudflare-kv-http
db_config={"accountId": "mein-konto-id", "namespaceId": "mein-kv-namespace-id", "apiToken": "supersecret-api-token"}
```

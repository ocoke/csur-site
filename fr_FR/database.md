---
title: Configurer la base de données
---

# Configurer la base de données

Il existe deux variables d’environnement importantes pour la configuration de la base de données, à savoir 'db\_name' et 'db\_config'.

Le 'db\_name' signifie le nom du type de la base de données, le 'db\_config' signifie la configuration de celle-ci.

CranSurvey utilise 'unstorage' pour se connecter à votre base de données, presque toutes les options de configuration de base de données peuvent être utilisées.

## Mémoire

> \[Pilote de mémoire] (https\://unstorage.unjs.io/drivers/memory) est la base de données par défaut et n’a besoin d’aucune configuration.

Cependant, il conserve les données en mémoire à l’aide de [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), de sorte que les données peuvent être perdues lorsque la mémoire est effacée.

Le pilote de mémoire ne peut pas être utilisé en mode production.

```env
db_name=mémoire
db_config={}
```

## Système de fichiers Node.js

> \[Système de fichiers Node.js] (https\://unstorage.unjs.io/drivers/fs).
>
> Mappe les données au système de fichiers réel à l’aide d’une structure de répertoires pour les clés imbriquées. Prend en charge le visionnage à l’aide de [chokidar](https://github.com/paulmillr/chokidar).
> Ce pilote implémente meta pour chaque clé, y compris 'mtime' (heure de la dernière modification), 'atime' (heure du dernier accès) et size (taille du fichier) à l’aide de 'fs.stat'.

Options:

- 'base' : Répertoire de base pour isoler les opérations sur ce répertoire
- 'ignore' : Ignorer les modèles pour la surveillance

```env
db_name=fs
db_config={"base » : « ./.tmp"}
```

## Redis (en anglais)

> [Redis](https://unstorage.unjs.io/drivers/redis).
>
> Stocker les données dans un fichier [Redis](https://redis.com/) stockage à l’aide de [ioredis](https://github.com/luin/ioredis).

Options:

- 'base' : préfixe facultatif à utiliser pour toutes les touches. Peut être utilisé pour l’espacement des noms. Doit être utilisé comme préfixe hastag pour le mode cluster redis.
- 'url' : Url à utiliser pour se connecter à redis. Est prioritaire sur l’option hôte. Le format 'redis\://\<REDIS\_USER>:\<REDIS\_PASSWORD>@\<REDIS\_HOST>:\<REDIS\_PORT>'.
- 'cluster' : Liste des noeuds redis à utiliser pour le mode cluster. Est prioritaire sur les options d’URL et d’hôte.
- 'clusterOptions' : Options à utiliser pour le mode cluster.
- 'ttl' : TTL par défaut pour tous les éléments en secondes.

```env
db_name=redis
db_config={"base » : « csur », « url » : « redis://<REDIS_USER>:<REDIS_PASSWORD>@<REDIS_HOST>:<REDIS_PORT>"}
```

## HTTP (en anglais seulement)

> [HTTP](https://unstorage.unjs.io/drivers/http).
>
> Utilisez un point de terminaison HTTP/HTTPS distant comme stockage de données. Prend en charge les méthodes [http server](https://unstorage.unjs.io/http-server) intégrées.
> Ce pilote implémente meta pour chaque clé, y compris 'mtime' (heure de la dernière modification) et 'status' des en-têtes HTTP en effectuant une requête 'HEAD'.

Options:

- 'base' : URL de base pour les urls (obligatoire)
- 'headers' : En-têtes personnalisés à envoyer sur toutes les requêtes

```env
db_name=http
db_config={"base » : « http://example.com"}
```

## Cloudflare KV (Liaison)

> \[Cloudflare KV (Reliure)] (https\://unstorage.unjs.io/drivers/cloudflare-kv-binding).
>
> Stockez les données dans [Cloudflare KV](https://developers.cloudflare.com/workers/runtime-apis/kv) et accédez-y à partir des liaisons de travail.

**Remarque : ce pilote ne fonctionne que dans un environnement Cloudflare Workers, utilisez [cloudflare-kv-http](https://unstorage.unjs.io/drivers/cloudflare-kv-http) pour d’autres environnements.**

Vous devez créer et affecter un KV. Voir [Liaisons KV](https://developers.cloudflare.com/workers/runtime-apis/kv#kv-bindings) pour plus d’informations.

Options:

- 'binding' : liaison KV ou nom de l’espace de noms. La valeur par défaut est STORAGE.
- 'base' : ajoute un préfixe à toutes les clés stockées

```env
db_name=liaison cloudflare-kv
db_config={"binding » : « STOCKAGE"}
```

## Cloudflare KV (HTTP)

> \[Cloudflare KV (HTTP)] (https\://unstorage.unjs.io/drivers/cloudflare-kv-http).
>
> Stockez les données dans [Cloudflare KV](https://developers.cloudflare.com/workers/learning/how-kv-works/) à l’aide de l'[API Cloudflare v4](https://api.cloudflare.com/).

Vous devez créer un espace de noms KV. Voir [Liaisons KV](https://developers.cloudflare.com/workers/runtime-apis/kv#kv-bindings) pour plus d’informations.
Remarque : Ce pilote utilise la récupération native et fonctionne universellement ! Pour une utilisation directe dans un environnement de travail cloudflare, veuillez utiliser le pilote cloudflare-kv-binding pour de meilleures performances !

Options:

- 'accountId' : ID de compte Cloudflare.
- 'namespaceId' : ID de l’espace de noms KV à cibler. Remarque : veillez à utiliser l’ID de l’espace de noms, et non le nom ou la liaison utilisés dans un environnement de travail.
- 'apiToken' : jeton d’API généré à partir de la page [Profil utilisateur 'Jetons d’API'](https://dash.cloudflare.com/profile/api-tokens).
- 'email' : Adresse e-mail associée à votre compte. Peut être utilisé avec apiKey pour s’authentifier à la place d’apiToken.
- 'apiKey' : clé API générée sur la page « Mon compte » de la console Cloudflare. Peut être utilisé avec l’e-mail pour s’authentifier à la place d’apiToken.
- 'userServiceKey' : une clé d’API Cloudflare spéciale adaptée à un ensemble restreint de terminaux. Commence toujours par « v1.0-« , peut varier en longueur. Peut être utilisé pour - s’authentifier à la place d’apiToken ou d’apiKey et d’e-mail.
- 'apiURL' : URL d’API personnalisée. La valeur par défaut est https\://api.cloudflare.com.
- 'base' : ajoute un préfixe à toutes les clés stockées

```env
db_name=cloudflare-kv-http
db_config={"accountId » : « my-account-id », « namespaceId » : « my-kv-namespace-id », « apiToken » : « supersecret-api-token"}
```

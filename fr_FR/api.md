---
title: Documentation de l’API
---

# Documentation de l’API

## Utilisateurs

### S’enregistrer

:::tip
Avant de créer une nouvelle enquête, vous devez créer un compte pour CranSurvey. D’ailleurs, le nom d’utilisateur et le mot de passe sont stockés dans votre base de données. Le compte ne peut donc pas se connecter à d’autres sites CranSurvey dans des bases de données différentes.
:::

**Demander:**

```jsonc
POST /api/usr/sign-up
{
    Il s’agit de votre nom d’utilisateur,
    « id » : « test_user »,
    votre mot de passe, doit être encrié.
    « pwd » : « test_only »
}
```

**Corps:**

```jsonc
{
    « code » : 0,
    « msg » : « Succès. »,
    s’il s’agit du premier utilisateur de la base de données, CranSurvey initialisera automatiquement les tables,
    ou ce sera 'faux'.
    « init » : true,
    le jeton au format JWT.
    « token » : « eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o »
}
```

### Connexion

> Obtenez un jeton en fournissant un nom d’utilisateur et un mot de passe.

**Demander:**

```jsonc
POST /api/usr/sign-in
{
    Il s’agit de votre nom d’utilisateur,
    « id » : « test_user »,
    votre mot de passe, doit être encrié.
    « pwd » : « test_only »
}
```

**Réponse:**

```jsonc
{
    « code » : 0,
    « msg » : « Succès. »,
    jeton au format JWT.
    « token » : « eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o »
}
```

### Vérification du jeton

> Vérifiez si le jeton est valide.

**Demander:**

```jsonc
POST /api/usr/token
{
    jeton au format JWT.
    « token » : « eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o »
}
```

**Réponse:**

```jsonc
{
    « code » : 0,
    « msg » : « Succès. »
}
```

## Enquêtes

### Créer / Mettre à jour l’enquête

> Créez une nouvelle enquête ou mettez à jour une enquête existante.

**Demander:**

```jsonc
POST /api/enquête/créer
{
    jeton au format JWT. (obligatoire)
    « token » : « eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o »,
    titre de l’enquête. (obligatoire)
    « title » : « Enquête de test »,
    Description de l’enquête. (obligatoire)
    « description » : « Il s’agit d’une enquête test. »,
    questions de l’enquête.
    « questions » : [
        {
            L’identifiant de la question doit être unique et entier. (obligatoire)
            « id » : 0,
            type de question. (obligatoire)
            « type » : « short_answer »,
            options de question.
            « valider » : {
                « min » : 1,
                « max » : 2048
            },
            Titre de la question. (obligatoire)
            « title » : « Question de test »,
            invite de question.
            « prompt » : « Il s’agit d’une question de test. »,
            Obligatoire / Facultatif
            « required » : true,
            « options » : {
                « optionsData » : []
            }
        }
    ],
    Type d’enquête, Simple / Avancé / Prompt (obligatoire)
    « type » : « simple »,
    Configurations du site
    « site » : {
        Laissez le champ vide pour l’option Global Enabled
        « domaine » : ["example.com », « example.org"],
        la priorité de la fenêtre d’invite
        « priorité » : 1,
        la position de la fenêtre d’invite, bottom_right / bottom_left / bottom_banner
        « promptWindowPosition » : « bottom_right »
    }
}
```

- Réponse:

```jsonc
{
    « code » : 0,
    « msg » : « Succès. »,
    ID unique de l’enquête.
    « uid » : « 4596870a-07f1-4113-b52d-6aa49dd2d6d9 »
}
```

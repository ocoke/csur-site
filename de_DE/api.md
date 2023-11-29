---
title: API-Dokumentation
---

# API-Dokumentation

## Benutzer

### Anmelden

:::tip
Bevor Sie eine neue Umfrage erstellen, sollten Sie sich für ein Konto bei CranSurvey registrieren. Der Benutzername und das Passwort werden übrigens in Ihrer Datenbank gespeichert. Das Konto kann sich also nicht bei anderen CranSurvey-Websites in anderen Datenbanken anmelden.
:::

**Bitten:**

```jsonc
POST /api/usr/sign-up
{
    Dies ist Ihre Benutzer-ID,
    "id": "test_user",
    Ihr Passwort sollte verschlüsselt sein.
    "pwd": "test_only"
}
```

**Körper:**

```jsonc
{
    "code": 0,
    "msg": "Erfolg.",
    Wenn dies der erste Benutzer in der Datenbank ist, wird CranSurvey Tabellen automatisch initieren.
    Oder es wird "falsch" sein.
    "init": wahr,
    das Token im JWT-Format.
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

### Anmelden

> Holen Sie sich ein Token, indem Sie Benutzername und Passwort angeben.

**Bitten:**

```jsonc
POST /api/usr/sign-in
{
    Dies ist Ihre Benutzer-ID,
    "id": "test_user",
    Ihr Passwort sollte verschlüsselt sein.
    "pwd": "test_only"
}
```

**Antwort:**

```jsonc
{
    "code": 0,
    "msg": "Erfolg.",
    Token im JWT-Format.
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

### Token prüfen

> Überprüfen Sie, ob das Token gültig ist.

**Bitten:**

```jsonc
POST /api/usr/token
{
    Token im JWT-Format.
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

**Antwort:**

```jsonc
{
    "code": 0,
    "msg": "Erfolg."
}
```

## Befragungen

### Umfrage erstellen / aktualisieren

> Erstellen Sie eine neue Umfrage oder aktualisieren Sie eine vorhandene Umfrage.

**Bitten:**

```jsonc
POSTEN /api/Umfrage/erstellen
{
    Token im JWT-Format. (erforderlich)
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o",
    Titel der Umfrage. (erforderlich)
    "title": "Umfrage testen",
    Beschreibung der Erhebung. (erforderlich)
    "description": "Dies ist eine Testumfrage.",
    Fragen der Umfrage.
    "Fragen": [
        {
            Frage-ID, sollte eindeutig und ganzzahlig sein. (erforderlich)
            "id": 0,
            Fragetyp. (erforderlich)
            "type": "short_answer",
            Optionen für Fragen.
            "validieren": {
                "min": 1,
                "max": 2048
            },
            Titel der Frage. (erforderlich)
            "title": "Testfrage",
            Eingabeaufforderung zur Frage.
            "prompt": "Dies ist eine Testfrage.",
            Erforderlich / Optional
            "required": true,
            "Optionen": {
                "optionsData": []
            }
        }
    ],
    Art der Umfrage, einfach / Erweitert / Prompt (erforderlich)
    "type": "einfach",
    Site-Konfigurationen
    "site": {
        Lassen Sie das Feld leer für global aktiviert
        "Domäne": ["example.com", "example.org"],
        Die Priorität für das Eingabeaufforderungsfenster
        "Priorität": 1,
        die Position des Eingabeaufforderungsfensters, bottom_right / bottom_left / bottom_banner
        "promptWindowPosition": "bottom_right"
    }
}
```

- Antwort:

```jsonc
{
    "code": 0,
    "msg": "Erfolg.",
    Die eindeutige ID der Umfrage.
    "UID": "4596870A-07F1-4113-B52D-6AA49DD2D6D9"
}
```

---
title: Documentos de API
---

# Documentos de API

## Usuarios

### Únete

:::tip
Antes de crear una nueva encuesta, debe registrarse para obtener una cuenta de CranSurvey. Por cierto, el nombre de usuario y la contraseña se almacenan en su base de datos. Por lo tanto, la cuenta no puede iniciar sesión con otros sitios de CranSurvey en diferentes bases de datos.
:::

**Pedir:**

```jsonc
POST /api/usr/sign-up
{
    Este es su ID de usuario,
    "id": "test_user",
    su contraseña, debe estar encriptada.
    "pwd": "test_only"
}
```

**Cuerpo:**

```jsonc
{
    "código": 0,
    "msg": "Éxito.",
    si este es el primer usuario en la base de datos, CranSurvey iniciará tablas automáticamente,
    o será 'falso'.
    "init": verdadero,
    el token en formato JWT.
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

### Inicia sesión

> Obtenga un token proporcionando el nombre de usuario y la contraseña.

**Pedir:**

```jsonc
POST /api/usr/sign-in
{
    Este es su ID de usuario,
    "id": "test_user",
    su contraseña, debe estar encriptada.
    "pwd": "test_only"
}
```

**Respuesta:**

```jsonc
{
    "código": 0,
    "msg": "Éxito.",
    token en formato JWT.
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

### Token de comprobación

> Compruebe si el token es válido.

**Pedir:**

```jsonc
POST /api/usr/token
{
    token en formato JWT.
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

**Respuesta:**

```jsonc
{
    "código": 0,
    "msg": "Éxito".
}
```

## Encuestas

### Crear / Actualizar encuesta

> Cree una nueva encuesta o actualice una encuesta existente.

**Pedir:**

```jsonc
POST /api/survey/create
{
    token en formato JWT. (obligatorio)
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o",
    Título de la encuesta. (obligatorio)
    "title": "Encuesta de prueba",
    Descripción de la encuesta. (obligatorio)
    "description": "Esta es una encuesta de prueba.",
    preguntas de la encuesta.
    "preguntas": [
        {
            El ID de la pregunta debe ser único y entero. (obligatorio)
            "id": 0,
            tipo de pregunta. (obligatorio)
            "type": "short_answer",
            Opciones de preguntas.
            "validar": {
                "min": 1,
                "Max": 2048
            },
            Título de la pregunta. (obligatorio)
            "title": "Pregunta de prueba",
            pregunta prompt.
            "prompt": "Esta es una pregunta de prueba.",
            Requerido / Opcional
            "required": true,
            "opciones": {
                "optionsData": []
            }
        }
    ],
    Tipo de encuesta, simple / avanzada / rápida (obligatorio)
    "type": "simple",
    Configuraciones del sitio
    "sitio": {
        Déjelo en blanco para Global Enabled
        "dominio": ["example.com", "example.org"],
        La prioridad de la ventana de solicitud
        "prioridad": 1,
        la posición de la ventana de solicitud, bottom_right / bottom_left / bottom_banner
        "promptWindowPosition": "bottom_right"
    }
}
```

- Respuesta:

```jsonc
{
    "código": 0,
    "msg": "Éxito.",
    El identificador único de la encuesta.
    "UID": "4596870A-07F1-4113-B52D-6AA49DD2D6D9"
}
```

---
title: API Docs
---

# API Docs

## Users

### Sign up

::: tip
Before you create a new survey, you should sign up for an account for CranSurvey. By the way, the username and password are stored in your database. So the account can't login with other CranSurvey sites in different databases.
:::

**Request:**

```jsonc
// POST /api/usr/sign-up
{
    // this is your user id,
    "id": "test_user",
    // your password, should be encryped.
    "pwd": "test_only"
}
```

**Body:**

```jsonc
{
    "code": 0,
    "msg": "Success.",
    // if this is the first user in the database, CranSurvey will init tables automatically,
    // or it will be `false`.
    "init": true,
    // the token in JWT format.
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

### Sign in

> Get a token by providing username and password.

**Request:**

```jsonc
// POST /api/usr/sign-in
{
    // this is your user id,
    "id": "test_user",
    // your password, should be encryped.
    "pwd": "test_only"
}
```

**Response:**

```jsonc
{
    "code": 0,
    "msg": "Success.",
    // token in JWT format.
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

### Checking Token

> Check if the token is valid.

**Request:**

```jsonc
// POST /api/usr/token
{
    // token in JWT format.
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

**Response:**

```jsonc
{
    "code": 0,
    "msg": "Success."
}
```

## Surveys

### Create / Update Survey

> Create a new survey or update an existing survey.

**Request:**

```jsonc
POST /api/survey/create
{
    // token in JWT format. (required)
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o",
    // title of the survey. (required)
    "title": "Test Survey",
    // description of the survey. (required)
    "description": "This is a test survey.",
    // questions of the survey.
    "questions": [
        {
            // question id, should be unique and integer. (required)
            "id": 0,
            // question type. (required)
            "type": "short_answer",
            // question options.
            "validate": {
                "min": 1,
                "max": 2048
            },
            // question title. (required)
            "title": "Test Question",
            // question prompt.
            "prompt": "This is a test question.",
            // required / optional
            "required": true,
            "options": {
                "optionsData": []
            }
        }
    ],
    // type of survey, simple / advanced / prompt (required)
    "type": "simple",
    // site configs
    "site": {
        // leave blank for global enabled
        "domain": ["example.com", "example.org"],
        // the priority for the prompt window
        "priority": 1,
        // the position of the prompt window, bottom_right / bottom_left / bottom_banner
        "promptWindowPosition": "bottom_right"
    }
}
```

- Response:

```jsonc
{
    "code": 0,
    "msg": "Success.",
    // the unique id of the survey.
    "uid": "4596870a-07f1-4113-b52d-6aa49dd2d6d9"
}
```


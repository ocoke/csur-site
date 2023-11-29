---
title: Documentos da API
---

# Documentos da API

## Usuários

### Inscrição

:::tip
Antes de criar uma nova pesquisa, você deve se inscrever em uma conta para o CranSurvey. A propósito, o nome de usuário e a senha são armazenados em seu banco de dados. Assim, a conta não pode fazer login com outros sites do CranSurvey em bancos de dados diferentes.
:::

**Pedir:**

```jsonc
POST /api/usr/inscrição
{
    Este é o seu ID de usuário,
    "id": "test_user",
    sua senha, deve ser encryped.
    "pwd": "test_only"
}
```

**Corpo:**

```jsonc
{
    "código": 0,
    "msg": "Sucesso.",
    se este for o primeiro usuário no banco de dados, o CranSurvey iniciará tabelas automaticamente,
    ou será 'falso'.
    "init": verdadeiro,
    o token no formato JWT.
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

### Entrar

> Obtenha um token fornecendo nome de usuário e senha.

**Pedir:**

```jsonc
POST /api/usr/login
{
    Este é o seu ID de usuário,
    "id": "test_user",
    sua senha, deve ser encryped.
    "pwd": "test_only"
}
```

**Resposta:**

```jsonc
{
    "código": 0,
    "msg": "Sucesso.",
    token no formato JWT.
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

### Verificando o token

> Verifique se o token é válido.

**Pedir:**

```jsonc
POST /api/usr/token
{
    token no formato JWT.
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

**Resposta:**

```jsonc
{
    "código": 0,
    "msg": "Sucesso".
}
```

## Pesquisas

### Criar/Atualizar Pesquisa

> Crie uma nova pesquisa ou atualize uma pesquisa existente.

**Pedir:**

```jsonc
POST /api/survey/create
{
    token no formato JWT. (obrigatório)
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o",
    título da pesquisa. (obrigatório)
    "title": "Inquérito de Teste",
    descrição da pesquisa. (obrigatório)
    "description": "Este é um inquérito de teste.",
    perguntas da pesquisa.
    "perguntas": [
        {
            id da pergunta, deve ser único e inteiro. (obrigatório)
            "id": 0,
            tipo de pergunta. (obrigatório)
            "tipo": "short_answer",
            opções de perguntas.
            "validar": {
                "min": 1,
                "máx": 2048
            },
            título da questão. (obrigatório)
            "title": "Questão de Teste",
            prompt de pergunta.
            "prompt": "Esta é uma pergunta de teste.",
            obrigatório / opcional
            "obrigatório": verdadeiro,
            "opções": {
                "optionsData": []
            }
        }
    ],
    Tipo de pesquisa, simples / avançado / prompt (obrigatório)
    "tipo": "simples",
    Configurações do site
    "site": {
        Deixar em branco para Global Enabled
        "domínio": ["example.com", "example.org"],
        A prioridade para a janela de prompt
        "prioridade": 1,
        a posição da janela de prompt, bottom_right / bottom_left / bottom_banner
        "promptWindowPosition": "bottom_right"
    }
}
```

- Resposta:

```jsonc
{
    "código": 0,
    "msg": "Sucesso.",
    O ID exclusivo da pesquisa.
    "uid": "4596870a-07f1-4113-b52d-6aa49dd2d6d9"
}
```

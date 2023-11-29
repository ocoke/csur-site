---
title: API 文档
---

# API 文档

## 用户

### 登记

:::tip
在创建新调查之前，您应该注册一个 CranSurvey 帐户。 顺便说一句，用户名和密码存储在您的数据库中。 因此，该帐户无法登录不同数据库中的其他CranSurvey站点。
:::

**请求：**

```jsonc
开机自检 /api/usr/sign-up
{
    这是您的用户 ID，
    “id”： “test_user”，
    您的密码，应该被加密。
    “pwd”： “test_only”
}
```

**身体：**

```jsonc
{
    “代码”：0，
    “msg”： “成功。”
    如果这是数据库中的第一个用户，CranSurvey 将自动初始化表，
    否则它将是“虚假的”。
    “init”：真，
    JWT 格式的令牌。
    “token”： “eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o”
}
```

### 登录

> 通过提供用户名和密码来获取令牌。

**请求：**

```jsonc
开机自检 /api/usr/sign-in
{
    这是您的用户 ID，
    “id”： “test_user”，
    您的密码，应该被加密。
    “pwd”： “test_only”
}
```

**响应：**

```jsonc
{
    “代码”：0，
    “msg”： “成功。”
    JWT 格式的令牌。
    “token”： “eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o”
}
```

### 检查令牌

> 检查令牌是否有效。

**请求：**

```jsonc
开机自检 /api/usr/token
{
    JWT 格式的令牌。
    “token”： “eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o”
}
```

**响应：**

```jsonc
{
    “代码”：0，
    “msg”： “成功。”
}
```

## 调查

### 创建/更新调查

> 创建新调查或更新现有调查。

**请求：**

```jsonc
发布 /api/survey/create
{
    JWT 格式的令牌。（必填）
    “token”： “eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o”，
    调查的标题。（必填）
    “title”： “测试调查”，
    调查说明。（必填）
    “description”： “这是一个测试调查。”
    调查的问题。
    “问题”： [
        {
            问题 ID，应为唯一且整数。（必填）
            “id”：0，
            问题类型。（必填）
            “类型”： “short_answer”，
            问题选项。
            “验证”：{
                “最小值”：1，
                “最大”： 2048
            },
            问题标题。（必填）
            “title”： “测试题”，
            问题提示。
            “prompt”： “这是一个测试问题。”
            必需/可选
            “required”： true，
            “选项”：{
                “选项数据”：[]
            }
        }
    ],
    调查类型，简单/高级/提示（必填）
    “type”： “简单”，
    站点配置
    “站点”：{
        将全局启用留空
        “域”： [“example.com”， “example.org”]，
        提示窗口的优先级
        “优先级”：1，
        提示窗口的位置，bottom_right/bottom_left/bottom_banner
        “promptWindowPosition”： “bottom_right”
    }
}
```

- 响应：

```jsonc
{
    “代码”：0，
    “msg”： “成功。”
    调查的唯一 ID。
    “UID”： “4596870A-07F1-4113-B52D-6AA49DD2D6D9”
}
```

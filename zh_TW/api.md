---
title: API 文件
---

# API 文件

## 使用者

### 登記

:::tip
在創建新調查之前，您應該註冊一個 CranSurvey 帳戶。 順便說一句，使用者名和密碼存儲在您的資料庫中。 因此，該帳戶無法登錄不同資料庫中的其他CranSurvey網站。
:::

**請求：**

```jsonc
開機自檢 /api/usr/sign-up
{
    這是您的使用者ID，
    “id”： “test_user”，
    您的密碼，應該被加密。
    “pwd”： “test_only”
}
```

**身體：**

```jsonc
{
    “代碼”：0，
    “msg”： “成功。”
    如果這是資料庫中的第一個使用者，CranSurvey 將自動初始化表，
    否則它將是「虛假的」。
    “init”：真，
    JWT 格式的令牌。
    “token”： “eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o”
}
```

### 登錄

> 通過提供使用者名和密碼來獲取令牌。

**請求：**

```jsonc
開機自檢 /api/usr/sign-in
{
    這是您的使用者ID，
    “id”： “test_user”，
    您的密碼，應該被加密。
    “pwd”： “test_only”
}
```

**回應：**

```jsonc
{
    “代碼”：0，
    “msg”： “成功。”
    JWT 格式的令牌。
    “token”： “eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o”
}
```

### 檢查令牌

> 檢查令牌是否有效。

**請求：**

```jsonc
開機自檢 /api/usr/token
{
    JWT 格式的令牌。
    “token”： “eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o”
}
```

**回應：**

```jsonc
{
    “代碼”：0，
    “msg”： “成功。”
}
```

## 調查

### 創建/更新調查

> 創建新調查或更新現有調查。

**請求：**

```jsonc
發佈 /api/survey/create
{
    JWT 格式的令牌。（必填）
    “token”： “eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o”，
    調查的標題。（必填）
    “title”： “測試調查”，
    調查說明。（必填）
    “description”： “這是一個測試調查。”
    調查的問題。
    “問題”： [
        {
            問題ID，應為唯一且整數。（必填）
            “id”：0，
            問題類型。（必填）
            “類型”： “short_answer”，
            問題選項。
            “驗證”：{
                “最小值”：1，
                “最大”： 2048
            },
            問題標題。（必填）
            “title”： “測試題”，
            問題提示。
            “prompt”： “這是一個測試問題。”
            必需/可選
            “required”： true，
            “選項”：{
                “選項數據”：[]
            }
        }
    ],
    調查類型，簡單/高級/提示（必填）
    “type”： “簡單”，
    網站配置
    “網站”：{
        將全域啟用留空
        “域”： [“example.com”， “example.org”]，
        提示視窗的優先順序
        “優先順序”：1，
        提示視窗的位置，bottom_right/bottom_left/bottom_banner
        “promptWindowPosition”： “bottom_right”
    }
}
```

- 回應：

```jsonc
{
    “代碼”：0，
    “msg”： “成功。”
    調查的唯一ID。
    “UID”： “4596870A-07F1-4113-B52D-6AA49DD2D6D9”
}
```

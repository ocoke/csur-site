---
title: API ドキュメント
---

# API ドキュメント

## ユーザー

### サインアップ

:::tip
新しいアンケートを作成する前に、CranSurveyのアカウントにサインアップする必要があります。 ちなみに、ユーザー名とパスワードはデータベースに保存されています。 そのため、アカウントは異なるデータベース内の他のCranSurveyサイトにログインできません。
:::

**依頼：**

```jsonc
/api/usr/sign-upを投稿する
{
    これはあなたのユーザーIDです。
    "id": "test_user"、
    あなたのパスワードは、暗号化されるべきです。
    "pwd": "test_only"
}
```

**体：**

```jsonc
{
    「コード」:0、
    "msg": "成功しました。
    これがデータベースの最初のユーザーである場合、CranSurveyは自動的にテーブルを初期化します。
    または「false」になります。
    "init":true、
    JWT 形式のトークン。
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

### サインイン

> ユーザー名とパスワードを入力してトークンを取得します。

**依頼：**

```jsonc
POST /api/usr/sign-in
{
    これはあなたのユーザーIDです。
    "id": "test_user"、
    あなたのパスワードは、暗号化されるべきです。
    "pwd": "test_only"
}
```

**応答：**

```jsonc
{
    「コード」:0、
    "msg": "成功しました。
    トークンを JWT 形式で作成します。
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

### トークンの確認

> トークンが有効かどうかを確認します。

**依頼：**

```jsonc
/api/usr/tokenをPOSTします
{
    トークンを JWT 形式で作成します。
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

**応答：**

```jsonc
{
    「コード」:0、
    "msg": "成功しました。
}
```

## 調査

### アンケートの作成/更新

> 新しい調査を作成するか、既存の調査を更新します。

**依頼：**

```jsonc
POST /api/survey/create
{
    トークンを JWT 形式で作成します。(必須)
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o",
    調査のタイトル。(必須)
    "title": "テストアンケート",
    調査の説明。(必須)
    "description": "これはテストアンケートです。
    調査の質問。
    "質問": [
        {
            質問IDは、一意で整数である必要があります。(必須)
            「id」:0、
            質問タイプ。(必須)
            "タイプ": "short_answer"、
            質問の選択肢。
            "検証":{
                「分」:1、
                「最大」:2048
            },
            質問のタイトル。(必須)
            "title": "テスト問題",
            質問プロンプト。
            "prompt": "これはテスト問題です。
            必須/オプション
            "必須":true、
            「オプション」:{
                "optionsData":[]
            }
        }
    ],
    調査の種類、簡易/詳細/プロンプト(必須)
    "type": "シンプル",
    サイト構成
    「サイト」:{
        グローバル有効の場合は空白のままにします
        "ドメイン": ["example.com", "example.org"],
        プロンプトウィンドウの優先度
        「優先度」:1、
        プロンプトウィンドウの位置、bottom_right / bottom_left / bottom_banner
        "promptWindowPosition": "bottom_right"
    }
}
```

- 応答：

```jsonc
{
    「コード」:0、
    "msg": "成功しました。
    アンケートの一意の ID。
    "uid": "4596870a-07f1-4113-b52d-6aa49dd2d6d9"
}
```

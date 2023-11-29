---
title: API 문서
---

# API 문서

## 사용자

### 등록하세요

:::tip
새 설문조사를 만들기 전에 CranSurvey 계정에 가입해야 합니다. 그건 그렇고, 사용자 이름과 비밀번호는 데이터베이스에 저장됩니다. 따라서 계정은 다른 데이터베이스에 있는 다른 CranSurvey 사이트에 로그인할 수 없습니다.
:::

**요청:**

```jsonc
POST /api/usr/sign-up
{
    이것은 귀하의 사용자 ID입니다.
    "id": "test_user",
    비밀번호는 반드시 지켜야 합니다.
    "pwd": "test_only"
}
```

**몸:**

```jsonc
{
    "코드": 0,
    "msg": "성공입니다.",
    이 사용자가 데이터베이스의 첫 번째 사용자인 경우 CranSurvey는 자동으로 테이블을 초기화합니다.
    그렇지 않으면 'false'가 됩니다.
    "초기화": 사실,
    JWT 형식의 토큰입니다.
    "토큰": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

### 서명하세요

> 사용자 이름과 암호를 제공하여 토큰을 가져옵니다.

**요청:**

```jsonc
POST /api/usr/로그인
{
    이것은 귀하의 사용자 ID입니다.
    "id": "test_user",
    비밀번호는 반드시 지켜야 합니다.
    "pwd": "test_only"
}
```

**응답:**

```jsonc
{
    "코드": 0,
    "msg": "성공입니다.",
    토큰입니다.
    "토큰": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

### 토큰 확인

> 토큰이 유효한지 확인합니다.

**요청:**

```jsonc
POST /api/usr/토큰
{
    토큰입니다.
    "토큰": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o"
}
```

**응답:**

```jsonc
{
    "코드": 0,
    "msg": "성공."
}
```

## 설문 조사

### 설문조사 만들기/업데이트

> 새 현장조사를 만들거나 기존 현장조사를 업데이트합니다.

**요청:**

```jsonc
POST /api/survey/create
{
    토큰입니다. (필수)
    "토큰": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNreV90ZXN0IiwicHdkIjoidGVzdF9vbmx5In0.zdKK04qbK01SyslHXynVMqdez-fUufMHDbkr8u-7q5o",
    설문조사의 제목입니다. (필수)
    "title": "설문 조사 테스트",
    설문 조사에 대한 설명입니다. (필수)
    "description": "이것은 테스트 설문 조사입니다.",
    설문 조사의 질문.
    "질문": [
        {
            질문 ID는 고유하고 정수여야 합니다. (필수)
            "아이디": 0,
            질문 유형. (필수)
            "유형": "short_answer",
            질문 옵션.
            "유효성 검사": {
                "분": 1,
                "최대": 2048
            },
            질문 제목입니다. (필수)
            "title": "시험 문제",
            질문 프롬프트.
            "prompt": "시험 문제입니다.",
            필수/선택 사항
            "필수": 사실,
            "옵션": {
                "옵션 데이터": []
            }
        }
    ],
    설문조사 유형, 단순/고급/프롬프트(필수)
    "유형": "단순",
    사이트 구성
    "사이트": {
        전역 활성화를 위해 비워 둡니다.
        "도메인": ["example.com", "example.org"],
        프롬프트 창의 우선 순위
        "우선 순위": 1,
        프롬프트 창의 위치, bottom_right / bottom_left / bottom_banner
        "promptWindowPosition": "bottom_right"
    }
}
```

- 응답:

```jsonc
{
    "코드": 0,
    "msg": "성공입니다.",
    설문조사의 고유 ID입니다.
    "uid": "4596870a-07f1-4113-b52d-6aa49dd2d6d9"입니다.
}
```

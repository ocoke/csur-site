---
title: Getting Started
---

# 开始

CranSurvey v1 是基于 Nuxt 开发的。 它可以部署在无服务器平台上并连接不同类型的数据库。 It can be deployed on a serverless platform and connected to different types of databases.

[我们提供了一个演示网站供您试用 CranSurvey。](/demo.html)

## 一键部署

This method is good for the serverless platforms that can deploy Nuxt App directly, such as [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), Cloudflare Pages, etc.

对于数据库部分，您需要在平台的仪表板中设置环境变量。 变量是： The variables are:

- `db_name`: The type of the of the database.
- `db_config`: The configuration of the database, in JSON format.

For more details, please see the part of [Configure the Database](/database.html).

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Focoke%2FCranSurvey\&env=db_name,db_config\&envDescription=Database%20Settings%20for%20the%20CranSurvey\&envLink=https%3A%2F%2Fcsur.proj.sbs%2Fdatabase.html\&project-name=cransurvey-project\&repository-name=cransurvey-project)

### Netlify

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ocoke/CranSurvey)

## 手动部署

首先，您需要克隆存储库：

```bash
git clone https://github.com/ocoke/CranSurvey.git
```

然后，安装依赖项：

```bash
yarn install
```

然后，您需要设置用于构建的环境变量，因为不同的平台需要不同的格式和类型的文件。

::: tip
The presets of the server providers can be found in the link below:

- [AWS Lambda](https://nitro.unjs.io/deploy/providers/aws)
- [Azure](https://nitro.unjs.io/deploy/providers/azure)
- [Cleavr](https://nitro.unjs.io/deploy/providers/cleavr)
- [Cloudflare](https://nitro.unjs.io/deploy/providers/cloudflare)
- [Deno](https://nitro.unjs.io/deploy/providers/deno)
- [Digital Ocean](https://nitro.unjs.io/deploy/providers/digitalocean)
- [Edgio](https://nitro.unjs.io/deploy/providers/edgio)
- [Firebase](https://nitro.unjs.io/deploy/providers/firebase)
- [Flightcontrol](https://nitro.unjs.io/deploy/providers/flightcontrol)
- [GitHub Pages](https://nitro.unjs.io/deploy/providers/github)
- [Heroku](https://nitro.unjs.io/deploy/providers/heroku)
- [IIS](https://nitro.unjs.io/deploy/providers/iis)
- [Lagon](https://nitro.unjs.io/deploy/providers/lagon)
- [Netlify](https://nitro.unjs.io/deploy/providers/netlify)
- [Render.com](https://nitro.unjs.io/deploy/providers/render)
- [StormKit](https://nitro.unjs.io/deploy/providers/stormkit)
- [Vercel](https://nitro.unjs.io/deploy/providers/vercel)
  :::

我们需要改变开发预设，

例如，如果要部署到 Vercel，则需要将环境变量设置为：

```bash
NITRO_PRESET=vercel yarn build
```

然后，您可以按照 Nitro 的文档将 `dist` 文件夹部署到您想要的 Serverless 平台。

享受您全新的 CranSurvey 网站！

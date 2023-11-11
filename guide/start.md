---
title: Getting Started
---

# Getting Started

CranSurvey v1 is developed based on Nuxt. It can be deployed on a serverless platform and connected to different types of databases.

[We provided a demo site for you to try out CranSurvey.](/demo.html)

## One Click Deploy

This method is good for the serverless platforms that can deploy Nuxt App directly, such as [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), Cloudflare Pages, etc.

For the database part, you need to set the environment variables in the platform's dashboard. The variables are:

- `db_name`: The type of the of the database.
- `db_config`: The configuration of the database, in JSON format.

For more details, please see the part of [Configure the Database](/database.html).

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Focoke%2FCranSurvey&env=db_name,db_config&envDescription=Database%20Settings%20for%20the%20CranSurvey&envLink=https%3A%2F%2Fcsur.proj.sbs%2Fdatabase.html&project-name=cransurvey-project&repository-name=cransurvey-project)

### Netlify

[![Deploy with Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ocoke/CranSurvey)

## Manual Deploy

First, you need to clone the repository:

```bash
git clone https://github.com/ocoke/CranSurvey.git
```

Then, install the dependencies:

```bash
yarn install
```

Then, you need to set an environment variable for building because different platforms need different formats and types of files.

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

And we need to change the development preset,

for example, if you want to deploy to Vercel, you need to set the environment variable as:

```bash
NITRO_PRESET=vercel yarn build
```

Then, you can deploy the `dist` folder to the serverless platform you want by following the documents of Nitro.

Enjoy your brand new CranSurvey site!
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CranSurvey",
  description: "CranSurvey is a tool for the website manager to add a quick survey-collecting prompt to their website in a few seconds. It's based on Nitro, which means you can deploy CranSurvey on a serverless platform.",
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: 'CranSurvey',
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/start.html' },
          { text: 'Configure the Database', link: '/database.html' },
          { text: 'Sign up to CranSurvey', link: '/guide/signup.html' },
          { text: 'Sign in to CranSurvey', link: '/guide/signin.html' },
          { text: 'Create a Survey', link: '/guide/create.html' },

        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'Demo Site', link: '/demo.html' },
          { text: 'API', link: '/api.html' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ocoke/CranSurvey' }
    ],
    footer: {
        message: 'Released under the MIT License.<br>The page was translated by Microsoft Translator and other contributors.',
        copyright: '© 2023 <a href="https://github.com/ocoke/CranSurvey">CranSurvey</a>'
    },
    search: {
      provider: 'local',
    },
  },
  locales: {
    root: {
      label: 'English (US)',
      lang: 'en_US',
    },
/*
    zh_CN: {
      label: '中文(简体)',
      lang: 'zh_CN',
      link: '/zh_CN/',
    },
    zh_TW: {
      label: '中文(繁體)',
      lang: 'zh_TW',
      link: '/zh_TW/',
    },
*/
    contribute: {
      label: 'Contribute to Locales',
      lang: 'en_US',
      link: 'https://github.com/ocoke/CranSurvey/tree/master/locales',
    },
  },
  
})

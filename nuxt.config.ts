import { appLocales, localeNameMap } from './i18n/locales'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  typescript: {
    strict: true,
    typeCheck: true
  },
  css: ['~/assets/scss/main.scss'],
  modules: [
    '@nuxtjs/i18n'
  ],
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'es',
    locales: appLocales.map((locale) => ({
      code: locale.substring(0, 2),
      language: locale,
      name: localeNameMap[locale]
    })),
    vueI18n: './i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: false,
      alwaysRedirect: false
    }
  },
  runtimeConfig: {
    banditTicketsCoreUrl: process.env.BANDIT_TICKETS_CORE_URL || '',
    banditTicketsApiKey: process.env.BANDIT_TICKETS_CORE_API_KEY || '',
    buyerSupportEmail: process.env.BUYER_SUPPORT_EMAIL || '',
    buyerSupportPhone: process.env.BUYER_SUPPORT_PHONE || '',
    public: {}
  },
  vite: {
    server: {
      allowedHosts: ['devel.bandit.tickets']
    }
  }
})


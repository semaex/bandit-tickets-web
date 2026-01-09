export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  typescript: {
    strict: true,
    typeCheck: true
  },
  css: ['~/assets/styles/main.css'],
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


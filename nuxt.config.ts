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
    public: {}
  },
  vite: {
    server: {
      allowedHosts: ['devel.bandit.tickets']
    }
  }
})


import { defineNuxtPlugin } from '#app'
import Notifications, { useNotification } from '@kyvg/vue3-notification'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Notifications)
  
  const { notify } = useNotification()
  
  return {
    provide: {
      notify
    }
  }
})

interface HTMLElementWithClickOutside extends HTMLElement {
  clickOutsideEvent?: (event: MouseEvent) => void
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('click-outside', {
    mounted(el: HTMLElement, binding) {
      const element = el as HTMLElementWithClickOutside
      element.clickOutsideEvent = function (event: MouseEvent) {
        let handler = binding.value
        let ignoreSelectors: string[] = []

        if (typeof binding.value === 'object' && binding.value !== null && 'handler' in binding.value) {
          handler = binding.value.handler
          ignoreSelectors = binding.value.ignore || []
        }

        const shouldIgnore = ignoreSelectors.some(selector => {
          const elements = document.querySelectorAll(selector)
          return Array.from(elements).some(element => element === event.target || element.contains(event.target as Node))
        })

        if (el !== event.target && !el.contains(event.target as Node) && !shouldIgnore) {
          if (typeof handler === 'function') {
            handler(event)
          } else if (typeof handler === 'string' && binding.instance) {
            const method = (binding.instance as any)[handler]
            if (typeof method === 'function') {
              method(event)
            }
          }
        }
      }
      document.body.addEventListener('click', element.clickOutsideEvent)
    },
    unmounted(el: HTMLElement) {
      const element = el as HTMLElementWithClickOutside
      if (element.clickOutsideEvent) {
        document.body.removeEventListener('click', element.clickOutsideEvent)
      }
    }
  })
})

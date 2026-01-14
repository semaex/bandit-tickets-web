interface HTMLElementWithClickOutside extends HTMLElement {
  clickOutsideEvent?: (event: MouseEvent) => void
}

export default defineNuxtPlugin({
  name: 'click-outside-directive',
  setup(nuxtApp) {
    nuxtApp.vueApp.directive('click-outside', {
      getSSRProps() {
        return {}
      },
      mounted(el: HTMLElement, binding) {
        if (import.meta.server) {
          return
        }

        const element = el as HTMLElementWithClickOutside
        
        element.clickOutsideEvent = function (event: MouseEvent) {
          let handler: ((event: MouseEvent) => void) | string | null = null
          let ignoreSelectors: string[] = []

          if (typeof binding.value === 'function') {
            handler = binding.value
          } else if (typeof binding.value === 'string') {
            handler = binding.value
          } else if (typeof binding.value === 'object' && binding.value !== null) {
            if ('handler' in binding.value) {
              handler = binding.value.handler as ((event: MouseEvent) => void) | string
              ignoreSelectors = (binding.value.ignore as string[]) || []
            }
          }

          if (!handler) {
            return
          }

          const shouldIgnore = ignoreSelectors.some(selector => {
            const elements = document.querySelectorAll(selector)
            return Array.from(elements).some(element => {
              return element === event.target || element.contains(event.target as Node)
            })
          })

          if (el !== event.target && !el.contains(event.target as Node) && !shouldIgnore) {
            if (typeof handler === 'function') {
              handler(event)
            } else if (typeof handler === 'string' && binding.instance) {
              const method = (binding.instance as any)[handler]
              if (typeof method === 'function') {
                method.call(binding.instance, event)
              }
            }
          }
        }
        
        document.body.addEventListener('click', element.clickOutsideEvent)
      },
      unmounted(el: HTMLElement) {
        if (import.meta.server) {
          return
        }

        const element = el as HTMLElementWithClickOutside
        if (element.clickOutsideEvent) {
          document.body.removeEventListener('click', element.clickOutsideEvent)
        }
      }
    })
  }
})

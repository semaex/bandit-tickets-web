export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('focus-first-input', {
        mounted(el: HTMLElement, binding) {
            if (binding.value === false) {
                return
            }
            const input = el.querySelector('input:not([disabled]):not([readonly])') as HTMLInputElement
            if (input) {
                input.focus()
            }
        }
    })
})


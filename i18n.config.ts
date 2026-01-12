import { defineI18nConfig } from '#i18n'
import { appLocales } from './i18n/locales'

export default defineI18nConfig(() => {
  const messages = appLocales.reduce((acc, locale) => {
    acc[locale.substring(0, 2)] = {}
    return acc
  }, {} as Record<string, Record<string, any>>)

  return {
    legacy: false,
    locale: 'es',
    fallbackLocale: 'es',
    messages: messages as any
  }
})

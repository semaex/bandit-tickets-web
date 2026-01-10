import { translationService } from '../services/translation.service'
import type { AppLocale } from '../i18n/locales'
import { appLocales } from '../i18n/locales'

function detectBrowserLocale(): AppLocale {

  if (!navigator?.language) {
    return 'es-ES'
  }

  const browserLocale = navigator.language
  const languageCode = browserLocale.split('-')[0].toLowerCase()

  const localeMap: Record<string, AppLocale> = {
    'en': 'en-GB',
    'es': 'es-ES',
    'ca': 'ca-ES',
    'eu': 'eu-ES',
    'gl': 'gl-ES'
  }

  if (localeMap[languageCode] && appLocales.includes(localeMap[languageCode])) {
    return localeMap[languageCode]
  }

  const fullLocale = browserLocale.replace('_', '-') as AppLocale
  if (appLocales.includes(fullLocale)) {
    return fullLocale
  }

  return 'es-ES'
}

export default defineNuxtPlugin(() => {
  const detectedLocale = detectBrowserLocale()
  const appLanguage = useState<AppLocale>('appLanguage', () => 'es-ES')
  
  appLanguage.value = detectedLocale
  translationService.setLocale(detectedLocale)
})


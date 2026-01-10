import { translationService } from '../services/translation.service'
import type { AppLocale } from '../i18n/locales'

export function useAppLocale() {
  const appLocale = useState<AppLocale>('appLanguage', () => 'es-ES')

  function setAppLocale(lang: AppLocale) {
    translationService.setLocale(lang)
    appLocale.value = lang
  }

  function trans(key: string, variables?: Record<string, string>) {
    return translationService.translate(key, variables)
  }

  return {
    appLocale,
    setAppLocale,
    trans
  }
}


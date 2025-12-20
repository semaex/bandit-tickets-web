import { translationService } from '../services/translation.service'
import type { AppLanguage } from '../i18n/languages'

export function useAppLanguage() {
  const appLanguage = useState<AppLanguage>('appLanguage', () => 'es-ES')

  function setAppLanguage(lang: AppLanguage) {
    translationService.setLanguage(lang)
    appLanguage.value = lang
  }

  function trans(key: string, variables?: Record<string, string>) {
    return translationService.translate(key, variables)
  }

  return {
    appLanguage,
    setAppLanguage,
    trans
  }
}


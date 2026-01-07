import generalTranslations from '../i18n/general.i18n.json'
import musicGenresTranslations from '../i18n/music-genres.i18n.json'
import { appLanguages } from '../i18n/languages'

interface Translations {
  [language: string]: Record<string, any>
}

interface Language {
  code: string
  name: string
}

class TranslationService {
  private translations: Translations

  constructor() {
    this.translations = {}
    this.addTranslations('general', generalTranslations)
    this.addTranslations('musicGenres', musicGenresTranslations)
  }

  /**
   * Get current language from state
   */
  private getCurrentLanguage(): string {
    const appLanguage = useState<string>('appLanguage', () => 'es-ES')
    return appLanguage.value || 'es-ES'
  }

  /**
   * Set current language
   */
  setLanguage(language: string): void {
    const appLanguage = useState<string>('appLanguage', () => 'es-ES')
    appLanguage.value = language
  }

  /**
   * Returns translate by key. Accepts subkey
   * key example: calendar.remove_one_date
   * if there is not translation, returns last segment
   * @param key
   * @param variables
   * @param language
   * @returns string
   */
  translate(key: string, variables?: Record<string, string>, language?: string): string {
    const keys = key.split('.')
    let result: any

    if (keys) {
      const lang = language || this.getCurrentLanguage()
      result = this.translations[lang]
      
      for (let i = 0; i < keys.length; i++) {
        if (result && result.hasOwnProperty(keys[i])) {
          result = result[keys[i]]
        } else {
          result = key
          break
        }
      }

      if (result === key && keys.length > 0) {
        result = keys[keys.length - 1]
      }
    } else {
      result = key
    }

    // variables assign
    if (variables && typeof result === 'string') {
      for (const [name, value] of Object.entries(variables)) {
        result = result.replaceAll(':' + name, value)
      }
    }

    return result as string
  }

  /**
   *
   * @param domain
   *      example: 'concert.technical'
   * @param translations
   */
  addTranslations(domain: string, translations: Record<string, any>): void {
    for (const lang in translations) {
      if (!this.translations.hasOwnProperty(lang)) {
        this.translations[lang] = {}
      }

      const keyPath = domain.split('.')
      const lastKeyIndex = keyPath.length - 1
      let obj: any = this.translations[lang]

      for (let i = 0; i < lastKeyIndex; ++i) {
        const key = keyPath[i]
        if (!(key in obj)) {
          obj[key] = {}
        }
        obj = obj[key]
      }
      obj[keyPath[lastKeyIndex]] = translations[lang]
    }
  }

  languages(currentLanguage: string): Language[] {
    const languages: Language[] = []
    
    appLanguages.forEach((language) => {
      languages.push({
        code: language,
        name: this.translate('general.language.' + language, undefined, currentLanguage)
      })
    })

    return languages.sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
  }
}

export const translationService = new TranslationService()


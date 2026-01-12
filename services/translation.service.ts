import generalTranslations from '../i18n/general.i18n.json'
import musicGenresTranslations from '../i18n/music-genres.i18n.json'
import formValidationsTranslations from '../i18n/form-validations.i18n.json'
import countriesTranslations from '../i18n/countries.i18n.json'
import { type AppLocale } from '../i18n/locales'

interface Translations {
  [locale: string]: Record<string, any>
}

class TranslationService {
  private translations: Translations

  constructor() {
    this.translations = {}
    this.addTranslations('general', generalTranslations)
    this.addTranslations('musicGenres', musicGenresTranslations)
    this.addTranslations('formValidations', formValidationsTranslations)
    this.addTranslations('countries', countriesTranslations)
  }

  /**
   * Get current locale from state
   */
  private getCurrentLocale(): AppLocale {
    const appLocale = useState<AppLocale>('appLocale', () => 'es-ES')
    return appLocale.value || 'es-ES'
  }

  /**
   * Set current locale
   */
  setLocale(locale: AppLocale): void {
    const appLocale = useState<AppLocale>('appLocale', () => 'es-ES')
    appLocale.value = locale
  }

  /**
   * Returns translate by key. Accepts subkey
   * key example: calendar.remove_one_date
   * if there is not translation, returns last segment
   * @param key
   * @param variables
   * @param locale
   * @returns string
   */
  translate(key: string, variables?: Record<string, string>, locale?: string): string {
    const keys = key.split('.')
    let result: any

    if (keys) {
      result = this.translations[locale || this.getCurrentLocale()]
      
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
    for (const locale in translations) {
      if (!this.translations.hasOwnProperty(locale)) {
        this.translations[locale] = {}
      }

      const keyPath = domain.split('.')
      const lastKeyIndex = keyPath.length - 1
      let obj: any = this.translations[locale]

      for (let i = 0; i < lastKeyIndex; ++i) {
        const key = keyPath[i]
        if (!(key in obj)) {
          obj[key] = {}
        }
        obj = obj[key]
      }
      obj[keyPath[lastKeyIndex]] = translations[locale]
    }
  }
}

export const translationService = new TranslationService()


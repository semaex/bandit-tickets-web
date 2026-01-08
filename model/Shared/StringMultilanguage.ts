import { Locale } from './Locale'

// Locale fallback mapping: source locale -> destination locale
const LOCALE_FALLBACK_MAP: Record<string, string> = {
  // Regional languages of Spain fall back to Spanish
  'ca-ES': 'es-ES', // Catalan
  'eu-ES': 'es-ES', // Basque
  'gl-ES': 'es-ES', // Galician
}

// Pattern-based fallbacks (language-X -> language-ES)
const shouldFallbackToSpanishVariant = (language: string, country: string): boolean => {
  return country !== 'ES' && ['es', 'ca', 'eu', 'gl'].includes(language)
}

export class StringMultilanguage {
  private readonly values: Record<string, string>

  constructor(values: Record<string, string> | null) {
    this.values = {}
    if (values) {
      this.ensureValidStructure(values)
    }
  }

  static createEmpty(): StringMultilanguage {
    return new StringMultilanguage(null)
  }

  static fromArray(values: Record<string, string> | null): StringMultilanguage {
    return new StringMultilanguage(values)
  }

  value(locale: Locale): string | null {
    const localeValue = locale.toString()
    return this.values[localeValue] ?? null
  }

  valueForLocaleOrAutoFallback(locale: Locale): string | null {
    // 1. Try exact locale
    const value = this.value(locale)
    if (value !== null && value !== '') {
      return value
    }

    // 2. Try explicit fallback from mapping
    const localeString = locale.toString()
    const mappedFallback = LOCALE_FALLBACK_MAP[localeString]
    if (mappedFallback) {
      try {
        const fallbackLocale = Locale.fromString(mappedFallback)
        const fallbackValue = this.value(fallbackLocale)
        if (fallbackValue !== null && fallbackValue !== '') {
          return fallbackValue
        }
      } catch {
        // Ignore invalid mapped locale
      }
    }

    // 3. Try pattern-based fallback (e.g., es-AR -> es-ES)
    const parts = localeString.split('-')
    if (parts.length === 2) {
      const [language, country] = parts
      
      if (shouldFallbackToSpanishVariant(language, country)) {
        try {
          const spanishLocale = Locale.fromString(`${language}-ES`)
          const spanishValue = this.value(spanishLocale)
          if (spanishValue !== null && spanishValue !== '') {
            return spanishValue
          }
        } catch {
          // Ignore invalid locale
        }
      }
    }

    // 4. Try es-ES as ultimate fallback (project default language)
    if (localeString !== 'es-ES') {
      try {
        const defaultLocale = Locale.fromString('es-ES')
        const defaultValue = this.value(defaultLocale)
        if (defaultValue !== null && defaultValue !== '') {
          return defaultValue
        }
      } catch {
        // Ignore invalid locale
      }
    }

    // 5. Try any available locale as last resort
    const availableLocales = Object.keys(this.values)
    for (const availableLocale of availableLocales) {
      try {
        const candidateLocale = Locale.fromString(availableLocale)
        const candidateValue = this.value(candidateLocale)
        if (candidateValue !== null && candidateValue !== '') {
          return candidateValue
        }
      } catch {
        continue
      }
    }

    return null
  }

  toArray(): Record<string, string> {
    return { ...this.values }
  }

  with(locale: Locale, value: string): StringMultilanguage {
    const newValues = { ...this.values }
    const localeValue = locale.toString()
    newValues[localeValue] = value
    return new StringMultilanguage(newValues)
  }

  hasLocale(locale: Locale): boolean {
    const localeValue = locale.toString()
    return localeValue in this.values
  }

  isEmpty(): boolean {
    for (const value of Object.values(this.values)) {
      if (value !== null && value !== undefined && value.trim() !== '') {
        return false
      }
    }
    return true
  }

  private ensureValidStructure(values: Record<string, string>): void {
    for (const [locale, value] of Object.entries(values)) {
      if (typeof locale !== 'string') {
        throw new Error(`Invalid locale code: ${locale}. It must be a string.`)
      }

      try {
        const localeVO = Locale.fromString(locale)
        const localeValue = localeVO.toString()

        if (localeValue in this.values) {
          throw new Error(`Duplicate locale code: ${localeValue}. The locale code must be unique.`)
        }

        this.values[localeValue] = value
      } catch (e) {
        if (e instanceof Error && e.message.includes('Invalid locale code')) {
          throw new Error(`Invalid locale code: ${locale}. It must be a valid locale format (e.g., 'es-ES', 'en-GB').`)
        }
        throw e
      }

      if (typeof value !== 'string') {
        throw new Error(`Value for locale '${locale}' must be a string.`)
      }
    }
  }
}

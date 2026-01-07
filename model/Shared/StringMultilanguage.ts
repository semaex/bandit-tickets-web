import { Locale } from './Locale'

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

  valueWithFallback(locale: Locale, fallbackLocale: Locale | null = null): string | null {
    const value = this.value(locale)
    if (value !== null && value !== '') {
      return value
    }

    if (fallbackLocale !== null) {
      const fallbackValue = this.value(fallbackLocale)
      if (fallbackValue !== null && fallbackValue !== '') {
        return fallbackValue
      }
    }

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

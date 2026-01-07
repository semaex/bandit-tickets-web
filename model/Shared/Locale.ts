export class Locale {
  private readonly _value: string

  constructor(value: string) {
    this.ensureIsValidLocale(value)
    this._value = value
  }

  private ensureIsValidLocale(value: string): void {
    if (!/^[a-z]{2}-[A-Z]{2}$/.test(value)) {
      throw new Error(`Invalid locale code: ${value}. Expected format: locale format (e.g., "es-ES", "en-GB").`)
    }
  }

  static fromString(value: string): Locale {
    return new Locale(value)
  }

  value(): string {
    return this._value
  }

  toString(): string {
    return this.value()
  }

  equals(other: Locale): boolean {
    return this._value === other.value()
  }
}


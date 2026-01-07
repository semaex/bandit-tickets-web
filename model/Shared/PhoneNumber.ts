import { CountryCode } from './CountryCode'

export class PhoneNumber {
  private readonly _e164: string

  private constructor(e164: string) {
    this._e164 = e164
  }

  static fromE164(e164: string): PhoneNumber {
    const trimmed = e164.trim()
    
    if (trimmed === '') {
      throw new Error('Phone number cannot be empty')
    }

    if (!trimmed.startsWith('+')) {
      throw new Error('Phone number must be in E.164 format')
    }

    this.ensureIsValidE164(trimmed)
    
    return new PhoneNumber(trimmed)
  }

  static fromString(
    raw: string,
    countryCode: CountryCode | null = null
  ): PhoneNumber {
    const trimmed = raw.trim()

    if (trimmed === '') {
      throw new Error('Phone number cannot be empty')
    }

    let normalized = trimmed

    if (normalized.startsWith('00')) {
      normalized = '+' + normalized.substring(2)
    }

    if (!normalized.startsWith('+')) {
      if (countryCode) {
        normalized = `+${countryCode.value()}${normalized}`
      } else {
        normalized = '+34' + normalized
      }
    }

    this.ensureIsValidE164(normalized)

    return new PhoneNumber(normalized)
  }

  private static ensureIsValidE164(e164: string): void {
    const e164Regex = /^\+[1-9]\d{1,14}$/
    if (!e164Regex.test(e164)) {
      throw new Error(`Invalid phone number: ${e164}. Must be in E.164 format (e.g., +34123456789)`)
    }
  }

  value(): string {
    return this._e164
  }

  toString(): string {
    return this.value()
  }

  equals(other: PhoneNumber): boolean {
    return this._e164 === other.value()
  }

  format(): string {
    if (this._e164.length < 4) {
      return this._e164
    }

    const countryCode = this._e164.substring(1, 3)
    const rest = this._e164.substring(3)

    if (countryCode === '34') {
      if (rest.length === 9) {
        return `+${countryCode} ${rest.substring(0, 3)} ${rest.substring(3, 6)} ${rest.substring(6)}`
      }
    }

    return this._e164
  }
}


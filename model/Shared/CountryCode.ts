export class CountryCode {
  private readonly code: string

  constructor(code: string) {
    if (!/^[A-Z]{2}$/.test(code)) {
      throw new Error(`Invalid country code: ${code}`)
    }

    this.code = code.toUpperCase()
  }

  static fromString(code: string): CountryCode {
    return new CountryCode(code)
  }

  value(): string {
    return this.code
  }

  toString(): string {
    return this.value()
  }

  equals(other: CountryCode): boolean {
    return this.code === other.value()
  }
}


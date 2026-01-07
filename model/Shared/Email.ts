export class Email {
  private readonly _value: string

  constructor(value: string) {
    const normalizedValue = value.toLowerCase().trim()
    this.ensureIsValidEmail(normalizedValue)
    this._value = normalizedValue
  }

  private ensureIsValidEmail(value: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      throw new Error(`Invalid email: ${value}`)
    }
  }

  static fromString(email: string): Email {
    return new Email(email)
  }

  value(): string {
    return this._value
  }

  toString(): string {
    return this.value()
  }

  equals(other: Email): boolean {
    return this._value === other.value()
  }
}


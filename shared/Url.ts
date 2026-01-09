export class Url {
  private readonly _value: string

  constructor(value: string) {
    this.ensureIsValidUrl(value)
    this._value = value
  }

  private ensureIsValidUrl(value: string): void {
    try {
      new URL(value)
    } catch (e) {
      throw new Error(`Invalid URL: ${value}`)
    }
  }

  static fromString(value: string): Url {
    return new Url(value)
  }

  value(): string {
    return this._value
  }

  toString(): string {
    return this.value()
  }

  equals(other: Url): boolean {
    return this._value === other.value()
  }
}


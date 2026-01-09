export class Timezone {
  private readonly _value: string

  private constructor(value: string) {
    this.ensureIsValidTimezone(value)
    this._value = value
  }

  private ensureIsValidTimezone(value: string): void {
    try {
      Intl.DateTimeFormat(undefined, { timeZone: value })
    } catch (e) {
      throw new Error(`Invalid timezone: ${value}. Must be a valid timezone identifier (e.g., "Europe/Madrid", "America/New_York").`)
    }
  }

  static fromString(timezone: string): Timezone {
    return new Timezone(timezone)
  }

  static utc(): Timezone {
    return new Timezone('UTC')
  }

  value(): string {
    return this._value
  }

  toString(): string {
    return this.value()
  }

  equals(other: Timezone): boolean {
    return this._value === other.value()
  }
}


export class Uuid {
  private readonly _value: string

  constructor(value: string) {
    this.ensureIsValidUuid(value)
    this._value = value
  }

  private ensureIsValidUuid(value: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(value)) {
      throw new Error(`Invalid UUID: ${value}`)
    }
  }

  static fromString(value: string): Uuid {
    return new Uuid(value)
  }

  static random(): Uuid {
    return new Uuid('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    }))
  }

  value(): string {
    return this._value
  }

  toString(): string {
    return this.value()
  }

  equals(other: Uuid): boolean {
    return this._value === other.value()
  }
}


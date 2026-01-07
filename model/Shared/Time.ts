export class Time {
  private readonly _hour: number
  private readonly _minute: number
  private readonly _second: number

  constructor(hour: number, minute: number, second: number = 0) {
    if (hour < 0 || hour > 23) {
      throw new Error(`Invalid hour: ${hour}. Must be between 0 and 23.`)
    }
    if (minute < 0 || minute > 59) {
      throw new Error(`Invalid minute: ${minute}. Must be between 0 and 59.`)
    }
    if (second < 0 || second > 59) {
      throw new Error(`Invalid second: ${second}. Must be between 0 and 59.`)
    }

    this._hour = hour
    this._minute = minute
    this._second = second
  }

  static fromString(time: string): Time {
    const parts = time.split(':')
    if (parts.length < 2 || parts.length > 3) {
      throw new Error(`Invalid time format: ${time}. Expected format: "HH:mm" or "HH:mm:ss".`)
    }

    const hour = parseInt(parts[0], 10)
    const minute = parseInt(parts[1], 10)
    const second = parts.length === 3 ? parseInt(parts[2], 10) : 0

    return new Time(hour, minute, second)
  }

  static now(): Time {
    const now = new Date()
    return new Time(now.getHours(), now.getMinutes(), now.getSeconds())
  }

  static zero(): Time {
    return new Time(0, 0, 0)
  }

  hour(): number {
    return this._hour
  }

  minute(): number {
    return this._minute
  }

  second(): number {
    return this._second
  }

  toString(): string {
    return `${String(this._hour).padStart(2, '0')}:${String(this._minute).padStart(2, '0')}:${String(this._second).padStart(2, '0')}`
  }

  toShortString(): string {
    return `${String(this._hour).padStart(2, '0')}:${String(this._minute).padStart(2, '0')}`
  }

  equals(other: Time): boolean {
    return this._hour === other.hour() && this._minute === other.minute() && this._second === other.second()
  }
}


import { Currency } from './Currency'

const CURRENCY_DECIMALS = 2

function roundAmount(amount: number, decimals: number): number {
  return Math.round(amount * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

export class Money {
  private readonly _amount: number
  private readonly _currency: Currency

  constructor(amount: number, currency: Currency) {
    this._amount = roundAmount(amount, CURRENCY_DECIMALS)
    this._currency = currency
  }

  static fromArray(data: { amount: number; currency: string; formatted?: string }): Money {
    if (!data.amount || !data.currency) {
      throw new Error('Money from array must have amount and currency')
    }

    const currency = data.currency.toUpperCase() as Currency
    if (!Object.values(Currency).includes(currency)) {
      throw new Error(`Invalid currency: ${data.currency}`)
    }

    return new Money(data.amount, currency)
  }

  static zero(currency: Currency): Money {
    return new Money(0, currency)
  }

  static clone(value: Money | null): Money | null {
    if (value === null) {
      return null
    }
    return new Money(value.amount(), value.currency())
  }

  static isNull(value: Money | null): boolean {
    if (value === null) {
      return true
    }
    return value.amount() === null && value.currency() === null
  }

  amount(): number {
    return roundAmount(this._amount, 5)
  }

  currency(): Currency {
    return this._currency
  }

  value(): number {
    return this.amount()
  }

  toString(): string {
    return `${this._amount} ${this._currency}`
  }

  equalsTo(other: Money): boolean {
    if (this._currency !== other.currency()) {
      throw new Error('Money comparison cannot be done with different currencies')
    }
    return this._amount === other.amount()
  }

  equals(other: Money): boolean {
    return this.equalsTo(other)
  }

  formatted(): string {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: this._currency,
      minimumFractionDigits: CURRENCY_DECIMALS,
      maximumFractionDigits: CURRENCY_DECIMALS
    })
    return formatter.format(this._amount)
  }

  toArray(): { amount: number; currency: string; formatted: string } {
    return {
      amount: this.amount(),
      currency: this._currency,
      formatted: this.formatted()
    }
  }

  sum(other: Money): Money {
    if (this._currency !== other.currency()) {
      throw new Error('Money sum cannot be done with different currencies')
    }
    return new Money(this._amount + other.amount(), this._currency)
  }

  subtract(other: Money): Money {
    if (this._currency !== other.currency()) {
      throw new Error('Money subtract cannot be done with different currencies')
    }
    return new Money(this._amount - other.amount(), this._currency)
  }

  multipliedBy(factor: number): Money {
    return new Money(this._amount * factor, this._currency)
  }

  dividedBy(factor: number): Money {
    return new Money(this._amount / factor, this._currency)
  }

  negative(): Money {
    return new Money(this._amount * -1, this._currency)
  }

  abs(): Money {
    return new Money(Math.abs(this._amount), this._currency)
  }

  roundDecimals(): Money {
    return new Money(roundAmount(this._amount, CURRENCY_DECIMALS), this._currency)
  }

  isZero(): boolean {
    return this._amount === 0
  }

  toCurrency(currency: Currency, rate: number): Money {
    if (this._currency === currency) {
      rate = 1
    }
    return new Money(this._amount * rate, currency)
  }

  multiply(factor: number): Money {
    return this.multipliedBy(factor)
  }

  add(other: Money): Money {
    return this.sum(other)
  }
}


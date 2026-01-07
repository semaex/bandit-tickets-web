import { Currency } from './Currency'

export class Money {
  private readonly _amount: number
  private readonly _currency: Currency

  constructor(amount: number, currency: Currency) {
    this._amount = amount
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

  amount(): number {
    return this._amount
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

  equals(other: Money): boolean {
    return this._amount === other.amount() && this._currency === other.currency()
  }

  formatted(): string {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: this._currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return formatter.format(this._amount)
  }
}


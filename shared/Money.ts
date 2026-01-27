import { Currency } from './Currency'
import { Percent } from './Percent'

/**
 * Money Value Object for float-free monetary arithmetic.
 * 
 * Internal representation:
 * - amount: number (minor units - e.g., 1050 for $10.50, always 2 decimals)
 * - currency: Currency enum
 */
export class Money {
  private readonly _amount: number
  private readonly _currency: Currency

  private constructor(amount: number, currency: Currency) {
    this._amount = amount
    this._currency = currency
  }

  /**
   * Create from integer amount (minor units).
   * Always uses 2 decimals (cents).
   */
  static fromInt(amount: number, currency: Currency): Money {
    return new Money(amount, currency)
  }

  /**
   * Create from decimal string (e.g., "10.50").
   * Always uses 2 decimals.
   */
  static fromDecimalString(decimalString: string, currency: Currency): Money {
    const trimmed = decimalString.trim()
    const isNegative = trimmed.startsWith('-')
    const cleaned = isNegative ? trimmed.substring(1) : trimmed
    
    // Split into integer and decimal parts
    const parts = cleaned.split('.')
    const integerPart = parts[0] || '0'
    let decimalPart = parts[1] || ''
    
    // Pad or truncate decimal part to 2 decimals (with rounding)
    if (decimalPart.length > 2) {
      const keepDecimals = decimalPart.substring(0, 2)
      const nextDigit = parseInt(decimalPart.charAt(2), 10)
      
      // Round half-up
      let amount = parseInt(integerPart + keepDecimals, 10)
      if (nextDigit >= 5) {
        amount += 1
      }
      return new Money(isNegative ? -amount : amount, currency)
    } else {
      decimalPart = decimalPart.padEnd(2, '0')
      const amount = parseInt(integerPart + decimalPart, 10)
      return new Money(isNegative ? -amount : amount, currency)
    }
  }

  static zero(currency: Currency): Money {
    return Money.fromInt(0, currency)
  }

  static fromArray(data: { amount: string | number; currency: string; formatted?: string }): Money {
    if (data.amount === null || data.amount === undefined || !data.currency) {
      throw new Error('Money from array must have amount and currency')
    }

    const currency = data.currency.toUpperCase() as Currency
    if (!Object.values(Currency).includes(currency)) {
      throw new Error(`Invalid currency: ${data.currency}`)
    }

    // Support both number (minor units) and string (decimal)
    if (typeof data.amount === 'number') {
      return Money.fromInt(data.amount, currency)
    }

    // String: assume decimal format
    return Money.fromDecimalString(data.amount, currency)
  }

  static clone(value: Money | null): Money | null {
    if (value === null) {
      return null
    }
    return new Money(value._amount, value._currency)
  }

  static isNull(value: Money | null): boolean {
    if (value === null) {
      return true
    }
    return value._amount === null || value._currency === null
  }

  /**
   * Get the internal integer amount (minor units).
   */
  amount(): number {
    return this._amount
  }

  /**
   * Get the decimal string representation (e.g., "10.50").
   */
  amountDecimalString(): string {
    const isNegative = this._amount < 0
    const absValue = Math.abs(this._amount)
    const valueStr = absValue.toString().padStart(3, '0')
    
    const integerPart = valueStr.substring(0, valueStr.length - 2) || '0'
    const decimalPart = valueStr.substring(valueStr.length - 2)
    
    const result = integerPart + '.' + decimalPart
    
    return isNegative ? '-' + result : result
  }

  currency(): Currency {
    return this._currency
  }

  /**
   * For backward compatibility, return as decimal number.
   * But prefer using amountDecimalString() for exact representation.
   */
  value(): number {
    return parseFloat(this.amountDecimalString())
  }

  toString(): string {
    return `${this.amountDecimalString()} ${this._currency}`
  }

  formatted(): string {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: this._currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return formatter.format(parseFloat(this.amountDecimalString()))
  }

  toArray(): { amount: number; currency: string; formatted: string } {
    return {
      amount: this._amount, // Minor units (int)
      currency: this._currency,
      formatted: this.formatted()
    }
  }

  sum(other: Money): Money {
    if (this._currency !== other.currency()) {
      throw new Error('Money sum cannot be done with different currencies')
    }

    return new Money(this._amount + other._amount, this._currency)
  }

  subtract(other: Money): Money {
    if (this._currency !== other.currency()) {
      throw new Error('Money subtract cannot be done with different currencies')
    }

    return new Money(this._amount - other._amount, this._currency)
  }

  multipliedBy(factor: number): Money {
    return new Money(this._amount * factor, this._currency)
  }

  /**
   * Multiply by a percentage.
   */
  multipliedByPercent(percent: Percent): Money {
    const result = percent.applyToMinor(this._amount)
    return new Money(result, this._currency)
  }

  dividedBy(divisor: number): Money {
    if (divisor === 0) {
      throw new Error('Division by zero')
    }

    const result = Math.round(this._amount / divisor)
    return new Money(result, this._currency)
  }

  negative(): Money {
    return new Money(-this._amount, this._currency)
  }

  abs(): Money {
    return new Money(Math.abs(this._amount), this._currency)
  }

  equalsTo(other: Money): boolean {
    if (this._currency !== other.currency()) {
      throw new Error('Money comparison cannot be done with different currencies')
    }

    return this._amount === other._amount
  }

  equals(other: Money): boolean {
    return this.equalsTo(other)
  }

  greaterThan(other: Money): boolean {
    if (this._currency !== other.currency()) {
      throw new Error('Money comparison cannot be done with different currencies')
    }
    return this._amount > other._amount
  }

  lessThan(other: Money): boolean {
    if (this._currency !== other.currency()) {
      throw new Error('Money comparison cannot be done with different currencies')
    }
    return this._amount < other._amount
  }

  isZero(): boolean {
    return this._amount === 0
  }

  isPositive(): boolean {
    return this._amount > 0
  }

  isNegative(): boolean {
    return this._amount < 0
  }

  toCurrency(currency: Currency, rate: number): Money {
    if (this._currency === currency) {
      return new Money(this._amount, currency)
    }

    const result = Math.round(this._amount * rate)
    return new Money(result, currency)
  }

  // Backward compatibility methods
  multiply(factor: number): Money {
    return this.multipliedBy(factor)
  }

  add(other: Money): Money {
    return this.sum(other)
  }

  // Legacy method for backward compatibility
  decimals(): number {
    return 2 // Always 2 decimals
  }
}

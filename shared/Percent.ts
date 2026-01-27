/**
 * Represents a percentage value using basis points (2 decimal precision).
 * 1 basis point = 0.01% (1/100 of a percent)
 * 100 basis points = 1%
 * 10,000 basis points = 100%
 * 
 * This value object is float-free and uses integer arithmetic only.
 */
export class Percent {
  private readonly _basisPoints: number

  private constructor(basisPoints: number) {
    if (basisPoints < 0) {
      throw new Error('Basis points cannot be negative')
    }

    if (basisPoints > 10000) {
      throw new Error('Basis points cannot exceed 10000 (100%)')
    }

    this._basisPoints = basisPoints
  }

  /**
   * Create from basis points (1 basis point = 0.01%).
   */
  static fromInt(basisPoints: number): Percent {
    return new Percent(basisPoints)
  }

  /**
   * Create from a percentage string (e.g., "10", "10.5", "10.50" for 10.50%).
   * Maximum 2 decimal places allowed.
   */
  static fromString(percent: string): Percent {
    const trimmed = percent.trim()

    if (trimmed === '') {
      throw new Error('Percent string cannot be empty')
    }

    // Remove optional % sign
    const cleanPercent = trimmed.endsWith('%') ? trimmed.slice(0, -1) : trimmed

    // Validate format: optional minus, digits, optional dot and up to 2 decimal digits
    if (!/^-?\d+(\.\d{1,2})?$/.test(cleanPercent)) {
      throw new Error('Invalid percent format. Expected format: "10" or "10.5" or "10.50" (max 2 decimals)')
    }

    // Parse string to basis points
    const isNegative = cleanPercent.startsWith('-')
    const cleaned = isNegative ? cleanPercent.substring(1) : cleanPercent
    
    const parts = cleaned.split('.')
    const integerPart = parts[0]
    let decimalPart = parts[1] || ''
    
    // Pad or truncate decimal part to 2 decimals (with rounding)
    if (decimalPart.length > 2) {
      const keepDecimals = decimalPart.substring(0, 2)
      const nextDigit = parseInt(decimalPart.charAt(2), 10)
      
      let basisPoints = parseInt(integerPart + keepDecimals, 10)
      if (nextDigit >= 5) {
        basisPoints += 1
      }
      return new Percent(isNegative ? -basisPoints : basisPoints)
    } else {
      decimalPart = decimalPart.padEnd(2, '0')
      const basisPoints = parseInt(integerPart + decimalPart, 10)
      return new Percent(isNegative ? -basisPoints : basisPoints)
    }
  }

  /**
   * Get the value in basis points.
   */
  toBasisPoints(): number {
    return this._basisPoints
  }

  /**
   * Check if this percent is zero.
   */
  isZero(): boolean {
    return this._basisPoints === 0
  }

  /**
   * Check if this percent is positive (greater than zero).
   */
  isPositive(): boolean {
    return this._basisPoints > 0
  }

  /**
   * Apply this percent to a money amount expressed in minor units (cents).
   * Uses integer arithmetic only with round-half-up behavior.
   * 
   * Example: 10.50% of 1000 cents = 105 cents
   */
  applyToMinor(amountMinor: number): number {
    // Calculate: (amountMinor * basisPoints) / 10000
    // Add 5000 before dividing by 10000 to achieve round-half-up
    const product = amountMinor * this._basisPoints
    const roundedResult = Math.floor((product + 5000) / 10000)

    return roundedResult
  }

  /**
   * Check if this percent is less than or equal to another.
   */
  lessThanOrEqual(other: Percent): boolean {
    return this._basisPoints <= other._basisPoints
  }

  /**
   * Check if this percent is greater than or equal to another.
   */
  greaterThanOrEqual(other: Percent): boolean {
    return this._basisPoints >= other._basisPoints
  }

  /**
   * Check if this percent equals another.
   */
  equals(other: Percent): boolean {
    return this._basisPoints === other._basisPoints
  }

  /**
   * Get human-readable string representation (e.g., "10.50").
   */
  toString(): string {
    const isNegative = this._basisPoints < 0
    const absValue = Math.abs(this._basisPoints)
    const valueStr = absValue.toString().padStart(3, '0')
    
    const integerPart = valueStr.substring(0, valueStr.length - 2) || '0'
    const decimalPart = valueStr.substring(valueStr.length - 2)
    
    const result = integerPart + '.' + decimalPart
    
    return isNegative ? '-' + result : result
  }

  /**
   * Convert to array representation.
   */
  toArray(): { value: number; decimals: number; formatted: string } {
    return {
      value: this._basisPoints,
      decimals: 2,
      formatted: this.toString()
    }
  }
}

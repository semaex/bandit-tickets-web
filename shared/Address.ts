import { CountryCode } from './CountryCode'

export interface AddressJson {
  street: string
  city: string
  region?: string | null
  postalCode: string
  countryCode: string
}

export class Address {
  private readonly _street: string
  private readonly _city: string
  private readonly _region: string | null
  private readonly _postalCode: string
  private readonly _countryCode: CountryCode

  constructor(
    street: string,
    city: string,
    region: string | null,
    postalCode: string,
    countryCode: CountryCode
  ) {
    if (!street || street.trim().length === 0) {
      throw new Error('Address street is required')
    }

    if (!city || city.trim().length === 0) {
      throw new Error('Address city is required')
    }

    if (!postalCode || postalCode.trim().length === 0) {
      throw new Error('Address postalCode is required')
    }

    this._street = street.trim()
    this._city = city.trim()
    this._region = region ? region.trim() : null
    this._postalCode = postalCode.trim()
    this._countryCode = countryCode
  }

  static fromArray(data: AddressJson): Address {
    return new Address(
      data.street,
      data.city,
      data.region ?? null,
      data.postalCode,
      CountryCode.fromString(data.countryCode)
    )
  }

  street(): string {
    return this._street
  }

  city(): string {
    return this._city
  }

  region(): string | null {
    return this._region
  }

  postalCode(): string {
    return this._postalCode
  }

  countryCode(): CountryCode {
    return this._countryCode
  }

  equals(other: Address): boolean {
    return (
      this._street === other.street() &&
      this._city === other.city() &&
      this._region === other.region() &&
      this._postalCode === other.postalCode() &&
      this._countryCode.equals(other.countryCode())
    )
  }

  toArray(): {
    street: string
    city: string
    region: string | null
    postalCode: string
    countryCode: string
  } {
    return {
      street: this._street,
      city: this._city,
      region: this._region,
      postalCode: this._postalCode,
      countryCode: this._countryCode.value()
    }
  }
}


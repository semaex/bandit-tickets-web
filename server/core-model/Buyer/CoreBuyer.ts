import { Uuid } from '../../../shared/Uuid'
import { Email } from '../../../shared/Email'
import { Locale } from '../../../shared/Locale'
import { CountryCode } from '../../../shared/CountryCode'
import { CoreBuyerGender } from './CoreBuyerGender'

export class CoreBuyer {
  constructor(
    public readonly id: Uuid,
    public readonly email: Email,
    public readonly locale: Locale,
    public readonly identityId: Uuid | null = null,
    public readonly firstName: string | null = null,
    public readonly lastName: string | null = null,
    public readonly countryCode: CountryCode | null = null,
    public readonly postalCode: string | null = null,
    public readonly gender: CoreBuyerGender | null = null,
    public readonly birthdate: Date | null = null,
    public readonly marketingOptIn: boolean = false,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}

  get fullName(): string | null {
    if (!this.firstName && !this.lastName) {
      return null
    }
    return [this.firstName, this.lastName].filter(Boolean).join(' ')
  }
}

import { CountryCode } from '../../../shared/CountryCode'
import { CoreBuyerGender } from '../Buyer/CoreBuyerGender'

export class CoreOrderBuyerInfo {
  constructor(
    public readonly firstName: string | null = null,
    public readonly lastName: string | null = null,
    public readonly countryCode: CountryCode | null = null,
    public readonly postalCode: string | null = null,
    public readonly gender: CoreBuyerGender | null = null,
    public readonly birthdate: Date | null = null,
    public readonly deviceUserAgent: string | null = null,
    public readonly deviceType: string | null = null,
    public readonly deviceOs: string | null = null,
    public readonly deviceBrowser: string | null = null
  ) {}
}

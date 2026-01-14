import { CoreBuyer } from './CoreBuyer'
import { CoreBuyerGender } from './CoreBuyerGender'
import { Uuid } from '../../../shared/Uuid'
import { Email } from '../../../shared/Email'
import { Locale } from '../../../shared/Locale'
import { CountryCode } from '../../../shared/CountryCode'

export interface CoreBuyerJson {
  id: string
  email: string
  locale: string
  identityId: string | null
  firstName: string | null
  lastName: string | null
  countryCode: string | null
  postalCode: string | null
  gender: string | null
  birthdate: string | null
  marketingOptIn: boolean
  createdAt: string
  updatedAt: string
}

export function coreBuyerFromCoreApiAdapter(json: CoreBuyerJson): CoreBuyer {
  return new CoreBuyer(
    Uuid.fromString(json.id),
    Email.fromString(json.email),
    Locale.fromString(json.locale),
    json.identityId ? Uuid.fromString(json.identityId) : null,
    json.firstName,
    json.lastName,
    json.countryCode ? CountryCode.fromString(json.countryCode) : null,
    json.postalCode,
    json.gender ? (json.gender as CoreBuyerGender) : null,
    json.birthdate ? new Date(json.birthdate) : null,
    json.marketingOptIn,
    new Date(json.createdAt),
    new Date(json.updatedAt)
  )
}

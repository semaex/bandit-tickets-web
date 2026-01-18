import { CorePromoterProfile } from './CorePromoterProfile'
import { Uuid } from '../../../shared/Uuid'
import { Url } from '../../../shared/Url'
import { Email } from '../../../shared/Email'
import { PhoneNumber } from '../../../shared/PhoneNumber'
import { BuyerFeeMode } from '../../../shared/BuyerFeeMode'
import { StringMultilanguage } from '../../../shared/StringMultilanguage'
import { CorePromoterProfileEntityType } from './CorePromoterProfileEntityType'

export interface CorePromoterProfileJson {
  id: string
  promoterId: string
  description: string | null
  entityType: CorePromoterProfileEntityType
  brandName: string
  logoImage: string | null
  logoImageUrl: string | null
  legalName: string
  taxId: string
  address: Record<string, any> | null
  supportEmail: string | null
  supportPhone: string | null
  terms: Record<string, string> | null
  defaultBuyerFeeMode: string | null
  defaultPromoterAgreementId: string | null
  forcedPromoterAgreementId: string | null
  paymentGatewayId: string | null
  createdAt: string
  updatedAt: string
}

export function corePromoterProfileFromJson(json: CorePromoterProfileJson): CorePromoterProfile {
  return new CorePromoterProfile(
    Uuid.fromString(json.id),
    Uuid.fromString(json.promoterId),
    json.description,
    json.entityType,
    json.brandName,
    json.logoImage,
    json.logoImageUrl ? Url.fromString(json.logoImageUrl) : null,
    json.legalName,
    json.taxId,
    json.address,
    json.supportEmail ? Email.fromString(json.supportEmail) : null,
    json.supportPhone ? PhoneNumber.fromString(json.supportPhone) : null,
    json.terms ? StringMultilanguage.fromArray(json.terms) : null,
    json.defaultBuyerFeeMode ? (json.defaultBuyerFeeMode as BuyerFeeMode) : null,
    json.defaultPromoterAgreementId ? Uuid.fromString(json.defaultPromoterAgreementId) : null,
    json.forcedPromoterAgreementId ? Uuid.fromString(json.forcedPromoterAgreementId) : null,
    json.paymentGatewayId ? Uuid.fromString(json.paymentGatewayId) : null,
    new Date(json.createdAt),
    new Date(json.updatedAt)
  )
}


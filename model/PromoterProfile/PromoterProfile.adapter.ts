import { PromoterProfile } from './PromoterProfile'
import { Uuid } from '../Shared/Uuid'
import { Url } from '../Shared/Url'
import { Email } from '../Shared/Email'
import { PhoneNumber } from '../Shared/PhoneNumber'
import { BuyerFeeMode } from '../Shared/BuyerFeeMode'
import { StringMultilanguage } from '../Shared/StringMultilanguage'
import { OrganizationType } from './OrganizationType'

export interface ApiPromoterProfile {
  id: string
  promoterId: string
  description: string | null
  entityType: OrganizationType
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
  paymentGatewaySettings: Record<string, any> | null
  createdAt: string
  updatedAt: string
}

export function promoterProfileFromApiAdapter(item: ApiPromoterProfile): PromoterProfile {
  return new PromoterProfile(
    Uuid.fromString(item.id),
    Uuid.fromString(item.promoterId),
    item.description,
    item.entityType,
    item.brandName,
    item.logoImage,
    item.logoImageUrl ? Url.fromString(item.logoImageUrl) : null,
    item.legalName,
    item.taxId,
    item.address,
    item.supportEmail ? Email.fromString(item.supportEmail) : null,
    item.supportPhone ? PhoneNumber.fromString(item.supportPhone) : null,
    item.terms ? StringMultilanguage.fromArray(item.terms) : null,
    item.defaultBuyerFeeMode ? (item.defaultBuyerFeeMode as BuyerFeeMode) : null,
    item.defaultPromoterAgreementId ? Uuid.fromString(item.defaultPromoterAgreementId) : null,
    item.forcedPromoterAgreementId ? Uuid.fromString(item.forcedPromoterAgreementId) : null,
    item.paymentGatewaySettings,
    new Date(item.createdAt),
    new Date(item.updatedAt)
  )
}



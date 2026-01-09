import { PromoterProfileView } from './PromoterProfileView'
import type { CorePromoterProfile } from '../../server/core-model/PromoterProfile/CorePromoterProfile'
import { Uuid } from '../../shared/Uuid'
import { Address } from '../../shared/Address'
import { CorePromoterProfileEntityType } from '../../server/core-model/PromoterProfile/CorePromoterProfileEntityType'

type AddressJson = {
  street: string
  city: string
  region?: string | null
  postalCode: string
  countryCode: string
}

export interface PromoterProfileViewJson {
  id: string
  promoterId: string
  entityType: string
  brandName: string
  logoImage: string | null
  legalName: string
  taxId: string
  address: AddressJson | null
}

export function promoterProfileViewFromJson(json: PromoterProfileViewJson): PromoterProfileView {
  return new PromoterProfileView(
    Uuid.fromString(json.id),
    Uuid.fromString(json.promoterId),
    json.entityType as CorePromoterProfileEntityType,
    json.brandName,
    json.logoImage,
    json.legalName,
    json.taxId,
    json.address ? Address.fromArray(json.address) : null
  )
}

export function promoterProfileViewToJson(promoterProfileView: PromoterProfileView): PromoterProfileViewJson {
  return {
    id: promoterProfileView.id.toString(),
    promoterId: promoterProfileView.promoterId.toString(),
    entityType: promoterProfileView.entityType,
    brandName: promoterProfileView.brandName,
    logoImage: promoterProfileView.logoImage,
    legalName: promoterProfileView.legalName,
    taxId: promoterProfileView.taxId,
    address: promoterProfileView.address ? promoterProfileView.address.toArray() : null
  }
}

export function promoterProfileViewFromCorePromoterProfileAdapter(corePromoterProfile: CorePromoterProfile): PromoterProfileView {
    return new PromoterProfileView(
      corePromoterProfile.id,
      corePromoterProfile.promoterId,
      corePromoterProfile.entityType,
      corePromoterProfile.brandName,
      corePromoterProfile.logoImage,
      corePromoterProfile.legalName,
      corePromoterProfile.taxId,
      corePromoterProfile.address ? Address.fromArray(corePromoterProfile.address as AddressJson) : null
    )
  }


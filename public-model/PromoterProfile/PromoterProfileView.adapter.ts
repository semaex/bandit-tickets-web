import { PromoterProfileView } from './PromoterProfileView'
import type { CorePromoterProfile } from '../../server/core-model/PromoterProfile/CorePromoterProfile'
import { Uuid } from '../../shared/Uuid'
import { CorePromoterProfileEntityType } from '../../server/core-model/PromoterProfile/CorePromoterProfileEntityType'

export interface PromoterProfileViewJson {
  id: string
  promoterId: string
  entityType: string
  brandName: string
  logoImage: string | null
  legalName: string
  taxId: string
  address: Record<string, any> | null
  supportEmail: string | null
  supportPhone: string | null
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
    json.address,
    json.supportEmail,
    json.supportPhone
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
    address: promoterProfileView.address,
    supportEmail: promoterProfileView.supportEmail,
    supportPhone: promoterProfileView.supportPhone
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
      corePromoterProfile.address,
      corePromoterProfile.supportEmail?.toString() ?? null,
      corePromoterProfile.supportPhone?.toString() ?? null
    )
  }


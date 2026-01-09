import { PromoterProfileView } from './PromoterProfileView'
import type { CorePromoterProfile } from '../../server/core-model/PromoterProfile/CorePromoterProfile'
import { Uuid } from '../../shared/Uuid'

export interface PromoterProfileViewJson {
  id: string
  brandName: string
}

export function promoterProfileViewFromJson(json: PromoterProfileViewJson): PromoterProfileView {
  return new PromoterProfileView(
    Uuid.fromString(json.id),
    json.brandName
  )
}

export function promoterProfileViewToJson(promoterProfileView: PromoterProfileView): PromoterProfileViewJson {
  return {
    id: promoterProfileView.id.toString(),
    brandName: promoterProfileView.brandName
  }
}

export function promoterProfileViewFromCorePromoterProfileAdapter(corePromoterProfile: CorePromoterProfile): PromoterProfileView {
    return new PromoterProfileView(
      corePromoterProfile.id,
      corePromoterProfile.brandName
    )
  }


import type { PromoterProfile } from './PromoterProfile'
import type { ApiPromoterProfile } from './PromoterProfile.adapter'
import { promoterProfileFromApiAdapter } from './PromoterProfile.adapter'

export async function findPromoterProfileById(id: string): Promise<PromoterProfile> {
  return $fetch<{ promoterProfile: ApiPromoterProfile }>(`/api/promoter-profiles/${id}`).then(
    (data: { promoterProfile: ApiPromoterProfile }) => {
      return promoterProfileFromApiAdapter(data.promoterProfile)
    }
  )
}

import type { PromoterProfileView } from './PromoterProfileView'
import type { PromoterProfileViewJson } from './PromoterProfileView.adapter'
import { promoterProfileViewFromJson } from './PromoterProfileView.adapter'

export async function findPromoterProfileViewById(id: string): Promise<PromoterProfileView> {
  return $fetch<PromoterProfileViewJson>(`/api/promoter-profiles/${id}`).then(
    (promoterProfileViewJson: PromoterProfileViewJson) => {
      return promoterProfileViewFromJson(promoterProfileViewJson)
    }
  )
}


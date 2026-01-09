import type { PromoterProfileView } from './PromoterProfileView'
import type { PromoterProfileViewJson } from './PromoterProfileView.adapter'
import { promoterProfileViewFromJson } from './PromoterProfileView.adapter'
import { bffApiClient } from '../../server/api-client/bff'

export async function findPromoterProfileViewById(id: string): Promise<PromoterProfileView> {
  const promoterProfileViewJson = await bffApiClient.get<PromoterProfileViewJson>(`/promoter-profiles/${id}`)
  return promoterProfileViewFromJson(promoterProfileViewJson)
}


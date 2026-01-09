import type { CorePromoterProfile } from './CorePromoterProfile'
import { corePromoterProfileFromJson } from './CorePromoterProfile.adapter'
import type { CorePromoterProfileJson } from './CorePromoterProfile.adapter'

export async function findCorePromoterProfileById(id: string): Promise<CorePromoterProfile> {
  return $fetch<{ promoterProfile: CorePromoterProfileJson }>(`/api/promoter-profiles/${id}`).then(
    (data: { promoterProfile: CorePromoterProfileJson }) => {
      return corePromoterProfileFromJson(data.promoterProfile)
    }
  )
}


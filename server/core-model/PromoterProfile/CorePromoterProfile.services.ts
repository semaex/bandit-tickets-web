import type { CorePromoterProfile } from './CorePromoterProfile'
import { corePromoterProfileFromJson } from './CorePromoterProfile.adapter'
import type { CorePromoterProfileJson } from './CorePromoterProfile.adapter'
import { coreApiClient } from '../../api-client/core'

const BASE_URL = '/api/v1/catalog/promoter-profiles'

export async function findCorePromoterProfileById(id: string): Promise<CorePromoterProfile> {
  const endpoint = `${BASE_URL}/${id}`
  return coreApiClient.get<CorePromoterProfileJson>(endpoint)
    .then(response => corePromoterProfileFromJson(response))
}


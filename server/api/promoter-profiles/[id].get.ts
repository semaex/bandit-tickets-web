import { corePromoterProfileFromJson, type CorePromoterProfileJson } from '../../core-model/PromoterProfile/CorePromoterProfile.adapter'
import { promoterProfileViewFromCorePromoterProfileAdapter, promoterProfileViewToJson } from '../../../public-model/PromoterProfile/PromoterProfileView.adapter'
import { coreApiClient, handleCoreApiCall } from '../../api-client/core'
import { getRouterParamOrFail } from '../../utils/params'

const BASE_URL = '/api/v1/catalog/promoter-profiles'

export default defineEventHandler(async (event) => {
  const id = getRouterParamOrFail(event, 'id')

  return handleCoreApiCall(async () => {
    const response = await coreApiClient.get<{ promoterProfile: CorePromoterProfileJson }>(`${BASE_URL}/${id}`)

    const corePromoterProfile = corePromoterProfileFromJson(response.promoterProfile)
    const promoterProfileView = promoterProfileViewFromCorePromoterProfileAdapter(corePromoterProfile)
    return promoterProfileViewToJson(promoterProfileView)
  }, 'fetch promoter profile from core')
})



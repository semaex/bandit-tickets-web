import { promoterProfileViewFromCorePromoterProfileAdapter, promoterProfileViewToJson } from '../../../public-model/PromoterProfile/PromoterProfileView.adapter'
import { handleCoreApiCall } from '../../api-client/core'
import { getRouterParamOrFail } from '../../utils/params'
import { findCorePromoterProfileById } from "../../core-model/PromoterProfile/CorePromoterProfile.services"

export default defineEventHandler(async (event) => {
  const promoterProfileId = getRouterParamOrFail(event, 'promoterProfileId')

  return handleCoreApiCall(async () => {
    
    const corePromoterProfile = await findCorePromoterProfileById(promoterProfileId)
    const promoterProfileView = promoterProfileViewFromCorePromoterProfileAdapter(corePromoterProfile)
    return promoterProfileViewToJson(promoterProfileView)
  }, 'fetch promoter profile from core')
})



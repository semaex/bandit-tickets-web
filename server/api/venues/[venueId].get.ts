import { findCoreVenueById } from '../../core-model/Venue/CoreVenue.services'
import { venueViewFromCoreVenueAdapter, venueViewToJson } from '../../../public-model/Venue/VenueView.adapter'
import { handleCoreApiCall } from '../../api-client/core'
import { getRouterParamOrFail } from '../../utils/params'

export default defineEventHandler(async (event) => {
  const venueId = getRouterParamOrFail(event, 'venueId')

  return handleCoreApiCall(async () => {
    const coreVenue = await findCoreVenueById(venueId)
    const venueView = venueViewFromCoreVenueAdapter(coreVenue)
    return venueViewToJson(venueView)
  }, 'fetch venue from core')
})


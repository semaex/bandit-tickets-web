import type { CoreVenue } from './CoreVenue'
import { coreVenueFromCoreApiAdapter } from './CoreVenue.adapter'
import type { CoreVenueJson } from './CoreVenue.adapter'
import { coreApiClient } from '../../api-client/core'

const BASE_URL = '/api/v1/catalog/venues'

export function findCoreVenueById(id: string): Promise<CoreVenue> {
  const endpoint = `${BASE_URL}/${id}`
  return coreApiClient.get<CoreVenueJson >(endpoint)
    .then(response => coreVenueFromCoreApiAdapter(response))
}

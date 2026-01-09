import type { VenueView } from './VenueView'
import type { VenueViewJson } from './VenueView.adapter'
import { venueViewFromJson } from './VenueView.adapter'
import { bffApiClient } from '../../server/api-client/bff'

export async function findVenueViewById(id: string): Promise<VenueView> {
  const venueViewJson = await bffApiClient.get<VenueViewJson>(`/venues/${id}`)
  return venueViewFromJson(venueViewJson)
}


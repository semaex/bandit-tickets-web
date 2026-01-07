import type { Venue } from './Venue'
import { venueFromApiAdapter } from './Venue.adapter'
import type { ApiVenue } from './Venue.adapter'

export async function findVenueById(id: string): Promise<Venue> {
  return $fetch<{ venue: ApiVenue }>(`/api/venues/${id}`).then((data: { venue: ApiVenue }) => {
    return venueFromApiAdapter(data.venue)
  })
}


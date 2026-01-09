import type { VenueView } from './VenueView'
import type { VenueViewJson } from './VenueView.adapter'
import { venueViewFromJson } from './VenueView.adapter'

export async function findVenueViewById(id: string): Promise<VenueView> {
  return $fetch<VenueViewJson>(`/api/venues/${id}`).then((venueViewJson: VenueViewJson) => {
    return venueViewFromJson(venueViewJson)
  })
}


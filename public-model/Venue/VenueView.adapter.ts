import { VenueView } from './VenueView'
import type { CoreVenue } from '../../server/core-model/Venue/CoreVenue'
import { Uuid } from '../../shared/Uuid'
import { CountryCode } from '../../shared/CountryCode'
import { Coords } from '../../shared/Coords'

export interface VenueViewJson {
  id: string
  name: string
  address: string | null
  city: string | null
  countryCode: string | null
  coords: { latitude: number; longitude: number } | null
}

export function venueViewFromJson(json: VenueViewJson): VenueView {
  return new VenueView(
    Uuid.fromString(json.id),
    json.name,
    json.address,
    json.city,
    json.countryCode ? CountryCode.fromString(json.countryCode) : null,
    json.coords ? Coords.fromArray(json.coords) : null
  )
}

export function venueViewToJson(venueView: VenueView): VenueViewJson {
  return {
    id: venueView.id.toString(),
    name: venueView.name,
    address: venueView.address,
    city: venueView.city,
    countryCode: venueView.countryCode?.toString() || null,
    coords: venueView.coords ? {
      latitude: venueView.coords.latitude(),
      longitude: venueView.coords.longitude()
    } : null
  }
}

export function venueViewFromCoreVenueAdapter(coreVenue: CoreVenue): VenueView {
  return new VenueView(
      coreVenue.id,
      coreVenue.name,
      coreVenue.address,
      coreVenue.city,
      coreVenue.countryCode,
      coreVenue.coords
  )
}

import { CoreVenue } from './CoreVenue'
import { Uuid } from '../../../shared/Uuid'
import { CountryCode } from '../../../shared/CountryCode'
import { Coords } from '../../../shared/Coords'
import { Url } from '../../../shared/Url'

export interface CoreVenueJson {
  id: string
  name: string
  promoterId: string | null
  address: string | null
  city: string | null
  countryCode: string | null
  coords: { latitude: number; longitude: number } | null
  image: string | null
  capacity: number | null
  web: string | null
  entryAllowedTo: string | null
  createdAt: string
  updatedAt: string
}

export function coreVenueFromCoreApiAdapter(coreVenueJson: CoreVenueJson): CoreVenue {
  return new CoreVenue(
    Uuid.fromString(coreVenueJson.id),
    coreVenueJson.name,
    coreVenueJson.promoterId ? Uuid.fromString(coreVenueJson.promoterId) : null,
    coreVenueJson.address,
    coreVenueJson.city,
    coreVenueJson.countryCode ? CountryCode.fromString(coreVenueJson.countryCode) : null,
    coreVenueJson.coords ? Coords.fromArray(coreVenueJson.coords) : null,
    coreVenueJson.image,
    coreVenueJson.capacity,
    coreVenueJson.web ? Url.fromString(coreVenueJson.web) : null,
    coreVenueJson.entryAllowedTo,
    new Date(coreVenueJson.createdAt),
    new Date(coreVenueJson.updatedAt)
  )
}


import { Venue } from './Venue'
import { Uuid } from '../Shared/Uuid'
import { CountryCode } from '../Shared/CountryCode'
import { Coords } from '../Shared/Coords'
import { Url } from '../Shared/Url'

export interface ApiVenue {
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

export function venueFromApiAdapter(item: ApiVenue): Venue {
  return new Venue(
    Uuid.fromString(item.id),
    item.name,
    item.promoterId ? Uuid.fromString(item.promoterId) : null,
    item.address,
    item.city,
    item.countryCode ? CountryCode.fromString(item.countryCode) : null,
    item.coords ? Coords.fromArray(item.coords) : null,
    item.image,
    item.capacity,
    item.web ? Url.fromString(item.web) : null,
    item.entryAllowedTo,
    new Date(item.createdAt),
    new Date(item.updatedAt)
  )
}


import { VenueListView } from './VenueListView'
import type { CoreVenue } from '../../server/core-model/Venue/CoreVenue'
import type { CoreVenueSummaryJson } from '../../server/core-model/Venue/CoreVenue.services'
import { Uuid } from '../../shared/Uuid'
import { CountryCode } from '../../shared/CountryCode'

export interface VenueListViewJson {
  id: string
  name: string
  city: string | null
  countryCode: string | null
}

export function venueListViewFromCoreVenueAdapter(coreVenue: CoreVenue): VenueListView {
  return new VenueListView(
    coreVenue.id,
    coreVenue.name,
    coreVenue.city,
    coreVenue.countryCode
  )
}

export function venueListViewFromCoreVenueSummaryAdapter(summary: CoreVenueSummaryJson): VenueListView {
  return new VenueListView(
    Uuid.fromString(summary.id),
    summary.name,
    summary.city,
    summary.countryCode ? CountryCode.fromString(summary.countryCode) : null
  )
}

export function venueListViewToJson(view: VenueListView): VenueListViewJson {
  return {
    id: view.id.toString(),
    name: view.name,
    city: view.city,
    countryCode: view.countryCode?.toString() ?? null
  }
}

export function venueListViewFromJson(json: VenueListViewJson): VenueListView {
  return new VenueListView(
    Uuid.fromString(json.id),
    json.name,
    json.city,
    json.countryCode ? CountryCode.fromString(json.countryCode) : null
  )
}


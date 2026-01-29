import { EventListView } from './EventListView'
import type { CoreEvent } from '../../server/core-model/Event/CoreEvent'
import { Uuid } from '../../shared/Uuid'
import { StringMultilanguage } from '../../shared/StringMultilanguage'
import { Url } from '../../shared/Url'
import { CountryCode } from '../../shared/CountryCode'
import { Money } from '../../shared/Money'
import type { Paginated } from '../../shared/Pagination'
import type { VenueListView } from '../Venue/VenueListView'
import type { VenueListViewJson } from '../Venue/VenueListView.adapter'
import { venueListViewFromJson, venueListViewToJson } from '../Venue/VenueListView.adapter'

export interface EventListViewJson {
  id: string
  slug: string
  dates: string[]
  title: Record<string, string> | null
  subtitle: Record<string, string> | null
  imageUrl: string | null
  countryCode: string | null
  isSoldOut: boolean
  musicGenres: string[]
  venue: VenueListViewJson | null
  fromPrice: { amount: number; currency: string; formatted?: string } | null
}

export function eventListViewFromCoreEventAdapter(
  coreEvent: CoreEvent,
  extras: { venue?: VenueListView | null; fromPrice?: Money | null } = {}
): EventListView {
  return new EventListView(
    coreEvent.id,
    coreEvent.slug,
    coreEvent.dates,
    coreEvent.title,
    coreEvent.subtitle,
    coreEvent.imageUrl,
    coreEvent.countryCode,
    coreEvent.isSoldOut,
    coreEvent.musicGenres,
    extras.venue ?? null,
    extras.fromPrice ?? null
  )
}

export function eventListViewToJson(view: EventListView): EventListViewJson {
  return {
    id: view.id.toString(),
    slug: view.slug,
    dates: view.dates.map(d => d.toISOString()),
    title: view.title.toArray(),
    subtitle: view.subtitle?.toArray() ?? null,
    imageUrl: view.imageUrl?.toString() ?? null,
    countryCode: view.countryCode?.toString() ?? null,
    isSoldOut: view.isSoldOut,
    musicGenres: view.musicGenres,
    venue: view.venue ? venueListViewToJson(view.venue) : null,
    fromPrice: view.fromPrice ? view.fromPrice.toArray() : null
  }
}

export function eventListViewFromJson(json: EventListViewJson): EventListView {
  return new EventListView(
    Uuid.fromString(json.id),
    json.slug,
    json.dates.map(date => new Date(date)),
    StringMultilanguage.fromArray(json.title),
    json.subtitle ? StringMultilanguage.fromArray(json.subtitle) : null,
    json.imageUrl ? Url.fromString(json.imageUrl) : null,
    json.countryCode ? CountryCode.fromString(json.countryCode) : null,
    json.isSoldOut,
    json.musicGenres,
    json.venue ? venueListViewFromJson(json.venue) : null,
    json.fromPrice ? Money.fromArray(json.fromPrice) : null
  )
}

/** Paginated list of events (API response shape). */
export type EventListPage = Paginated<EventListViewJson>

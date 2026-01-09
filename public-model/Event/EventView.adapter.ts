import { EventView } from './EventView'
import type { CoreEvent } from '../../server/core-model/Event/CoreEvent'
import { Uuid } from '../../shared/Uuid'
import { StringMultilanguage } from '../../shared/StringMultilanguage'
import { Url } from '../../shared/Url'
import { CountryCode } from '../../shared/CountryCode'
import { Timezone } from '../../shared/Timezone'
import { Time } from '../../shared/Time'

export interface EventViewJson {
  id: string
  dates: string[]
  title: Record<string, string> | null
  slug: string
  countryCode: string | null
  imageUrl: string | null
  subtitle: Record<string, string> | null
  description: Record<string, string> | null
  terms: Record<string, string> | null
  venueId: string | null
  timezone: string | null
  startTime: string | null
  doorsOpenTime: string | null
  isSoldOut: boolean
  promoterProfileId: string | null
  ticketSaleClosesAt: string | null
  musicGenres: string[]
  hasMinorsPolicy: boolean
  minorsPolicyDescription: Record<string, string> | null
  minorsPolicyAthorizationFileId: string | null
}

export function eventViewFromCoreEventAdapter(coreEvent: CoreEvent): EventView {
  return new EventView(
    coreEvent.id,
    coreEvent.dates,
    coreEvent.title,
    coreEvent.slug,
    coreEvent.countryCode,
    coreEvent.imageUrl,
    coreEvent.subtitle,
    coreEvent.description,
    coreEvent.terms,
    coreEvent.venueId,
    coreEvent.timezone,
    coreEvent.startTime,
    coreEvent.doorsOpenTime,
    coreEvent.isSoldOut,
    coreEvent.promoterProfileId,
    coreEvent.ticketSaleClosesAt,
    coreEvent.musicGenres,
    coreEvent.hasMinorsPolicy,
    coreEvent.minorsPolicyDescription,
    coreEvent.minorsPolicyAthorizationFileId
  )
}

export function eventViewFromJson(json: EventViewJson): EventView {
  return new EventView(
    Uuid.fromString(json.id),
    json.dates.map(date => new Date(date)),
    StringMultilanguage.fromArray(json.title),
    json.slug,
    json.countryCode ? CountryCode.fromString(json.countryCode) : null,
    json.imageUrl ? Url.fromString(json.imageUrl) : null,
    json.subtitle ? StringMultilanguage.fromArray(json.subtitle) : null,
    json.description ? StringMultilanguage.fromArray(json.description) : null,
    json.terms ? StringMultilanguage.fromArray(json.terms) : null,
    json.venueId ? Uuid.fromString(json.venueId) : null,
    json.timezone ? Timezone.fromString(json.timezone) : null,
    json.startTime ? Time.fromString(json.startTime) : null,
    json.doorsOpenTime ? Time.fromString(json.doorsOpenTime) : null,
    json.isSoldOut,
    json.promoterProfileId ? Uuid.fromString(json.promoterProfileId) : null,
    json.ticketSaleClosesAt ? new Date(json.ticketSaleClosesAt) : null,
    json.musicGenres,
    json.hasMinorsPolicy,
    json.minorsPolicyDescription ? StringMultilanguage.fromArray(json.minorsPolicyDescription) : null,
    json.minorsPolicyAthorizationFileId ? Uuid.fromString(json.minorsPolicyAthorizationFileId) : null
  )
}

export function eventViewToJson(eventView: EventView): EventViewJson {
  return {
    id: eventView.id.toString(),
    dates: eventView.dates.map(d => d.toISOString()),
    title: eventView.title.toArray(),
    slug: eventView.slug,
    countryCode: eventView.countryCode?.toString() || null,
    imageUrl: eventView.imageUrl?.toString() || null,
    subtitle: eventView.subtitle?.toArray() || null,
    description: eventView.description?.toArray() || null,
    terms: eventView.terms?.toArray() || null,
    venueId: eventView.venueId?.toString() || null,
    timezone: eventView.timezone?.toString() || null,
    startTime: eventView.startTime?.toString() || null,
    doorsOpenTime: eventView.doorsOpenTime?.toString() || null,
    isSoldOut: eventView.isSoldOut,
    promoterProfileId: eventView.promoterProfileId?.toString() || null,
    ticketSaleClosesAt: eventView.ticketSaleClosesAt?.toISOString() || null,
    musicGenres: eventView.musicGenres,
    hasMinorsPolicy: eventView.hasMinorsPolicy,
    minorsPolicyDescription: eventView.minorsPolicyDescription?.toArray() || null,
    minorsPolicyAthorizationFileId: eventView.minorsPolicyAthorizationFileId?.toString() || null
  }
}


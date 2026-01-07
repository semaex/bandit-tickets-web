import { Event } from './Event'
import { StringMultilanguage } from '../Shared/StringMultilanguage'
import { EventPublicationStatus } from './EventPublicationStatus'
import { EventLifecycleStatus } from './EventLifecycleStatus'
import { BuyerFeeMode } from '../Shared/BuyerFeeMode'
import { Uuid } from '../Shared/Uuid'
import { Locale } from '../Shared/Locale'
import { Timezone } from '../Shared/Timezone'
import { Time } from '../Shared/Time'
import { Url } from '../Shared/Url'
import { CountryCode } from '../Shared/CountryCode'

export interface ApiEvent {
  id: string
  promoterId: string
  dates: string[]
  artistIds: string[]
  title: Record<string, string> | null
  slug: string
  countryCode: string | null
  image: string | null
  imageUrl: string | null
  subtitle: Record<string, string> | null
  description: Record<string, string> | null
  terms: Record<string, string> | null
  venueId: string | null
  locale: string
  timezone: string | null
  startTime: string | null
  doorsOpenTime: string | null
  publicationStatus: string
  publishedAt: string | null
  isSoldOut: boolean
  lifecycleStatus: string
  promoterAgreementId: string
  promoterProfileId: string | null
  buyerFeeMode: string | null
  ticketSaleOpensAt: string | null
  ticketSaleClosesAt: string | null
  musicGenres: string[]
  hasMinorsPolicy: boolean
  minorsPolicyDescription: Record<string, string> | null
  minorsPolicyAthorizationFileId: string | null
  createdAt: string
  updatedAt: string
}

export function eventFromApiAdapter(item: ApiEvent): Event {
  return new Event(
    Uuid.fromString(item.id),
    Uuid.fromString(item.promoterId),
    item.dates.map(date => new Date(date)),
    item.artistIds.map(id => Uuid.fromString(id)),
    StringMultilanguage.fromArray(item.title),
    item.slug,
    item.countryCode ? CountryCode.fromString(item.countryCode) : null,
    item.image,
    item.imageUrl ? Url.fromString(item.imageUrl) : null,
    item.subtitle ? StringMultilanguage.fromArray(item.subtitle) : null,
    item.description ? StringMultilanguage.fromArray(item.description) : null,
    item.terms ? StringMultilanguage.fromArray(item.terms) : null,
    item.venueId ? Uuid.fromString(item.venueId) : null,
    Locale.fromString(item.locale),
    item.timezone ? Timezone.fromString(item.timezone) : null,
    item.startTime ? Time.fromString(item.startTime) : null,
    item.doorsOpenTime ? Time.fromString(item.doorsOpenTime) : null,
    item.publicationStatus as EventPublicationStatus,
    item.publishedAt ? new Date(item.publishedAt) : null,
    item.isSoldOut,
    item.lifecycleStatus as EventLifecycleStatus,
    Uuid.fromString(item.promoterAgreementId),
    item.promoterProfileId ? Uuid.fromString(item.promoterProfileId) : null,
    item.buyerFeeMode ? (item.buyerFeeMode as BuyerFeeMode) : null,
    item.ticketSaleOpensAt ? new Date(item.ticketSaleOpensAt) : null,
    item.ticketSaleClosesAt ? new Date(item.ticketSaleClosesAt) : null,
    item.musicGenres,
    item.hasMinorsPolicy,
    item.minorsPolicyDescription ? StringMultilanguage.fromArray(item.minorsPolicyDescription) : null,
    item.minorsPolicyAthorizationFileId ? Uuid.fromString(item.minorsPolicyAthorizationFileId) : null,
    new Date(item.createdAt),
    new Date(item.updatedAt)
  )
}


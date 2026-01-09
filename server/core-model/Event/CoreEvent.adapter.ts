import { CoreEvent } from './CoreEvent'
import { StringMultilanguage } from '../../../shared/StringMultilanguage'
import { CoreEventPublicationStatus } from './CoreEventPublicationStatus'
import { CoreEventLifecycleStatus } from './CoreEventLifecycleStatus'
import { BuyerFeeMode } from '../../../shared/BuyerFeeMode'
import { Uuid } from '../../../shared/Uuid'
import { Locale } from '../../../shared/Locale'
import { Timezone } from '../../../shared/Timezone'
import { Time } from '../../../shared/Time'
import { Url } from '../../../shared/Url'
import { CountryCode } from '../../../shared/CountryCode'

export interface CoreEventJson {
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

export function coreEventFromCoreApiAdapter(coreEventJson: CoreEventJson): CoreEvent {
  return new CoreEvent(
    Uuid.fromString(coreEventJson.id),
    Uuid.fromString(coreEventJson.promoterId),
    coreEventJson.dates.map(date => new Date(date)),
    coreEventJson.artistIds.map(id => Uuid.fromString(id)),
    StringMultilanguage.fromArray(coreEventJson.title),
    coreEventJson.slug,
    coreEventJson.countryCode ? CountryCode.fromString(coreEventJson.countryCode) : null,
    coreEventJson.image,
    coreEventJson.imageUrl ? Url.fromString(coreEventJson.imageUrl) : null,
    coreEventJson.subtitle ? StringMultilanguage.fromArray(coreEventJson.subtitle) : null,
    coreEventJson.description ? StringMultilanguage.fromArray(coreEventJson.description) : null,
    coreEventJson.terms ? StringMultilanguage.fromArray(coreEventJson.terms) : null,
    coreEventJson.venueId ? Uuid.fromString(coreEventJson.venueId) : null,
    Locale.fromString(coreEventJson.locale),
    coreEventJson.timezone ? Timezone.fromString(coreEventJson.timezone) : null,
    coreEventJson.startTime ? Time.fromString(coreEventJson.startTime) : null,
    coreEventJson.doorsOpenTime ? Time.fromString(coreEventJson.doorsOpenTime) : null,
    coreEventJson.publicationStatus as CoreEventPublicationStatus,
    coreEventJson.publishedAt ? new Date(coreEventJson.publishedAt) : null,
    coreEventJson.isSoldOut,
    coreEventJson.lifecycleStatus as CoreEventLifecycleStatus,
    Uuid.fromString(coreEventJson.promoterAgreementId),
    coreEventJson.promoterProfileId ? Uuid.fromString(coreEventJson.promoterProfileId) : null,
    coreEventJson.buyerFeeMode ? (coreEventJson.buyerFeeMode as BuyerFeeMode) : null,
    coreEventJson.ticketSaleOpensAt ? new Date(coreEventJson.ticketSaleOpensAt) : null,
    coreEventJson.ticketSaleClosesAt ? new Date(coreEventJson.ticketSaleClosesAt) : null,
    coreEventJson.musicGenres,
    coreEventJson.hasMinorsPolicy,
    coreEventJson.minorsPolicyDescription ? StringMultilanguage.fromArray(coreEventJson.minorsPolicyDescription) : null,
    coreEventJson.minorsPolicyAthorizationFileId ? Uuid.fromString(coreEventJson.minorsPolicyAthorizationFileId) : null,
    new Date(coreEventJson.createdAt),
    new Date(coreEventJson.updatedAt)
  )
}


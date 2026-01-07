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

export class Event {
  constructor(
    public readonly id: Uuid,
    public readonly promoterId: Uuid,
    public readonly dates: Date[],
    public readonly artistIds: Uuid[],
    public readonly title: StringMultilanguage,
    public readonly slug: string,
    public readonly countryCode: CountryCode | null,
    public readonly image: string | null,
    public readonly imageUrl: Url | null,
    public readonly subtitle: StringMultilanguage | null,
    public readonly description: StringMultilanguage | null,
    public readonly terms: StringMultilanguage | null,
    public readonly venueId: Uuid | null,
    public readonly locale: Locale,
    public readonly timezone: Timezone | null,
    public readonly startTime: Time | null,
    public readonly doorsOpenTime: Time | null,
    public readonly publicationStatus: EventPublicationStatus,
    public readonly publishedAt: Date | null,
    public readonly isSoldOut: boolean,
    public readonly lifecycleStatus: EventLifecycleStatus,
    public readonly promoterAgreementId: Uuid,
    public readonly promoterProfileId: Uuid | null,
    public readonly buyerFeeMode: BuyerFeeMode | null,
    public readonly ticketSaleOpensAt: Date | null,
    public readonly ticketSaleClosesAt: Date | null,
    public readonly musicGenres: string[],
    public readonly hasMinorsPolicy: boolean,
    public readonly minorsPolicyDescription: StringMultilanguage | null,
    public readonly minorsPolicyAthorizationFileId: Uuid | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}

  get firstDate(): Date | null {
    return this.dates.length > 0 ? this.dates[0] : null
  }

  get saleStatus(): 'on-sale' | 'coming-soon' | 'closed' {
    if (this.isSoldOut) return 'closed'
    
    const now = new Date()
    if (this.ticketSaleClosesAt && now > this.ticketSaleClosesAt) return 'closed'
    if (this.ticketSaleOpensAt && now < this.ticketSaleOpensAt) return 'coming-soon'
    
    return 'on-sale'
  }
}


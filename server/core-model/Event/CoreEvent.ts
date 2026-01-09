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

export class CoreEvent {
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
    public readonly publicationStatus: CoreEventPublicationStatus,
    public readonly publishedAt: Date | null,
    public readonly isSoldOut: boolean,
    public readonly lifecycleStatus: CoreEventLifecycleStatus,
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
}


import { StringMultilanguage } from '../../shared/StringMultilanguage'
import { Uuid } from '../../shared/Uuid'
import { Url } from '../../shared/Url'
import { CountryCode } from '../../shared/CountryCode'
import { Timezone } from '../../shared/Timezone'
import { Time } from '../../shared/Time'

export class EventView {
  constructor(
    public readonly id: Uuid,
    public readonly dates: Date[],
    public readonly title: StringMultilanguage,
    public readonly slug: string,
    public readonly countryCode: CountryCode | null,
    public readonly imageUrl: Url | null,
    public readonly subtitle: StringMultilanguage | null,
    public readonly description: StringMultilanguage | null,
    public readonly terms: StringMultilanguage | null,
    public readonly venueId: Uuid | null,
    public readonly timezone: Timezone | null,
    public readonly startTime: Time | null,
    public readonly doorsOpenTime: Time | null,
    public readonly isSoldOut: boolean,
    public readonly promoterProfileId: Uuid | null,
    public readonly ticketSaleClosesAt: Date | null,
    public readonly musicGenres: string[],
    public readonly hasMinorsPolicy: boolean,
    public readonly minorsPolicyDescription: StringMultilanguage | null,
    public readonly minorsPolicyAthorizationFileId: Uuid | null
  ) {}
}


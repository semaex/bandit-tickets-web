import { StringMultilanguage } from '../../shared/StringMultilanguage'
import { Uuid } from '../../shared/Uuid'
import { Url } from '../../shared/Url'
import { CountryCode } from '../../shared/CountryCode'
import { Money } from '../../shared/Money'
import type { VenueListView } from '../Venue/VenueListView'

export class EventListView {
  constructor(
    public readonly id: Uuid,
    public readonly slug: string,
    public readonly dates: Date[],
    public readonly title: StringMultilanguage,
    public readonly subtitle: StringMultilanguage | null,
    public readonly imageUrl: Url | null,
    public readonly countryCode: CountryCode | null,
    public readonly isSoldOut: boolean,
    public readonly musicGenres: string[],
    public readonly venue: VenueListView | null,
    public readonly fromPrice: Money | null
  ) {}
}

import { Uuid } from '../../shared/Uuid'
import { CountryCode } from '../../shared/CountryCode'

export class VenueListView {
  constructor(
    public readonly id: Uuid,
    public readonly name: string,
    public readonly city: string | null,
    public readonly countryCode: CountryCode | null
  ) {}
}


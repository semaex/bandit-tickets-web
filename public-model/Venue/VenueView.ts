import { Uuid } from '../../shared/Uuid'
import { CountryCode } from '../../shared/CountryCode'
import { Coords } from '../../shared/Coords'

export class VenueView {
  constructor(
    public readonly id: Uuid,
    public readonly name: string,
    public readonly address: string | null,
    public readonly city: string | null,
    public readonly countryCode: CountryCode | null,
    public readonly coords: Coords | null
  ) {}
}


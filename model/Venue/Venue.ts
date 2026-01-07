import { Uuid } from '../Shared/Uuid'
import { CountryCode } from '../Shared/CountryCode'
import { Coords } from '../Shared/Coords'
import { Url } from '../Shared/Url'

export class Venue {
  constructor(
    public readonly id: Uuid,
    public readonly name: string,
    public readonly promoterId: Uuid | null,
    public readonly address: string | null,
    public readonly city: string | null,
    public readonly countryCode: CountryCode | null,
    public readonly coords: Coords | null,
    public readonly image: string | null,
    public readonly capacity: number | null,
    public readonly web: Url | null,
    public readonly entryAllowedTo: string | null,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}


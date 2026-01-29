import { Uuid } from '../../../shared/Uuid'
import { Url } from '../../../shared/Url'

export class CoreArtist {
  constructor(
    public readonly id: Uuid,
    public readonly promoterId: Uuid,
    public readonly name: string,
    public readonly slug: string,
    public readonly image: string | null,
    public readonly imageUrl: Url | null,
    public readonly musicGenres: string[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}

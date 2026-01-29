import { Uuid } from '../../shared/Uuid'
import { Url } from '../../shared/Url'

export class ArtistView {
  constructor(
    public readonly id: Uuid,
    public readonly name: string,
    public readonly slug: string,
    public readonly imageUrl: Url | null,
    public readonly musicGenres: string[]
  ) {}
}

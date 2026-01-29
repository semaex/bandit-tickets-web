import { CoreArtist } from './CoreArtist'
import { Uuid } from '../../../shared/Uuid'
import { Url } from '../../../shared/Url'

export interface CoreArtistJson {
  id: string
  promoterId: string
  name: string
  slug: string
  image: string | null
  imageUrl: string | null
  musicGenres: string[]
  createdAt: string
  updatedAt: string
}

export function coreArtistFromJson(json: CoreArtistJson): CoreArtist {
  return new CoreArtist(
    Uuid.fromString(json.id),
    Uuid.fromString(json.promoterId),
    json.name,
    json.slug,
    json.image,
    json.imageUrl ? Url.fromString(json.imageUrl) : null,
    json.musicGenres ?? [],
    new Date(json.createdAt),
    new Date(json.updatedAt)
  )
}

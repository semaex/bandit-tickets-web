import { ArtistView } from './ArtistView'
import type { CoreArtist } from '../../server/core-model/Artist/CoreArtist'
import { Uuid } from '../../shared/Uuid'
import { Url } from '../../shared/Url'

export interface ArtistViewJson {
  id: string
  name: string
  slug: string
  imageUrl: string | null
  musicGenres: string[]
}

export function artistViewFromCoreArtistAdapter(coreArtist: CoreArtist): ArtistView {
  return new ArtistView(
    coreArtist.id,
    coreArtist.name,
    coreArtist.slug,
    coreArtist.imageUrl,
    coreArtist.musicGenres
  )
}

export function artistViewToJson(view: ArtistView): ArtistViewJson {
  return {
    id: view.id.toString(),
    name: view.name,
    slug: view.slug,
    imageUrl: view.imageUrl?.toString() ?? null,
    musicGenres: view.musicGenres
  }
}

export function artistViewFromJson(json: ArtistViewJson): ArtistView {
  return new ArtistView(
    Uuid.fromString(json.id),
    json.name,
    json.slug,
    json.imageUrl ? Url.fromString(json.imageUrl) : null,
    json.musicGenres ?? []
  )
}

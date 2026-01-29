import type { ArtistView } from './ArtistView'
import type { ArtistViewJson } from './ArtistView.adapter'
import { artistViewFromJson } from './ArtistView.adapter'
import { bffApiClient } from '../../server/api-client/bff'

export async function findArtistById(id: string): Promise<ArtistView> {
  const json = await bffApiClient.get<ArtistViewJson>(`/api/artists/${id}`)
  return artistViewFromJson(json)
}

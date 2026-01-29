import type { CoreArtist } from './CoreArtist'
import { coreArtistFromJson } from './CoreArtist.adapter'
import type { CoreArtistJson } from './CoreArtist.adapter'
import { coreApiClient } from '../../api-client/core'

const BASE_URL = '/api/v1/catalog/artists'

export function findCoreArtistById(id: string): Promise<CoreArtist> {
  const endpoint = `${BASE_URL}/${id}`
  return coreApiClient.get<CoreArtistJson>(endpoint)
    .then(response => coreArtistFromJson(response))
}

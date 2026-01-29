import { handleCoreApiCall } from '../../api-client/core'
import { getRouterParamOrFail } from '../../utils/params'
import { findCoreArtistById } from '../../core-model/Artist/CoreArtist.services'
import { artistViewFromCoreArtistAdapter, artistViewToJson } from '../../../public-model/Artist/ArtistView.adapter'

export default defineEventHandler(async (event) => {
  const artistId = getRouterParamOrFail(event, 'artistId')

  return handleCoreApiCall(async () => {
    const coreArtist = await findCoreArtistById(artistId)
    const artistView = artistViewFromCoreArtistAdapter(coreArtist)
    return artistViewToJson(artistView)
  }, 'fetch artist from core')
})

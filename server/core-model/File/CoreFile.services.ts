import type { CoreFile } from './CoreFile'
import { coreFileFromJson } from './CoreFile.adapter'
import type { CoreFileJson } from './CoreFile.adapter'
import { coreApiClient } from '../../api-client/core'

const BASE_URL = '/api/v1/file/files'

export async function findCoreFileById(id: string, token?: string): Promise<CoreFile> {
  const queryParams = token ? `?token=${token}` : ''
  const endpoint = `${BASE_URL}/${id}${queryParams}`
  return coreApiClient.get<CoreFileJson>(endpoint)
    .then(response => coreFileFromJson(response))
}


import type { CoreFile } from './CoreFile'
import { coreFileFromJson } from './CoreFile.adapter'
import type { CoreFileJson } from './CoreFile.adapter'

export async function findCoreFileById(id: string, token?: string): Promise<CoreFile> {
  const queryParams = token ? `?token=${token}` : ''
  return $fetch<{ file: CoreFileJson }>(`/api/files/${id}${queryParams}`).then(
    (data: { file: CoreFileJson }) => {
      return coreFileFromJson(data.file)
    }
  )
}


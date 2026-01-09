import type { FileView } from './FileView'
import type { FileViewJson } from './FileView.adapter'
import { fileViewFromJson } from './FileView.adapter'

export async function findFileViewById(id: string, token?: string): Promise<FileView> {
  const queryParams = token ? `?token=${token}` : ''
  return $fetch<FileViewJson>(`/api/files/${id}${queryParams}`).then(
    (fileViewJson: FileViewJson) => {
      return fileViewFromJson(fileViewJson)
    }
  )
}

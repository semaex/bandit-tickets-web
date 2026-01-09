import type { FileView } from './FileView'
import type { FileViewJson } from './FileView.adapter'
import { fileViewFromJson } from './FileView.adapter'
import { bffApiClient } from '../../server/api-client/bff'

export async function findFileViewById(id: string, token?: string): Promise<FileView> {
  const query = token ? { token } : undefined
  const fileViewJson = await bffApiClient.get<FileViewJson>(`/files/${id}`, query)
  return fileViewFromJson(fileViewJson)
}

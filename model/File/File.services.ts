import type { File } from './File'
import type { ApiFile } from './File.adapter'
import { fileFromApiAdapter } from './File.adapter'

export async function findFileById(fileId: string, token?: string): Promise<File> {
  const params = new URLSearchParams()
  if (token) {
    params.append('token', token)
  }
  
  const queryString = params.toString()
  const url = `/api/files/${fileId}${queryString ? `?${queryString}` : ''}`
  
  return $fetch<{ file: ApiFile }>(url).then(
    (data: { file: ApiFile }) => {
      return fileFromApiAdapter(data.file)
    }
  )
}


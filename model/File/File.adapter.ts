import { File } from './File'
import { Uuid } from '../Shared/Uuid'
import { Url } from '../Shared/Url'

export interface ApiFile {
  id: string
  path: string
  name: string
  niceName: string
  url: string
  providerUrl: string | null
  mimeType: string
  size: number
  isPublic: boolean
  token: string
  createdBy: string | null
  createdAt: string
}

export function fileFromApiAdapter(item: ApiFile): File {
  return new File(
    Uuid.fromString(item.id),
    item.path,
    item.name,
    item.niceName,
    Url.fromString(item.url),
    item.providerUrl ? Url.fromString(item.providerUrl) : null,
    item.mimeType,
    item.size,
    item.isPublic,
    item.token,
    item.createdBy ? Uuid.fromString(item.createdBy) : null,
    new Date(item.createdAt)
  )
}


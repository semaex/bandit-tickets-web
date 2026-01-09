import { CoreFile } from './CoreFile'
import { Uuid } from '../../../shared/Uuid'
import { Url } from '../../../shared/Url'

export interface CoreFileJson {
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

export function coreFileFromJson(json: CoreFileJson): CoreFile {
  return new CoreFile(
    Uuid.fromString(json.id),
    json.path,
    json.name,
    json.niceName,
    Url.fromString(json.url),
    json.providerUrl ? Url.fromString(json.providerUrl) : null,
    json.mimeType,
    json.size,
    json.isPublic,
    json.token,
    json.createdBy ? Uuid.fromString(json.createdBy) : null,
    new Date(json.createdAt)
  )
}


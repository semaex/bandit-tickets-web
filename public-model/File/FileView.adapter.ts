import { FileView } from './FileView'
import type { CoreFile } from '../../server/core-model/File/CoreFile'
import { Uuid } from '../../shared/Uuid'
import { Url } from '../../shared/Url'

export interface FileViewJson {
  id: string
  name: string
  niceName: string
  url: string
}

export function fileViewFromJson(json: FileViewJson): FileView {
  return new FileView(
    Uuid.fromString(json.id),
    json.name,
    json.niceName,
    Url.fromString(json.url)
  )
}

export function fileViewToJson(fileView: FileView): FileViewJson {
  return {
    id: fileView.id.toString(),
    name: fileView.name,
    niceName: fileView.niceName,
    url: fileView.url.toString()
  }
}

export function fileViewFromCoreFileAdapter(coreFile: CoreFile): FileView {
    return new FileView(
      coreFile.id,
      coreFile.name,
      coreFile.niceName,
      coreFile.url
    )
  }
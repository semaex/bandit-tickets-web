import { fileViewFromCoreFileAdapter, fileViewToJson } from '../../../public-model/File/FileView.adapter'
import { handleCoreApiCall } from '../../api-client/core'
import { getRouterParamOrFail } from '../../utils/params'
import { findCoreFileById } from '../../core-model/File/CoreFile.services'

export default defineEventHandler(async (event) => {
  const fileId = getRouterParamOrFail(event, 'fileId')
  const token = getQuery(event).token as string | undefined

  return handleCoreApiCall(async () => {
    const coreFile = await findCoreFileById(fileId, token)
    const fileView = fileViewFromCoreFileAdapter(coreFile)
    return fileViewToJson(fileView)
  }, 'fetch file from core')
})


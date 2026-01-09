import { coreFileFromJson, type CoreFileJson } from '../../core-model/File/CoreFile.adapter'
import { fileViewFromCoreFileAdapter, fileViewToJson } from '../../../public-model/File/FileView.adapter'
import { coreApiClient, handleCoreApiCall } from '../../api-client/core'
import { getRouterParamOrFail } from '../../utils/params'

const BASE_URL = '/api/v1/file/files'

export default defineEventHandler(async (event) => {
  const fileId = getRouterParamOrFail(event, 'fileId')
  const token = getQuery(event).token as string | undefined

  return handleCoreApiCall(async () => {
    const endpoint = token 
      ? `${BASE_URL}/${fileId}?token=${token}` 
      : `${BASE_URL}/${fileId}`
    
    const response = await coreApiClient.get<{ file: CoreFileJson }>(endpoint)

    const coreFile = coreFileFromJson(response.file)
    const fileView = fileViewFromCoreFileAdapter(coreFile)
    return fileViewToJson(fileView)
  }, 'fetch file from core')
})


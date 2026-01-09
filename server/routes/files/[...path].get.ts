import { coreApiClient } from '../../api-client/core'
import { getRouterParamOrFail } from '../../utils/params'

export default defineEventHandler(async (event) => {
  const path = getRouterParamOrFail(event, 'path')
  
  const pathString = Array.isArray(path) ? path.join('/') : path
  const cleanPath = pathString.startsWith('/') ? pathString.substring(1) : pathString
  const endpoint = `/files/${cleanPath}`

  try {
    const response = await coreApiClient.getRaw(endpoint)

    if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
      const location = response.headers.location
      if (location) {
        let cleanLocation = Array.isArray(location) ? location[0] : location
        if (cleanLocation.includes('://')) {
          const [protocol, rest] = cleanLocation.split('://', 2)
          cleanLocation = protocol + '://' + rest.replace(/\/+/g, '/')
        } else {
          cleanLocation = cleanLocation.replace(/\/+/g, '/')
        }
        setHeader(event, 'Location', cleanLocation)
        setHeader(event, 'Cache-Control', 'public, max-age=31536000')
        setResponseStatus(event, response.statusCode)
        return null
      }
    }

    if (response.statusCode >= 200 && response.statusCode < 300) {
      const contentType = response.headers['content-type']
      setHeader(event, 'Content-Type', Array.isArray(contentType) ? contentType[0] : contentType || 'application/octet-stream')
      
      const contentLength = response.headers['content-length']
      setHeader(event, 'Content-Length', contentLength ? (Array.isArray(contentLength) ? parseInt(contentLength[0], 10) : parseInt(contentLength as string, 10)) : response.buffer.length)
      
      if (response.headers['content-disposition']) {
        const contentDisposition = response.headers['content-disposition']
        setHeader(event, 'Content-Disposition', Array.isArray(contentDisposition) ? contentDisposition[0] : contentDisposition)
      }
      
      if (response.headers['cache-control']) {
        const cacheControl = response.headers['cache-control']
        setHeader(event, 'Cache-Control', Array.isArray(cacheControl) ? cacheControl[0] : cacheControl)
      }
      
      if (response.headers['etag']) {
        const etag = response.headers['etag']
        setHeader(event, 'ETag', Array.isArray(etag) ? etag[0] : etag)
      }
      
      return response.buffer
    } else {
      throw new Error(`Request failed with status ${response.statusCode}`)
    }
  } catch (error: any) {
    console.error('[BFF] Error serving public file from core:', {
      endpoint,
      error: error.message || error
    })

    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to serve file from core'
    })
  }
})


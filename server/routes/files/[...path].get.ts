export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path')

  if (!path) {
    throw createError({
      statusCode: 400,
      message: 'File path is required'
    })
  }

  const config = useRuntimeConfig()
  const coreUrl = (config.banditTicketsCoreUrl || config.BANDIT_TICKETS_CORE_URL) as string | undefined

  if (!coreUrl || typeof coreUrl !== 'string') {
    throw createError({
      statusCode: 500,
      message: 'Core API URL is not configured'
    })
  }

  const cleanCoreUrl = coreUrl.replace(/\/$/, '')
  const pathString = Array.isArray(path) ? path.join('/') : path
  const cleanPath = pathString.startsWith('/') ? pathString.substring(1) : pathString
  const coreApiUrl = `${cleanCoreUrl}/files/${cleanPath}`

  try {
    const https = await import('https')

    const agent = new https.Agent({
      rejectUnauthorized: false
    })

    const url = new URL(coreApiUrl)
    const port = url.port ? parseInt(url.port) : (url.protocol === 'https:' ? 443 : 80)
    const hostname = url.hostname

    return new Promise((resolve, reject) => {
      const options = {
        hostname: hostname,
        port: port,
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
          'Host': url.host
        },
        agent: agent,
        rejectUnauthorized: false,
        followRedirect: false
      }

      const req = https.request(options, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
          const location = res.headers.location
          if (location) {
            let cleanLocation = location as string
            if (cleanLocation.includes('://')) {
              const [protocol, rest] = cleanLocation.split('://', 2)
              cleanLocation = protocol + '://' + rest.replace(/\/+/g, '/')
            } else {
              cleanLocation = cleanLocation.replace(/\/+/g, '/')
            }
            setHeader(event, 'Location', cleanLocation)
            setHeader(event, 'Cache-Control', 'public, max-age=31536000')
            setResponseStatus(event, res.statusCode || 302)
            resolve(null)
            return
          }
        }

        const chunks: Buffer[] = []

        res.on('data', (chunk) => {
          chunks.push(chunk)
        })

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            const buffer = Buffer.concat(chunks)
            
            setHeader(event, 'Content-Type', res.headers['content-type'] || 'application/octet-stream')
            setHeader(event, 'Content-Length', res.headers['content-length'] ? parseInt(res.headers['content-length'] as string, 10) : buffer.length)
            
            if (res.headers['content-disposition']) {
              setHeader(event, 'Content-Disposition', res.headers['content-disposition'])
            }
            
            if (res.headers['cache-control']) {
              setHeader(event, 'Cache-Control', res.headers['cache-control'])
            }
            
            if (res.headers['etag']) {
              setHeader(event, 'ETag', res.headers['etag'])
            }
            
            resolve(buffer)
          } else {
            reject(new Error(`Request failed with status ${res.statusCode}`))
          }
        })
      })

      req.on('error', (error) => {
        reject(error)
      })

      req.end()
    })
  } catch (error: any) {
    console.error('[BFF] Error serving public file from core:', {
      url: coreApiUrl,
      error: error.message || error
    })

    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to serve file from core'
    })
  }
})


export default defineEventHandler(async (event) => {
  const fileId = getRouterParam(event, 'fileId')
  const token = getQuery(event).token as string | undefined

  if (!fileId) {
    throw createError({
      statusCode: 400,
      message: 'File ID is required'
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
  const coreApiUrl = `${cleanCoreUrl}/api/v1/file/files/${fileId}/serve`

  try {
    const https = await import('https')
    
    const agent = new https.Agent({
      rejectUnauthorized: false
    })

    const url = new URL(coreApiUrl)
    if (token) {
      url.searchParams.append('token', token)
    }
    
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
        rejectUnauthorized: false
      }

      const req = https.request(options, (res) => {
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
    console.error('[BFF] Error serving private file from core:', {
      url: coreApiUrl,
      error: error.message || error
    })

    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to serve file from core'
    })
  }
})


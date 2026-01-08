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
  const coreApiUrl = `${cleanCoreUrl}/api/v1/file/files/${fileId}`

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
          'Content-Type': 'application/json',
          'Host': url.host
        },
        agent: agent,
        rejectUnauthorized: false
      }

      const req = https.request(options, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const jsonData = JSON.parse(data)
            resolve(jsonData.data || jsonData)
          } catch (error) {
            reject(new Error('Invalid JSON response'))
          }
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
    console.error('[BFF] Error fetching file from core:', {
      url: coreApiUrl,
      error: error.message || error
    })

    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to fetch file from core'
    })
  }
})


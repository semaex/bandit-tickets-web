export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const config = useRuntimeConfig()
  const coreUrl = config.banditTicketsCoreUrl

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug parameter is required'
    })
  }

  if (!coreUrl) {
    console.error('[BFF] Core API URL is not configured')
    throw createError({
      statusCode: 500,
      statusMessage: 'Core API URL is not configured'
    })
  }

  const cleanCoreUrl = coreUrl.replace(/\/$/, '')
  const coreApiUrl = `${cleanCoreUrl}/api/v1/catalog/events/by-slug/${slug}`
  console.log('[BFF] Fetching event from core:', coreApiUrl)

  try {
    // Use native fetch with custom HTTPS agent to ignore SSL certificate errors
    const https = await import('https')
    
    // Create custom agent that ignores SSL certificate validation
    const agent = new https.Agent({
      rejectUnauthorized: false
    })

    // Parse URL but keep the original hostname (don't resolve to IP)
    const url = new URL(coreApiUrl)
    
    // Extract port from URL or use default
    const port = url.port ? parseInt(url.port) : (url.protocol === 'https:' ? 443 : 80)
    
    // Ensure we use the hostname from the URL, not a resolved IP
    const hostname = url.hostname
    
    console.log('[BFF] Parsed URL details:', {
      originalUrl: coreApiUrl,
      hostname: hostname,
      port: port,
      protocol: url.protocol
    })
    
    // Use https.request directly for full control over SSL
    const response = await new Promise<{ status: number; message: string | null; data: { event: any } }>((resolve, reject) => {
      const options = {
        hostname: hostname, // Use hostname directly, don't resolve to IP
        port: port,
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Host': url.host // Use full host (hostname:port) for Host header
        },
        agent: agent,
        rejectUnauthorized: false
      }
      
      console.log('[BFF] HTTPS request options:', {
        hostname: options.hostname,
        port: options.port,
        path: options.path,
        hostHeader: options.headers.Host
      })

      const req = https.request(options, (res) => {
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data) as { status: number; message: string | null; data: { event: any } }
            resolve(jsonData)
          } catch (e) {
            reject(new Error(`Failed to parse response: ${e}`))
          }
        })
      })

      req.on('error', (error) => {
        reject(error)
      })

      req.end()
    })

    if (!response.data || !response.data.event) {
      console.error('[BFF] Invalid response format from core:', response)
      throw createError({
        statusCode: 500,
        statusMessage: 'Invalid response format from core API'
      })
    }

    console.log('[BFF] Successfully fetched event from core')
    return response.data
  } catch (error: any) {
    console.error('[BFF] Error fetching event from core:', {
      url: coreApiUrl,
      error: error.message || error,
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
      response: error.data || error.response
    })

    if (error.statusCode) {
      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.statusMessage || error.message || 'Failed to fetch event from core'
      })
    }

    if (error.message) {
      throw createError({
        statusCode: 500,
        statusMessage: `Error fetching event: ${error.message}`
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error while fetching event'
    })
  }
})


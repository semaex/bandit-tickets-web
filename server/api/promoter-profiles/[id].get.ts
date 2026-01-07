if (process.env.NODE_ENV !== 'production') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const config = useRuntimeConfig()
  const coreUrl = config.banditTicketsCoreUrl

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'PromoterProfile ID parameter is required'
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
  const coreApiUrl = `${cleanCoreUrl}/api/v1/catalog/promoter-profiles/${id}`
  console.log('[BFF] Fetching promoter profile from core:', coreApiUrl)

  try {
    const https = await import('https')

    const agent = new https.Agent({
      rejectUnauthorized: false
    })

    const url = new URL(coreApiUrl)
    const port = url.port ? parseInt(url.port) : url.protocol === 'https:' ? 443 : 80
    const hostname = url.hostname

    const response = await new Promise<{ status: number; message: string | null; data: any }>((resolve, reject) => {
      const options = {
        hostname: hostname,
        port: port,
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Host: url.host
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
          try {
            const jsonData = JSON.parse(data) as { status: number; message: string | null; data: any }
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

    if (!response.data) {
      console.error('[BFF] Invalid response format from core:', response)
      throw createError({
        statusCode: 500,
        statusMessage: 'Invalid response format from core API'
      })
    }

    return { promoterProfile: response.data }
  } catch (error: any) {
    console.error('[BFF] Error fetching promoter profile from core:', {
      url: coreApiUrl,
      error: error.message || error,
      statusCode: error.statusCode,
      statusMessage: error.statusMessage,
      response: error.data || error.response
    })

    if (error.statusCode) {
      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.statusMessage || error.message || 'Failed to fetch promoter profile from core'
      })
    }

    if (error.message) {
      throw createError({
        statusCode: 500,
        statusMessage: `Error fetching promoter profile: ${error.message}`
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error while fetching promoter profile'
    })
  }
})



import { coreApiClient } from '../../../../api-client/core'

export default defineEventHandler(async (event) => {
  const token = getQuery(event).token as string | undefined

  if (!token) {
    throw createError({
      statusCode: 400,
      message: 'Token is required'
    })
  }

  // Validate JWT format (without verifying signature)
  const parts = token.split('.')
  if (parts.length !== 3) {
    throw createError({
      statusCode: 401,
      message: 'Invalid token format'
    })
  }

  let orderId: string
  try {
    // Decode payload (base64url decode)
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString())
    orderId = payload.orderId
    
    if (!orderId) {
      throw new Error('orderId not found in token')
    }
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Invalid token payload'
    })
  }

  try {
    const endpoint = `/api/v1/admission/tickets/orders/${orderId}/pdf?token=${token}`
    const response = await coreApiClient.getRaw(endpoint)

    if (response.statusCode >= 200 && response.statusCode < 300) {
      const contentType = response.headers['content-type']
      setHeader(event, 'Content-Type', Array.isArray(contentType) ? contentType[0] : contentType || 'application/pdf')
      
      if (response.headers['content-disposition']) {
        const contentDisposition = response.headers['content-disposition']
        setHeader(event, 'Content-Disposition', Array.isArray(contentDisposition) ? contentDisposition[0] : contentDisposition)
      }
      
      return response.buffer
    } else {
      throw new Error(`Request failed with status ${response.statusCode}`)
    }
  } catch (error: any) {
    console.error('[BFF] Error serving order PDF from core:', {
      orderId,
      error: error.message || error
    })

    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to serve order PDF from core'
    })
  }
})

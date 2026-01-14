import { createError } from 'h3'

export function handleApiError(error: any) {
  if (error.statusCode) {
    const errorOptions: any = {
      statusCode: error.statusCode,
      statusMessage: error.message || 'Request failed'
    }
    
    // Include errorCode in data if it exists and is not null
    // This comes from CoreApiError when the core API returns an error with error.code
    // The data property will be included in the JSON response by h3
    if (error.errorCode !== undefined && error.errorCode !== null) {
      errorOptions.data = {
        errorCode: error.errorCode
      }
    }
    
    throw createError(errorOptions)
  }

  throw error
}

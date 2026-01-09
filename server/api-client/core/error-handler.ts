export async function handleCoreApiCall<T>(
  operation: () => Promise<T>,
  errorContext: string = 'Core API operation'
): Promise<T> {
  try {
    return await operation()
  } catch (error: any) {
    if (error.statusCode) {
      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.statusMessage || error.message || `Failed to ${errorContext}`
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: error.message || `Internal server error while ${errorContext}`
    })
  }
}


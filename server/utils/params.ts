import type { H3Event } from 'h3'

export function getRouterParamOrFail(event: H3Event, paramName: string): string {
  const value = getRouterParam(event, paramName)
  
  if (!value) {
    throw createError({
      statusCode: 400,
      statusMessage: `${paramName} parameter is required`
    })
  }
  
  return value
}


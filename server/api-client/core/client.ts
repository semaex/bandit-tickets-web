interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: any
}

export interface RawResponse {
  buffer: Buffer
  statusCode: number
  headers: Record<string, string | string[]>
}

export class CoreApiError extends Error {
  constructor(
    public statusCode: number,
    public errorCode: string | null,
    message: string
  ) {
    super(message)
    this.name = 'CoreApiError'
  }
}

export class CoreApiClient {
  private readonly baseUrl: string
  private readonly apiKey?: string

  constructor(baseUrl: string, apiKey?: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
    this.apiKey = apiKey
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body })
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }

  async getRaw(endpoint: string): Promise<RawResponse> {
    const fullUrl = `${this.baseUrl}${endpoint}`

    try {
      const https = await import('https')

      const agent = new https.Agent({
        rejectUnauthorized: false
      })

      const url = new URL(fullUrl)
      const port = url.port ? parseInt(url.port) : (url.protocol === 'https:' ? 443 : 80)
      const hostname = url.hostname

      const headers: Record<string, string> = {
        'Host': url.host
      }

      if (this.apiKey) {
        headers['X-API-Key'] = this.apiKey
      }

      return new Promise<RawResponse>((resolve, reject) => {
        const requestOptions = {
          hostname,
          port,
          path: url.pathname + url.search,
          method: 'GET',
          headers,
          agent,
          rejectUnauthorized: false
        }

        const req = https.request(requestOptions, (res) => {
          const chunks: Buffer[] = []

          res.on('data', (chunk) => {
            chunks.push(chunk)
          })

          res.on('end', () => {
            const buffer = Buffer.concat(chunks)
            const responseHeaders: Record<string, string | string[]> = {}
            
            Object.keys(res.headers).forEach(key => {
              const value = res.headers[key]
              if (value !== undefined) {
                responseHeaders[key] = value
              }
            })

            resolve({
              buffer,
              statusCode: res.statusCode || 200,
              headers: responseHeaders
            })
          })
        })

        req.on('error', (error) => {
          reject(error)
        })

        req.end()
      })
    } catch (error: any) {
      throw error
    }
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const fullUrl = `${this.baseUrl}${endpoint}`
    const method = options.method || 'GET'

    try {
      const https = await import('https')

      const agent = new https.Agent({
        rejectUnauthorized: false
      })

      const url = new URL(fullUrl)
      const port = url.port ? parseInt(url.port) : (url.protocol === 'https:' ? 443 : 80)
      const hostname = url.hostname

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Host': url.host,
        ...options.headers
      }

      if (this.apiKey) {
        headers['X-API-Key'] = this.apiKey
      }

      const response = await new Promise<any>((resolve, reject) => {
        const requestOptions = {
          hostname,
          port,
          path: url.pathname + url.search,
          method,
          headers,
          agent,
          rejectUnauthorized: false
        }

        const req = https.request(requestOptions, (res) => {
          let data = ''
          
          res.on('data', (chunk) => {
            data += chunk
          })
          
          res.on('end', () => {
            try {
              if (res.statusCode && res.statusCode >= 400) {
                let jsonData: any = null
                try {
                  jsonData = JSON.parse(data)
                } catch (e) {
                  // If not JSON, use the raw data if it's small, otherwise a generic message
                  console.error(`Core API returned non-JSON error [${res.statusCode}]:`, data.substring(0, 500))
                }
                
                console.error(`Core API Error [${method} ${endpoint}]:`, {
                  statusCode: res.statusCode,
                  data: jsonData || data.substring(0, 200)
                })

                const errorMessage = jsonData?.error?.message || jsonData?.message || jsonData?.detail || jsonData?.title || (typeof data === 'string' && data.length > 0 ? data.substring(0, 100) : 'Request failed')
                const errorCode = jsonData?.error?.code || jsonData?.code || null
                
                reject(new CoreApiError(res.statusCode, errorCode, errorMessage))
                return
              }

              if (data === '') {
                resolve({})
                return
              }

              const jsonData = JSON.parse(data)
              resolve(jsonData)
            } catch (e) {
              reject(new Error(`Failed to parse response: ${e}`))
            }
          })
        })

        req.on('error', (error) => {
          reject(error)
        })

        if (options.body) {
          req.write(JSON.stringify(options.body))
        }

        req.end()
      })

      return response
    } catch (error: any) {
      throw error
    }
  }
}

export function createCoreApiClient(coreUrl: string, apiKey?: string): CoreApiClient {
  return new CoreApiClient(coreUrl, apiKey)
}

function getCoreApiClient(): CoreApiClient {
  const config = useRuntimeConfig()
  const coreUrl = config.banditTicketsCoreUrl
  const apiKey = config.banditTicketsApiKey
  
  if (!coreUrl) {
    throw new Error('Core API URL is not configured')
  }
  
  return createCoreApiClient(coreUrl, apiKey)
}

export const coreApiClient = getCoreApiClient()


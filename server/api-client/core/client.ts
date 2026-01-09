interface CoreApiResponse<T = any> {
  status: number
  message: string | null
  data: T
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
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

      const response = await new Promise<CoreApiResponse<T>>((resolve, reject) => {
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
              const jsonData = JSON.parse(data) as CoreApiResponse<T>
              
              if (res.statusCode && res.statusCode >= 400) {
                reject(new Error(`HTTP ${res.statusCode}: ${jsonData.message || 'Request failed'}`))
                return
              }
              
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

      if (!response.data) {
        throw new Error('Invalid response format from Core API')
      }

      return response.data
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


interface BffApiResponse<T = any> {
  status: number
  message: string | null
  data: T
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  query?: Record<string, string>
}

export class BffApiClient {
  private readonly baseUrl: string

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl.replace(/\/$/, '')
  }

  async get<T>(endpoint: string, query?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', query })
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
      const response = await $fetch<BffApiResponse<T> | T>(fullUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: options.body,
        query: options.query
      })

      if (response && typeof response === 'object' && 'data' in response) {
        const apiResponse = response as BffApiResponse<T>
        if (apiResponse.data !== undefined) {
          return apiResponse.data
        }
      }

      return response as T
    } catch (error: any) {
      if (error.data) {
        throw error
      }

      throw new Error(error.message || `BFF API request failed: ${method} ${fullUrl}`)
    }
  }
}

export function createBffApiClient(baseUrl?: string): BffApiClient {
  return new BffApiClient(baseUrl)
}

function getBffApiClient(): BffApiClient {
  return createBffApiClient()
}

export const bffApiClient = getBffApiClient()


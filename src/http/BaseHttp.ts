import { env } from '@/env'
import { getApiToken } from '@/lib/session'
import { ResponseData, ResponseError } from '@/types/Error'

export class BaseHttp {
  private baseUrl: string
  private useAuth: boolean

  constructor(baseUrl: string, useAuth: boolean) {
    this.baseUrl = baseUrl
    this.useAuth = useAuth
  }

  private async getAuthHeaders(): Promise<Record<string, string>> {
    const headers: Record<string, string> = {}

    if (this.useAuth) {
      const token = await getApiToken()
      headers.Authorization = `Bearer ${token}`
    }

    return headers
  }

  private async getRequestOptions(
    options?: RequestInit,
    includeContentType: boolean = false,
  ): Promise<RequestInit> {
    const headers = await this.getAuthHeaders()
    if (includeContentType && !(options?.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }

    return {
      ...options,
      headers: {
        ...headers,
        ...(options?.headers || {}),
      },
    }
  }

  async setUseAuth(useAuth: boolean) {
    this.useAuth = useAuth
  }

  async get<T>(
    url: string,
    params?: Record<string, string | number>,
    options?: RequestInit,
  ): Promise<ResponseData<T>> {
    try {
      const queryString = params ? this.buildQueryString(params) : ''
      const fullUrl = `${this.baseUrl}${url}${queryString}`
      const response = await fetch(fullUrl, {
        method: 'GET',
        ...(await this.getRequestOptions(options)),
      })
      if (response.ok) {
        return { data: (await response.json()) as T, hasError: false }
      } else {
        return {
          error: await this.handleHttpError(response),
          hasError: true,
        }
      }
    } catch (error) {
      return {
        error: await this.handleHttpError(error),
        hasError: true,
      }
    }
  }

  private buildQueryString(params: Record<string, string | number>): string {
    const query = Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      )
      .join('&')
    return query ? `?${query}` : ''
  }

  async post<T>(url: string, options?: RequestInit): Promise<ResponseData<T>> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      ...(await this.getRequestOptions(options, true)),
    })
    if (response.ok) {
      return { data: (await response.json()) as T, hasError: false }
    } else {
      return {
        error: await this.handleHttpError(response),
        hasError: true,
      }
    }
  }

  async put<T>(url: string, options?: RequestInit): Promise<ResponseData<T>> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      ...(await this.getRequestOptions(options, true)),
    })

    if (response.ok) {
      try {
        return { data: (await response.json()) as T, hasError: false }
      } catch (error) {
        return { data: {} as T, hasError: false }
      }
    } else {
      return {
        error: await this.handleHttpError(response),
        hasError: true,
      }
    }
  }

  async patch<T>(url: string, options?: RequestInit): Promise<ResponseData<T>> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'PATCH',
      ...(await this.getRequestOptions(options, true)),
    })

    if (response.ok) {
      try {
        return { data: (await response.json()) as T, hasError: false }
      } catch (error) {
        return { data: {} as T, hasError: false }
      }
    } else {
      return {
        error: await this.handleHttpError(response),
        hasError: true,
      }
    }
  }

  async delete<T>(
    url: string,
    options?: RequestInit,
  ): Promise<ResponseData<T>> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      ...(await this.getRequestOptions(options, false)),
    })
    if (response.ok) {
      return { data: {} as T, hasError: false }
    } else {
      return {
        error: await this.handleHttpError(response),
        hasError: true,
      }
    }
  }

  async handleHttpError(error: unknown): Promise<ResponseError[]> {
    if (error && typeof error === 'object' && 'status' in error) {
      const responseError = error as unknown as Response

      // Se o backend retornar uma mensagem de erro específica, exibe essa mensagem
      try {
        const errorResponse = await responseError.json()

        if (errorResponse.code === 500) {
          return [
            {
              code: '500',
              message: 'Erro interno do servidor. Tente novamente mais tarde.',
            },
          ]
        }
        return errorResponse
      } catch (error) {
        switch (responseError.status) {
          case 400:
            return [
              {
                code: '400',
                message: 'Requisição inválida. Verifique os dados enviados.',
              },
            ]
          case 401:
            return [
              {
                code: '401',
                message: 'Não autorizado. Faça login novamente.',
              },
            ]
          case 403:
            return [
              {
                code: '403',
                message: 'Acesso proibido. Você não tem permissão.',
              },
            ]
          case 404:
            return [
              {
                code: '404',
                message: 'Recurso não encontrado.',
              },
            ]
          case 500:
            return [
              {
                code: '500',
                message:
                  'Erro interno do servidor. Tente novamente mais tarde.',
              },
            ]
          default:
            return [
              {
                code: '500',
                message: 'Ocorreu um erro inesperado.',
              },
            ]
        }
      }
    }

    // Caso o erro não seja do Axios (exemplo: erro de rede)
    return [
      {
        code: '500',
        message: 'Erro de conexão. Verifique sua internet.',
      },
    ]
  }
}

const baseHttp = new BaseHttp(
  env.NEXT_PUBLIC_API_BASE_URL || 'https://api.lsinjectable.com.br',
  true,
)

export default baseHttp

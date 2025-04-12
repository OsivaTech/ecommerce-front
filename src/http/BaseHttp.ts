import { env } from '@/env'
import { ResponseError } from '@/types/Error'

export class BaseHttp {
  private baseUrl: string
  private useAuth: boolean

  constructor(baseUrl: string, useAuth: boolean) {
    this.baseUrl = baseUrl
    this.useAuth = useAuth
  }

  async setUseAuth(useAuth: boolean) {
    this.useAuth = useAuth
  }

  async get<T>(url: string, options?: RequestInit): Promise<T | ResponseError> {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        method: 'GET',
        ...options,
        headers: {
          ...options?.headers,
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        return (await response.json()) as T
      } else {
        return this.handleHttpError(response)
      }
    } catch (error) {
      return this.handleHttpError(error)
    }
  }

  async post<T>(
    url: string,
    options?: RequestInit,
  ): Promise<T | ResponseError> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      method: 'POST',
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      return (await response.json()) as T
    } else {
      return this.handleHttpError(response)
    }
  }

  async put<T>(url: string, options?: RequestInit): Promise<T | ResponseError> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      method: 'PUT',
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      try {
        return (await response.json()) as T
      } catch (error) {
        return {} as T
      }
    } else {
      return this.handleHttpError(response)
    }
  }

  async patch<T>(
    url: string,
    options?: RequestInit,
  ): Promise<T | ResponseError> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      method: 'PATCH',
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      try {
        return (await response.json()) as T
      } catch (error) {
        return {} as T
      }
    } else {
      return this.handleHttpError(response)
    }
  }

  async delete<T>(
    url: string,
    options?: RequestInit,
  ): Promise<T | ResponseError> {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...options,
        method: 'DELETE',
        headers: {
          ...options?.headers,
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        return (await response.json()) as T
      } else {
        return this.handleHttpError(response)
      }
    } catch (error) {
      return this.handleHttpError(error)
    }
  }

  async handleHttpError(error: unknown): Promise<ResponseError> {
    if (error && typeof error === 'object' && 'status' in error) {
      const responseError = error as unknown as Response

      // Se o backend retornar uma mensagem de erro específica, exibe essa mensagem
      try {
        const errorResponse = await responseError.json()
        if (errorResponse.code === 500) {
          return {
            code: '500',
            message: 'Erro interno do servidor. Tente novamente mais tarde.',
          }
        }
        return {
          code: errorResponse.code,
          message: errorResponse.message,
        }
      } catch (error) {
        switch (responseError.status) {
          case 400:
            return {
              code: '400',
              message: 'Requisição inválida. Verifique os dados enviados.',
            }
          case 401:
            return {
              code: '401',
              message: 'Não autorizado. Faça login novamente.',
            }
          case 403:
            return {
              code: '403',
              message: 'Acesso proibido. Você não tem permissão.',
            }
          case 404:
            return {
              code: '404',
              message: 'Recurso não encontrado.',
            }
          case 500:
            return {
              code: '500',
              message: 'Erro interno do servidor. Tente novamente mais tarde.',
            }
          default:
            return {
              code: '500',
              message: 'Ocorreu um erro inesperado.',
            }
        }
      }
    }

    // Caso o erro não seja do Axios (exemplo: erro de rede)
    return {
      code: '500',
      message: 'Erro de conexão. Verifique sua internet.',
    }
  }
}

const baseHttp = new BaseHttp(
  env.NEXT_PUBLIC_API_BASE_URL || 'https://ecommerce-stg.osiva.tech:8443',
  false,
)

export default baseHttp

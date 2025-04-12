import { api } from './api'

export const httpService = {
  get: async (url: string, params = {}) => {
    try {
      const response = await api.get(url, { params })

      return response.data
    } catch (error: unknown) {
      throw handleHttpError(error)
    }
  },

  post: async (url: string, data: Record<string, unknown>) => {
    try {
      const response = await api.post(url, data)
      return response.data
    } catch (error: unknown) {
      throw handleHttpError(error)
    }
  },

  put: async (url: string, data: Record<string, unknown>) => {
    try {
      const response = await api.put(url, data)
      return response.data
    } catch (error: unknown) {
      throw handleHttpError(error)
    }
  },

  delete: async (url: string) => {
    try {
      const response = await api.delete(url)
      return response.data
    } catch (error: unknown) {
      throw handleHttpError(error)
    }
  },
}

const handleHttpError = (error: unknown): Error => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as {
      response?: { data?: { message?: string }; status?: number }
    }

    // Se o backend retornar uma mensagem de erro específica, exibe essa mensagem
    if (axiosError.response?.data?.message) {
      return new Error(axiosError.response.data.message)
    }
    // Se não houver uma mensagem específica, trata erros comuns baseados no código HTTP
    switch (axiosError.response?.status) {
      case 400:
        return new Error('Requisição inválida. Verifique os dados enviados.')
      case 401:
        return new Error('Não autorizado. Faça login novamente.')
      case 403:
        return new Error('Acesso proibido. Você não tem permissão.')
      case 404:
        return new Error('Recurso não encontrado.')
      case 500:
        return new Error(
          'Erro interno do servidor. Tente novamente mais tarde.',
        )
      default:
        return new Error('Ocorreu um erro inesperado.')
    }
  }

  // Caso o erro não seja do Axios (exemplo: erro de rede)
  return new Error('Erro de conexão. Verifique sua internet.')
}

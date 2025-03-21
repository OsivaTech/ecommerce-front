import api from './api'

export const httpService = {
  get: async (url: string, params = {}) => {
    try {
      const response = await api.get(url, { params })

      return response.data
    } catch (error: unknown) {
      if (error instanceof Error) {
        const customError = error as { response?: { data: unknown } } & Error
        throw customError.response?.data || customError.message
      }
      throw error
    }
  },

  post: async (url: string, data: Record<string, unknown>) => {
    try {
      const response = await api.post(url, data)
      return response.data
    } catch (error: unknown) {
      if (error instanceof Error) {
        const customError = error as { response?: { data: unknown } } & Error
        throw customError.response?.data || customError.message
      }
      throw error
    }
  },

  put: async (url: string, data: Record<string, unknown>) => {
    try {
      const response = await api.put(url, data)
      return response.data
    } catch (error: unknown) {
      if (error instanceof Error) {
        const customError = error as { response?: { data: unknown } } & Error
        throw customError.response?.data || customError.message
      }
      throw error
    }
  },

  delete: async (url: string) => {
    try {
      const response = await api.delete(url)
      return response.data
    } catch (error: unknown) {
      if (error instanceof Error) {
        const customError = error as { response?: { data: unknown } } & Error
        throw customError.response?.data || customError.message
      }
      throw error
    }
  },
}

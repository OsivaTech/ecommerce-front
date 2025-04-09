export class HttpError extends Error {
  statusCode?: number

  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = 'HttpError'
    this.statusCode = statusCode
  }
}

export const handleHttpError = (error: unknown): HttpError => {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as {
      response?: { data?: { message?: string }; status?: number }
    }

    const status = axiosError.response?.status
    const message =
      axiosError.response?.data?.message ||
      {
        400: 'Requisição inválida. Verifique os dados enviados.',
        401: 'Não autorizado. Faça login novamente.',
        403: 'Acesso proibido. Você não tem permissão.',
        404: 'Recurso não encontrado.',
        500: 'Erro interno do servidor. Tente novamente mais tarde.',
      }[status || 0] ||
      'Ocorreu um erro inesperado.'

    return new HttpError(message, status)
  }

  return new HttpError(
    error instanceof Error ? error.message : 'Erro desconhecido.',
  )
}

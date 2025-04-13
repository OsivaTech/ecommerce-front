export interface ResponseError {
  code: string
  message: string
}

export type ResponseData<T> =
  | {
      data: T
      hasError: false
    }
  | {
      hasError: true
      error: ResponseError[]
    }

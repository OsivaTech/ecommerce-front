export interface PropsRequestAuthSignIn {
  email: string
  password: string
}

export interface PropsResponseAuthSignIn {
  accessToken: string
  user: {
    id: number
    name: string
    email: string
    document: string
    documentType: string
    createdAt: string
    updatedAt: string
  }
}

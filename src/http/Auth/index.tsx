import baseHttp from '@/http/BaseHttp'
import { AuthResponse } from '@/types/api/Response/AuthResponse'

export const signIn = async (email: string, password: string) => {
  const response = await baseHttp.post<AuthResponse>('/auth/signin', {
    body: JSON.stringify({
      email,
      password,
    }),
  })

  return response
}

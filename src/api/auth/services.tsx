import { urlService } from '@/services/urlService'
import { PropsRequestAuthSignIn, PropsResponseAuthSignIn } from './types'

class AuthSigninService {
  async postAuthSignin(
    data: PropsRequestAuthSignIn,
  ): Promise<PropsResponseAuthSignIn> {
    try {
      const result = await urlService.postAuthSignin(data)

      return result
    } catch (error) {
      throw new Error('Ocorreu um erro ao obter os Categorias.')
    }
  }
}

export const authSigninService = new AuthSigninService()

import { authSigninService } from './services'
import { PropsRequestAuthSignIn, PropsResponseAuthSignIn } from './types'

class AuthSigninOperation {
  async AuthSignin(
    data: PropsRequestAuthSignIn,
  ): Promise<PropsResponseAuthSignIn> {
    return await authSigninService.postAuthSignin(data)
  }
}

export const authSigninOperation = new AuthSigninOperation()

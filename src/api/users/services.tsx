import { urlService } from '@/services/urlService'
import { PropsRequestBodyCreateUser, PropsRequestCreateUser } from './types'

class UserService {
  async postCreateUser(
    data: PropsRequestBodyCreateUser,
  ): Promise<PropsRequestCreateUser> {
    return await urlService.postCreateUser(data)
  }
}

export const userService = new UserService()

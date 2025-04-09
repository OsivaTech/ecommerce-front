import { PropsRequestBodyCreateUser, PropsRequestCreateUser } from './types'
import { userService } from './services'

class UserOperation {
  async postCreateUser(
    data: PropsRequestBodyCreateUser,
  ): Promise<PropsRequestCreateUser> {
    return await userService.postCreateUser(data)
  }
}

export const userOperation = new UserOperation()

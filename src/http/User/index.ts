import { UserEndpoint } from '@/constants/endpoints'
import baseHttp from '@/http/BaseHttp'
import { UserResponse } from '@/types/api/Response/UserResponse'

export class UserHttp {
  static async getAllUsers() {
    const response = await baseHttp.get<UserResponse>(UserEndpoint)

    if ('code' in response && 'message' in response) {
      return {
        code: response.code,
        message: response.message,
      }
    }
    return response
  }
}

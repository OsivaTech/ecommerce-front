import { UserEndpoint, UserStatusEndpoint } from '@/constants/endpoints'
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

  static async updateUserStatus(id: string, status: string) {
    const response = await baseHttp.patch<void>(UserStatusEndpoint(id), {
      body: JSON.stringify({ status }),
    })

    return response
  }
}

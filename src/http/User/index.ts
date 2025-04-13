import { UserEndpoint, UserStatusEndpoint } from '@/constants/endpoints'
import baseHttp from '@/http/BaseHttp'
import { UserResponse } from '@/types/api/Response/UserResponse'

export class UserHttp {
  static async getAllUsers() {
    const response = await baseHttp.get<UserResponse>(UserEndpoint)

    return response
  }

  static async updateUserStatus(id: string, status: string) {
    const response = await baseHttp.patch<void>(UserStatusEndpoint(id), {
      body: JSON.stringify({ status }),
    })
    
    return response
  }
}

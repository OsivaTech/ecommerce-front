import {
  UserEndpoint,
  UserMeEndpoint,
  UserIdEndpoint,
} from '@/constants/endpoints'
import baseHttp from '@/http/BaseHttp'
import { UpdateUserRequest } from '@/types/api/Request/UserRequest'
import { UserResponse } from '@/types/api/Response/UserResponse'

export class UserHttp {
  static async getAllUsers() {
    const response = await baseHttp.get<UserResponse[]>(UserEndpoint)

    return response
  }

  static async updateUserStatus(id: string, status: string) {
    const response = await baseHttp.patch<void>(UserIdEndpoint(id), {
      body: JSON.stringify({ status }),
    })

    return response
  }

  static async getCurrentUser() {
    const response = await baseHttp.get<UserResponse>(UserMeEndpoint)

    return response
  }

  static async updateUserById(id: number, data: UpdateUserRequest) {
    const response = await baseHttp.put<UserResponse>(
      UserIdEndpoint(id.toString()),
      {
        body: JSON.stringify(data),
      },
    )

    return response
  }
}

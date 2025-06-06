import {
  UserEndpoint,
  UserMeEndpoint,
  UserStatusEndpoint,
  AddressEndpoint,
} from '@/constants/endpoints'
import baseHttp from '@/http/BaseHttp'
import { UserResponse } from '@/types/api/Response/UserResponse'
import {
  AddressResponse,
  UpdateAddressRequest,
} from '@/types/api/Request/AddressRequest'

// Define payload type for profile update, can be a subset of UserResponse or a new type
export interface UpdateUserProfilePayload {
  name?: string
  email?: string
  phone?: string // Assuming phone can be updated
  // Add other updatable profile fields here if necessary
}

export class UserHttp {
  static async getAllUsers() {
    const response = await baseHttp.get<UserResponse[]>(UserEndpoint)

    return response
  }

  static async updateUserStatus(id: string, status: string) {
    const response = await baseHttp.patch<void>(UserStatusEndpoint(id), {
      body: JSON.stringify({ status }),
    })

    return response
  }

  static async getCurrentUser() {
    const response = await baseHttp.get<UserResponse>(UserMeEndpoint)

    return response
  }

  static async updateCurrentUserProfile(payload: UpdateUserProfilePayload) {
    const response = await baseHttp.patch<UserResponse>(UserMeEndpoint, {
      body: JSON.stringify(payload),
    })
    return response
  }

  static async updateUserAddress(
    addressId: number,
    payload: UpdateAddressRequest,
  ) {
    // Assuming AddressEndpoint is just '/address', so we append `/${addressId}`
    const endpoint = `${AddressEndpoint}/${addressId}`
    const response = await baseHttp.put<AddressResponse>(endpoint, {
      body: JSON.stringify(payload),
    })
    return response
  }
}

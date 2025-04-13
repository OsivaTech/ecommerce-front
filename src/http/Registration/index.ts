import {
  RegistrationApprovedEndpoint,
  RegistrationPendingEndpoint,
  RegistrationRejectedEndpoint,
} from '@/constants/endpoints'
import { RegistrationPendingResponse } from '@/types/api/Response/RegistrationResponse'
import { ResponseError } from '@/types/Error'
import baseHttp from '@/http/BaseHttp'

export class RegistrationHttp {
  static async getPendingRegistrations() {
    const response = await baseHttp.get<RegistrationPendingResponse>(
      RegistrationPendingEndpoint,
    )
    return response
  }

  static async approveRegistration(id: string) {
    const response = await baseHttp.put<void>(RegistrationApprovedEndpoint(id))
    return response
  }

  static async rejectRegistration(
    id: string,
    rejectReason: string,
  ) {
    const response = await baseHttp.put<void>(
      RegistrationRejectedEndpoint(id),
      {
        body: JSON.stringify({ rejectReason }),
      },
    )
    return response
  }
}

import {
  RegistrationApprovedEndpoint,
  RegistrationEndpoint,
  RegistrationPendingEndpoint,
  RegistrationRejectedEndpoint,
} from '@/constants/endpoints'
import { RegistrationPendingResponse } from '@/types/api/Response/RegistrationResponse'
import baseHttp from '@/http/BaseHttp'
import { PerformRegistrationRequest } from '@/types/api/Request/RegistrationRequest'

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

  static async rejectRegistration(id: string, rejectReason: string) {
    const response = await baseHttp.put<void>(
      RegistrationRejectedEndpoint(id),
      {
        body: JSON.stringify({ rejectReason }),
      },
    )
    return response
  }

  static async performRegistration(data: PerformRegistrationRequest) {
    const response = await baseHttp.post<void>(RegistrationEndpoint, {
      body: JSON.stringify(data),
    })
    return response
  }
}

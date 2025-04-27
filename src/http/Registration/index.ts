import {
  RegistrationApprovedEndpoint,
  RegistrationEndpoint,
  RegistrationPendingEndpoint,
  RegistrationRejectedEndpoint,
  UploadDocumentEndpoint,
} from '@/constants/endpoints'
import { RegistrationPendingResponse } from '@/types/api/Response/RegistrationResponse'
import baseHttp from '@/http/BaseHttp'
import { PerformRegistrationRequest } from '@/types/api/Request/RegistrationRequest'
import { FileResponse } from '@/types/api/Response/FileResponse'

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

  static async uploadDocument(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    const response = await baseHttp.post<FileResponse>(UploadDocumentEndpoint, {
      body: formData,
      headers: {},
    })
    return response
  }
}

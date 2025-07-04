import baseHttp from '@/http/BaseHttp'
import { AdvertisementEndpoint } from '@/constants/endpoints'
import { AdvertisementResponse } from '@/types/api/Response/AdvertisementResponse'
import { AdvertisementRequest } from '@/types/api/Request/AdvertisementRequest'
import { FileResponse } from '@/types/api/Response/FileResponse'

export class AdvertisementHttp {
  static async getAdvertisements(enabled: boolean = true) {
    const params = { enabled: enabled.toString() }
    const response = await baseHttp.get<AdvertisementResponse[]>(
      AdvertisementEndpoint,
      params,
      {
        cache: 'no-store',
      },
    )
    return response
  }

  static async getAllAdvertisements() {
    const response = await baseHttp.get<AdvertisementResponse[]>(
      `${AdvertisementEndpoint}`,
      {
        cache: 'no-store',
      },
    )
    return response
  }

  static async createAdvertisement(data: AdvertisementRequest) {
    const response = await baseHttp.post<AdvertisementResponse>(
      AdvertisementEndpoint,
      {
        body: JSON.stringify(data),
      },
    )
    return response
  }

  static async updateAdvertisement(id: number, data: AdvertisementRequest) {
    const response = await baseHttp.put<AdvertisementResponse>(
      `${AdvertisementEndpoint}/${id}`,
      {
        body: JSON.stringify(data),
      },
    )
    return response
  }

  static async uploadImage(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await baseHttp.post<FileResponse>(
      `${AdvertisementEndpoint}/images/upload`,
      {
        body: formData,
      },
    )
    return response
  }
}

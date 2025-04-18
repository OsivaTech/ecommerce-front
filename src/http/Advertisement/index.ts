import baseHttp from '@/http/BaseHttp'
import { AdvertisementEndpoint } from '@/constants/endpoints'
import { AdvertisementResponse } from '@/types/api/Response/AdvertisementResponse'
export class AdvertisementHttp {
  static async getAdvertisements() {
    const response = await baseHttp.get<AdvertisementResponse>(
      AdvertisementEndpoint,
      { enabled: 'true' },
    )
    return response
  }
}

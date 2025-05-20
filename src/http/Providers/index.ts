import baseHttp from '@/http/BaseHttp'
import { ResponseData } from '@/types/Error'
import { SetupMelhorEnvioRequest } from '@/types/api/Request/ProviderRequest'

export class ProvidersHttp {
  static async setupMelhorEnvio(
    body: SetupMelhorEnvioRequest,
  ): Promise<ResponseData<void>> {
    return baseHttp.post<void>(`/providers/melhorenvio/setup`, {
      body: JSON.stringify(body),
    })
  }
}

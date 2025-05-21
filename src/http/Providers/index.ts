import baseHttp from '@/http/BaseHttp'
import { ResponseData } from '@/types/Error'
import {
  SetupMelhorEnvioResponse,
  StatusMelhorEnvioResponse,
} from '@/types/api/Response/ProviderResponse'
import {
  CompleteSetupMelhorEnvioRequest,
  SetupMelhorEnvioRequest,
} from '@/types/api/Request/ProviderRequest'

export class ProvidersHttp {
  static async setupMelhorEnvio(
    body: SetupMelhorEnvioRequest,
  ): Promise<ResponseData<SetupMelhorEnvioResponse>> {
    return baseHttp.post<SetupMelhorEnvioResponse>(
      `/providers/melhorenvio/setup`,
      {
        body: JSON.stringify(body),
      },
    )
  }

  static async completeSetupMelhorEnvio(
    body: CompleteSetupMelhorEnvioRequest,
  ): Promise<ResponseData<void>> {
    return baseHttp.post<void>(`/providers/melhorenvio/setup/complete`, {
      body: JSON.stringify(body),
    })
  }

  static async getStatusMelhorEnvio(): Promise<
    ResponseData<StatusMelhorEnvioResponse>
  > {
    return baseHttp.get<StatusMelhorEnvioResponse>(
      `/providers/melhorenvio/status`,
    )
  }
}

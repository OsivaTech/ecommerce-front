import baseHttp from '@/http/BaseHttp'
import { SettingResponse } from '@/types/api/Response/SettingResponse'
import { ResponseData } from '@/types/Error'
import { SettingsEndpoint, SettingsByIdEndpoint } from '@/constants/endpoints'

export class SettingsHttp {
  static async getSettings(): Promise<ResponseData<SettingResponse[]>> {
    return baseHttp.get<SettingResponse[]>(SettingsEndpoint)
  }

  static async getSettingById(
    id: number,
  ): Promise<ResponseData<SettingResponse>> {
    return baseHttp.get<SettingResponse>(SettingsByIdEndpoint(id.toString()))
  }

  static async updateSetting(
    id: number,
    data: { name: string; value: string; type: string },
  ) {
    return baseHttp.put<SettingResponse>(`/settings/${id}`, {
      body: JSON.stringify(data),
    })
  }
}

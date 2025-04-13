import baseHttp from '@/http/BaseHttp'
import { CategoryEndpoint } from '@/constants/endpoints'
import { CategoryResponse } from '@/types/api/Response/CategoryResponse'
export class CategoryHttp {
  static async getAllCategory() {
    const response = await baseHttp.get<CategoryResponse>(CategoryEndpoint)
    return response
  }
}

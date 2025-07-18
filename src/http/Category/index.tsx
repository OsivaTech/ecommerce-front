import baseHttp from '@/http/BaseHttp'
import { CategoryEndpoint } from '@/constants/endpoints'
import {
  CategoryResponse,
  CreateCategoryResponse,
} from '@/types/api/Response/CategoryResponse'
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from '@/types/api/Request/CategoryRequest'

export class CategoryHttp {
  static async getAllCategories() {
    const response = await baseHttp.get<CategoryResponse>(CategoryEndpoint)
    return response
  }

  static async createCategory(data: CreateCategoryRequest) {
    const response = await baseHttp.post<CreateCategoryResponse>(
      CategoryEndpoint,
      {
        body: JSON.stringify(data),
      },
    )
    return response
  }

  static async updateCategory(id: number, data: UpdateCategoryRequest) {
    const response = await baseHttp.put<CreateCategoryResponse>(
      `${CategoryEndpoint}/${id}`,
      {
        body: JSON.stringify(data),
      },
    )
    return response
  }

  static async deleteCategory(id: number) {
    const response = await baseHttp.delete(`${CategoryEndpoint}/${id}`)
    return response
  }
}

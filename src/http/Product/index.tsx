import { ProductEndpoint } from '@/constants/endpoints'
import baseHttp from '@/http/BaseHttp'
import { Product, ProductResponse } from '@/types/api/Response/ProductResponse'
import { ResponseData } from '@/types/Error'

export class ProductHttp {
  static async getProducts(): Promise<ResponseData<ProductResponse>> {
    const response = await baseHttp.get<ProductResponse>(ProductEndpoint)
    return response
  }

  static async getProduct(id: string): Promise<Product> {
    const response = await fetch(`/api/products/${id}`)
    return response.json()
  }
}

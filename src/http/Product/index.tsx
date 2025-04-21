import { ProductEndpoint, ProductFeaturedEndpoint } from '@/constants/endpoints'
import baseHttp from '@/http/BaseHttp'
import {
  CreateProductRequest,
  UpdateProductRequest,
} from '@/types/api/Request/ProductRequest'
import {
  Product,
  ProductResponse,
  CreateProductResponse,
  UpdateProductResponse,
  ProductFeaturedResponse,
} from '@/types/api/Response/ProductResponse'
import { ResponseData } from '@/types/Error'

export class ProductHttp {
  static async getProducts(): Promise<ResponseData<ProductResponse>> {
    const response = await baseHttp.get<ProductResponse>(ProductEndpoint)
    return response
  }

  static async getFeaturedProducts(): Promise<
    ResponseData<ProductFeaturedResponse>
  > {
    const response = await baseHttp.get<ProductFeaturedResponse>(
      ProductFeaturedEndpoint,
    )

    return response
  }

  static async getProduct(id: string): Promise<Product> {
    const response = await fetch(`/api/products/${id}`)
    return response.json()
  }

  static async getProductById(id: string): Promise<ResponseData<Product>> {
    const response = await baseHttp.get<Product>(`${ProductEndpoint}/${id}`)
    return response
  }

  static async createProduct(
    data: CreateProductRequest,
  ): Promise<ResponseData<CreateProductResponse>> {
    const response = await baseHttp.post<CreateProductResponse>(
      ProductEndpoint,
      {
        body: JSON.stringify(data),
      },
    )
    return response
  }

  static async updateProduct(
    id: number,
    data: UpdateProductRequest,
  ): Promise<ResponseData<UpdateProductResponse>> {
    const response = await baseHttp.put<UpdateProductResponse>(
      `${ProductEndpoint}/${id}`,
      {
        body: JSON.stringify(data),
      },
    )
    return response
  }

  static async deleteProduct(id: string): Promise<ResponseData<void>> {
    const response = await baseHttp.delete<void>(`${ProductEndpoint}/${id}`)
    return response
  }
}

import { urlService } from '@/services/urlService'
import { PropsProductsAll, PropsProductsFeatured } from './types'

class ProductService {
  async getProductsFeatured(): Promise<PropsProductsFeatured[]> {
    try {
      const result = await urlService.getProductsFeatured()

      return result
    } catch (error) {
      throw new Error('Ocorreu um erro ao obter os Produtos.')
    }
  }

  async getProductsAll(): Promise<PropsProductsAll[]> {
    try {
      const result = await urlService.getProductsAll()

      return result
    } catch (error) {
      throw new Error('Ocorreu um erro ao obter os Produtos.')
    }
  }
}

export const productService = new ProductService()

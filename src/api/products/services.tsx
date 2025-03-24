import { userService } from '@/services/userService'
import { PropsProductsAll, PropsProductsFeatured } from './types'

class GetProductService {
  async getProductsFeatured(): Promise<PropsProductsFeatured[]> {
    try {
      const result = await userService.getProductsFeatured()

      return result
    } catch (error) {
      throw new Error('Ocorreu um erro ao obter os Produtos.')
    }
  }

  async getProductsAll(): Promise<PropsProductsAll[]> {
    try {
      const result = await userService.getProductsAll()

      return result
    } catch (error) {
      throw new Error('Ocorreu um erro ao obter os Produtos.')
    }
  }
}

export const getProductService = new GetProductService()

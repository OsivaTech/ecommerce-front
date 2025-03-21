import { userService } from '@/services/userService'
import { PropsProducts } from './types'

class GetProductService {
  async getProducts(): Promise<PropsProducts[]> {
    try {
      const result = await userService.getProducts()

      return result
    } catch (error) {
      throw new Error('Ocorreu um erro ao obter os Produtos.')
    }
  }
}

export const getProductService = new GetProductService()

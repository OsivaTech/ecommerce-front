import { getProductService } from './services'
import { PropsProductsFeatured } from './types'

class GetProductOperation {
  async Featured(): Promise<PropsProductsFeatured[]> {
    try {
      const result = await getProductService.getProductsFeatured()
      return result
    } catch (error) {
      throw new Error('Ocorreu ao buscar Produtos')
    }
  }

  async All(): Promise<PropsProductsFeatured[]> {
    try {
      const result = await getProductService.getProductsAll()
      return result
    } catch (error) {
      throw new Error('Ocorreu ao buscar Produtos')
    }
  }
}

export const getProductOperation = new GetProductOperation()

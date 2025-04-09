import { productService } from './services'
import { PropsProductsFeatured } from './types'

class ProductOperation {
  async Featured(): Promise<PropsProductsFeatured[]> {
    try {
      const result = await productService.getProductsFeatured()
      return result
    } catch (error) {
      throw new Error('Ocorreu ao buscar Produtos')
    }
  }

  async All(): Promise<PropsProductsFeatured[]> {
    try {
      const result = await productService.getProductsAll()
      return result
    } catch (error) {
      throw new Error('Ocorreu ao buscar Produtos')
    }
  }
}

export const productOperation = new ProductOperation()

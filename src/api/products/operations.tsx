import { getProductService } from './services'
import { PropsProducts } from './types'

async function getProductsOperation(): Promise<PropsProducts[]> {
  try {
    const result = await getProductService.getProducts()
    return result
  } catch (error) {
    throw new Error('Ocorreu ao buscar Produtos')
  }
}

export { getProductsOperation }

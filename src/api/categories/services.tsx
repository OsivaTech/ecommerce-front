import { urlService } from '@/services/urlService'
import { PropsCategoriesAll } from './types'

class CategorieService {
  async getCategoriesAll(): Promise<PropsCategoriesAll[]> {
    try {
      const result = await urlService.getCategoriesAll()

      return result
    } catch (error) {
      throw new Error('Ocorreu um erro ao obter os Categorias.')
    }
  }
}

export const categorieService = new CategorieService()

import { getCategorieService } from './services'
import { PropsCategoriesAll } from './types'

class GetCategorieOperation {
  async CategoriesAll(): Promise<PropsCategoriesAll[]> {
    try {
      const result = await getCategorieService.getCategoriesAll()
      return result
    } catch (error) {
      throw new Error('Ocorreu ao buscar Categories')
    }
  }
}

export const getCategorieOperation = new GetCategorieOperation()

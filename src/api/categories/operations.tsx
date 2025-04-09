import { categorieService } from './services'
import { PropsCategoriesAll } from './types'

class CategorieOperation {
  async CategoriesAll(): Promise<PropsCategoriesAll[]> {
    try {
      const result = await categorieService.getCategoriesAll()
      return result
    } catch (error) {
      throw new Error('Ocorreu ao buscar Categories')
    }
  }
}

export const categorieOperation = new CategorieOperation()

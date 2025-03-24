import { userService } from '@/services/userService'
import { PropsCategoriesAll } from './types'

class GetCategorieService {
  async getCategoriesAll(): Promise<PropsCategoriesAll[]> {
    try {
      const result = await userService.getCategoriesAll()

      return result
    } catch (error) {
      throw new Error('Ocorreu um erro ao obter os Categorias.')
    }
  }
}

export const getCategorieService = new GetCategorieService()

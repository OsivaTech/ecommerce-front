import { httpService } from './httpService'
import { PropsResponsePostalAddress } from './type'

export const urlService = {
  getProductsAll: () => httpService.get('/products'),
  getProductsFeatured: () => httpService.get('/products/featured'),
  getCategoriesAll: () => httpService.get('/categories'),
  getPostalAddress: ({ postalcode }: PropsResponsePostalAddress) =>
    httpService.get(`/address/postalcode/${postalcode}`),

  /*   getUserById: (id: number) => httpService.get(`/users/${id}`),
  createUser: (data: any) => httpService.post("/users", data),
  updateUser: (id: number, data: any) => httpService.put(`/users/${id}`, data),
  deleteUser: (id: number) => httpService.delete(`/users/${id}`), */
}

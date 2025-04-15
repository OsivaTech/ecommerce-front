export const RegistrationPendingEndpoint = '/registration'
export const RegistrationApprovedEndpoint = (id: string) =>
  `/registration/${id}/approve`
export const RegistrationRejectedEndpoint = (id: string) =>
  `/registration/${id}/reject`
export const RegistrationEndpoint = '/registration'
export const OrderEndpoint = '/orders'
export const UserEndpoint = '/users'
export const UserStatusEndpoint = (id: string) => `/users/${id}`
export const ProductEndpoint = '/products'
export const ProductFeaturedEndpoint = '/products/featured'
export const CategoryEndpoint = '/categories'
export const FileEndpoint = '/files'

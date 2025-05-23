export const RegistrationPendingEndpoint = '/registration'
export const RegistrationApprovedEndpoint = (id: string) =>
  `/registration/${id}/approve`
export const RegistrationRejectedEndpoint = (id: string) =>
  `/registration/${id}/reject`
export const RegistrationEndpoint = '/registration'
export const OrderEndpoint = '/orders'
export const OrderCompleteEndpoint = (id: number) =>
  `${OrderEndpoint}/${id}/complete`
export const UserEndpoint = '/users'
export const UserMeEndpoint = '/users/me'
export const UserStatusEndpoint = (id: string) => `/users/${id}`
export const ProductEndpoint = '/products'
export const ProductFeaturedEndpoint = '/products/featured'
export const CategoryEndpoint = '/categories'
export const FileEndpoint = '/files'
export const AdvertisementEndpoint = '/advertisement'
export const ShippingSimulateEndpoint = '/shipping/simulate'
export const UploadDocumentEndpoint = '/registration/documents/upload'
export const UploadProductImageEndpoint = '/products/images/upload'
export const SettingsEndpoint = '/settings'
export const SettingsByIdEndpoint = (id: string) => `${SettingsEndpoint}/${id}`
export const StockMovementsEndpoint = '/stock'

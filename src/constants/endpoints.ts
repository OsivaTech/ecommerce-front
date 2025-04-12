export const RegistrationPendingEndpoint = '/registration'
export const RegistrationApprovedEndpoint = (id: string) =>
  `/registration/${id}/approve`
export const RegistrationRejectedEndpoint = (id: string) =>
  `/registration/${id}/reject`
export const OrderEndpoint = '/orders'
export const UserEndpoint = '/users'

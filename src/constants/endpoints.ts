import { env } from '@/env'

const apiBaseUrl = env.NEXT_PUBLIC_API_BASE_URL

export const RegistrationPendingEndpoint = `${apiBaseUrl}/registration`
export const RegistrationApprovedEndpoint = (id: string) =>
  `${apiBaseUrl}/registration/${id}/approve`
export const RegistrationRejectedEndpoint = (id: string) =>
  `${apiBaseUrl}/registration/${id}/reject`
export const OrderEndpoint = `${apiBaseUrl}/orders`

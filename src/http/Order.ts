import { OrderEndpoint } from '@/constants/endpoints'
import { get } from '@/lib/api'
import { OrderResponse } from '@/types/api/Response/OrderResponse'

export async function getOrders() {
  const response = await get(OrderEndpoint, {}, false)

  const data: OrderResponse = await response.json()

  return data
}

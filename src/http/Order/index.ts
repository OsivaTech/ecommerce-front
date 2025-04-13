import { OrderEndpoint } from '@/constants/endpoints'
import { OrderResponse } from '@/types/api/Response/OrderResponse'
import baseHttp from '../BaseHttp'

export class ApiOrder {
  static async getOrders() {
    const response = await baseHttp.get<OrderResponse>(OrderEndpoint)
    return response
  }
}

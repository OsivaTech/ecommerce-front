import { OrderEndpoint } from '@/constants/endpoints'
import {
  CreateOrderResponse,
  OrderResponse,
} from '@/types/api/Response/OrderResponse'
import baseHttp from '../BaseHttp'
import { CreateOrderRequest } from '@/types/api/Request/CreateOrderRequest'

export class OrderHttp {
  private static http = baseHttp

  static async getOrders() {
    await this.http.setUseAuth(true)
    const response = await this.http.get<OrderResponse>(OrderEndpoint)
    return response
  }

  static async createOrder(data: CreateOrderRequest) {
    await this.http.setUseAuth(true)
    const response = await this.http.post<CreateOrderResponse>(OrderEndpoint, {
      body: JSON.stringify(data),
    })
    return response
  }
}

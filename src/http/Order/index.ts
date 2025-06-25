import {
  OrderCompleteEndpoint,
  OrderEndpoint,
  OrderMyEndpoint,
} from '@/constants/endpoints'
import {
  CreateOrderResponse,
  Order,
  OrderResponse,
  OrderShipmentDetailsResponse,
} from '@/types/api/Response/OrderResponse'
import baseHttp from '../BaseHttp'
import {
  CompleteOrderRequest,
  CreateOrderRequest,
  DispatchOrderRequest,
} from '@/types/api/Request/OrderRequest'

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

  static async completeOrder(id: number, data: CompleteOrderRequest) {
    await this.http.setUseAuth(true)
    await this.http.patch(OrderCompleteEndpoint(id), {
      body: JSON.stringify(data),
    })
    return true
  }

  static async dispatchOrder(id: number, data: DispatchOrderRequest) {
    await this.http.setUseAuth(true)
    const response = await this.http.patch<OrderShipmentDetailsResponse>(
      `${OrderEndpoint}/${id}/dispatch`,
      {
        body: JSON.stringify(data),
      },
    )
    return response
  }

  static async updateStatus(id: number, status: string) {
    await this.http.setUseAuth(true)
    const response = await this.http.patch(`${OrderEndpoint}/${id}`, {
      body: JSON.stringify({ status }),
    })
    return response
  }

  static async getMyOrders() {
    await this.http.setUseAuth(true)
    const response = await this.http.get<OrderResponse>(OrderMyEndpoint)
    return response
  }

  static async getOrderById(id: number) {
    await this.http.setUseAuth(true)
    const response = await this.http.get<Order>(`${OrderEndpoint}/${id}`)
    return response
  }

  static async payOrder(id: number) {
    await this.http.setUseAuth(true)
    const response = await this.http.post<string>(`${OrderEndpoint}/${id}/pay`)
    return response
  }
}

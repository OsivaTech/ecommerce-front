import baseHttp from '@/http/BaseHttp'
import { StockMovementsEndpoint } from '@/constants/endpoints'
import { StockMovementResponse } from '@/types/api/Response/StockResponse'
import { CreateStockMovementRequest } from '@/types/api/Request/StockRequest'

export class StockMovementsHttp {
  static async createStockMovement(data: CreateStockMovementRequest) {
    return baseHttp.post<StockMovementResponse>(StockMovementsEndpoint, {
      body: JSON.stringify(data),
    })
  }
}

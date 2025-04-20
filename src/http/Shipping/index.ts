import baseHttp from '../BaseHttp'
import { ShippingSimulateEndpoint } from '@/constants/endpoints'
import { ShipmentSimulationResponse } from '@/types/api/Response/ShipmentSimulationResponse'
import { ShipmentSimulationRequest } from '@/types/api/Request/ShipmentSimulationRequest'

export class ShippingHttp {
  static async calculate(data: ShipmentSimulationRequest) {
    const response = await baseHttp.post<ShipmentSimulationResponse[]>(
      ShippingSimulateEndpoint,
      {
        body: JSON.stringify(data),
      },
    )

    return response
  }
}

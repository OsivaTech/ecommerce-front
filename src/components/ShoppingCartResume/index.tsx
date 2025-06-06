'use client'
import { CartItem, useCart } from '@/context/useCart'
import { Button } from '../ui/button'
import Link from 'next/link'
import { APP_LINKS } from '../../../constants'
import { ChevronRight } from 'lucide-react'
import { formatPrice } from '@/utils/mask'
import Input from '../Input/Input'
import { OrderHttp } from '@/http/Order'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ShipmentSimulationRequest } from '@/types/api/Request/ShipmentSimulationRequest'
import { ShipmentSimulationResponse } from '@/types/api/Response/ShipmentSimulationResponse'
import { ShippingHttp } from '@/http/Shipping'

export const ShoppingCartResume = () => {
  const { items } = useCart()
  const router = useRouter()
  const [postalCode, setPostalCode] = useState('')
  const [isLoadingSimulation, setIsLoadingSimulation] = useState(false)
  const [freightSimulations, setFreightSimulations] = useState<
    ShipmentSimulationResponse[]
  >([])
  const [selectedFreight, setSelectedFreight] = useState<{
    carrier: string
    option: {
      serviceId?: number
      type?: string
      price?: number
      sla?: number
    }
  } | null>(null)

  async function createOrder(items: CartItem[]): Promise<void> {
    const response = await OrderHttp.createOrder({
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price ?? 0,
      })),
      freightServiceId: selectedFreight?.option.serviceId ?? 0,
      freightPrice: selectedFreight?.option.price ?? 0,
    })

    if (response.hasError) {
      console.error('Error creating order:', response.error)
    } else {
      router.push(response.data.paymentPageUrl)
    }
  }

  async function simulateFreight() {
    if (!postalCode) return

    setIsLoadingSimulation(true)
    try {
      const simulationRequest: ShipmentSimulationRequest = {
        postalCode: postalCode.replace(/\D/g, ''),
        products: items.map((item) => ({
          id: item.product.id,
          quantity: item.quantity,
        })),
      }

      const response = await ShippingHttp.calculate(simulationRequest)

      if (response.hasError) {
        console.error('Erro ao simular frete:', response.error)
      } else {
        setFreightSimulations(response.data)

        // Verifica se há apenas uma transportadora com uma opção
        if (
          response.data.length === 1 &&
          response.data[0]?.options &&
          response.data[0].options.length === 1 &&
          response.data[0].options[0]
        ) {
          setSelectedFreight({
            carrier: response.data[0].name ?? '',
            option: response.data[0].options[0],
          })
        } else {
          setSelectedFreight(null)
        }
      }
    } catch (error) {
      console.error('Erro ao simular frete:', error)
    } finally {
      setIsLoadingSimulation(false)
    }
  }

  return (
    <div className="flex flex-col w-full justify-between border rounded-lg bg-background p-4 gap-4">
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.product.id} className="flex flex-row justify-between">
            <p className="text-sm">
              {item.product.name}: ({item.quantity}x)
            </p>
            <p className="text-sm">{formatPrice(item.product.price ?? 0)}</p>
          </div>
        ))}
        <div className="flex justify-between items-center border-t pt-2">
          <p className="text-sm">Frete:</p>
          <p className="text-sm">
            {formatPrice(selectedFreight?.option.price ?? 0)}
          </p>
        </div>
        <div className="flex justify-between items-center pt-2">
          <p className="text-lg font-bold">Subtotal:</p>
          <p className="text-lg font-bold">
            {formatPrice(
              items.reduce(
                (acc, item) => acc + (item.product.price ?? 0) * item.quantity,
                0,
              ) + (selectedFreight?.option.price ?? 0),
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2 items-end">
          <div className="flex flex-col gap-1 flex-1">
            <p className="text-sm">Estime o frete e prazo</p>
            <Input
              mask="cep"
              placeholder="30494-170"
              className="h-10"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <Button
            variant="primary"
            className="py-2 px-4 h-10"
            onClick={simulateFreight}
            disabled={isLoadingSimulation || !postalCode}
          >
            {isLoadingSimulation ? 'Calculando...' : 'Consultar'}
          </Button>
        </div>
        {freightSimulations.length > 0 && (
          <div className="flex flex-col gap-2">
            {freightSimulations.map((simulation) => (
              <div key={simulation.name} className="border rounded-md p-3">
                <p className="font-semibold mb-2">{simulation.name}</p>
                <div className="flex flex-col gap-2">
                  {simulation.options?.map((option) => (
                    <div
                      key={`${simulation.name}-${option.type}`}
                      className={`
                p-3 border-2 rounded-lg cursor-pointer 
                transition-all duration-200 ease-in-out
                ${
                  selectedFreight?.carrier === simulation.name &&
                  selectedFreight?.option.type === option.type
                    ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
                      onClick={() =>
                        setSelectedFreight({
                          carrier: simulation.name ?? '',
                          option,
                        })
                      }
                    >
                      <div className="flex justify-between items-center relative">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div
                              className={`
                        w-4 h-4 rounded-full border-2 flex items-center justify-center
                        ${
                          selectedFreight?.carrier === simulation.name &&
                          selectedFreight?.option.type === option.type
                            ? 'border-primary'
                            : 'border-gray-300'
                        }
                      `}
                            >
                              {selectedFreight?.carrier === simulation.name &&
                                selectedFreight?.option.type ===
                                  option.type && (
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                )}
                            </div>
                            <p className="font-medium text-gray-900">
                              {option.type}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">
                            Entrega em até {option.sla} dias úteis
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900 ml-4">
                          {formatPrice(option.price ?? 0)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <Button
          onClick={() => createOrder(items)}
          variant="primary"
          className="py-3 px-6"
          disabled={!selectedFreight}
        >
          Finalizar compra
        </Button>
        <Link
          href={APP_LINKS.STORE()}
          className="flex items-center justify-end font-semibold"
        >
          Continuar comprando
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

'use client'
import { CartItem, useCart } from '@/context/useCart'
import { Button } from '../ui/button'
import Link from 'next/link'
import { APP_LINKS, APP_LINKS_ACCOUNT } from '../../../constants'
import { ChevronRight } from 'lucide-react'
import { formatPrice } from '@/utils/mask'
import { OrderHttp } from '@/http/Order'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import { UserResponse } from '@/types/api/Response/UserResponse'
import { useDebounce } from '@/hook/useDebounce'
import { showToast } from '@/utils/toast'

import { ShipmentSimulationRequest } from '@/types/api/Request/ShipmentSimulationRequest'
import { ShipmentSimulationResponse } from '@/types/api/Response/ShipmentSimulationResponse'
import { ShippingHttp } from '@/http/Shipping'

interface ShoppingCartResumeProps {
  currentUser: UserResponse | null
  isLoadingUser: boolean
}

export const ShoppingCartResume = ({
  currentUser,
  isLoadingUser,
}: ShoppingCartResumeProps) => {
  const { items } = useCart()
  const router = useRouter()
  const [isLoadingSimulation, setIsLoadingSimulation] = useState(false)
  const [isLoadingOrder, setIsLoadingOrder] = useState(false)
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

  // Debounce dos itens do carrinho com delay de 1 segundo
  const debouncedItems = useDebounce(items, 1000)

  async function createOrder(items: CartItem[]): Promise<void> {
    setIsLoadingOrder(true)
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
      showToast.error(response.error?.[0]?.message ?? 'Erro ao criar pedido')
    } else {
      router.push(response.data.paymentPageUrl)
    }
    setIsLoadingOrder(false)
  }

  const simulateFreight = useCallback(async () => {
    if (!currentUser?.address?.postalCode || debouncedItems.length === 0) return

    setIsLoadingSimulation(true)
    try {
      const simulationRequest: ShipmentSimulationRequest = {
        postalCode: currentUser.address.postalCode.replace(/\D/g, ''),
        products: debouncedItems.map((item) => ({
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
  }, [currentUser?.address?.postalCode, debouncedItems])

  // Simula frete automaticamente quando o usuário é carregado ou quando os itens mudam (com debounce)
  useEffect(() => {
    if (
      !isLoadingUser &&
      currentUser?.address?.postalCode &&
      debouncedItems.length > 0
    ) {
      simulateFreight()
    }
  }, [
    isLoadingUser,
    currentUser?.address?.postalCode,
    debouncedItems,
    simulateFreight,
  ])

  return (
    <div className="flex flex-col w-full justify-between border rounded-lg bg-background p-4 gap-4">
      <h3 className="text-xl font-bold mb-2">Resumo da compra</h3>
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
            {isLoadingSimulation
              ? 'Calculando...'
              : formatPrice(selectedFreight?.option.price ?? 0)}
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
        {!currentUser?.address?.postalCode && !isLoadingUser && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              Para calcular o frete, você precisa ter um endereço cadastrado.
            </p>
          </div>
        )}
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
                      <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-between items-center w-full">
                          <div className="flex items-center gap-2 min-w-0 flex-1">
                            <div
                              className={`
                        w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0
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
                            <p className="font-medium w-20 text-gray-900 min-w-0 truncate">
                              {option.type}
                            </p>
                            {/* Prazo de entrega na mesma linha em md+ */}
                            <span className="hidden md:inline text-sm text-gray-600 whitespace-nowrap ml-1">
                              {option.serviceId === 999
                                ? 'Entrega em até 4 horas'
                                : `Entrega em até ${option.sla} dias úteis`}
                            </span>
                          </div>
                          <p className="font-semibold text-gray-900 ml-4 flex-shrink-0">
                            {formatPrice(option.price ?? 0)}
                          </p>
                        </div>
                        {/* Prazo de entrega abaixo apenas em telas sm */}
                        <span className="text-sm text-gray-600 mt-1 w-full md:hidden">
                          {option.serviceId === 999
                            ? 'Entrega em até 4 horas'
                            : `Entrega em até ${option.sla} dias úteis`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Endereço de entrega */}
        <div className="mb-2 p-3 border rounded-md flex flex-col">
          <div className="flex justify-between">
            <span className="font-semibold text-base">Endereço de entrega</span>
            <Button
              variant="outline"
              onClick={() =>
                (window.location.href = APP_LINKS_ACCOUNT.ADDRESS())
              }
            >
              Alterar endereço
            </Button>
          </div>
          {isLoadingUser ? (
            <span className="text-sm text-muted">Carregando endereço...</span>
          ) : currentUser?.address ? (
            <div className="text-sm text-gray-700">
              <div>
                {currentUser.address.street}
                {currentUser.address.number
                  ? `, ${currentUser.address.number}`
                  : ''}
                {currentUser.address.complement
                  ? `, ${currentUser.address.complement}`
                  : ''}
              </div>
              <div>
                {currentUser.address.neighborhood
                  ? `${currentUser.address.neighborhood}, `
                  : ''}
                {currentUser.address.city} - {currentUser.address.state}
              </div>
              <div>CEP: {currentUser.address.postalCode}</div>
            </div>
          ) : (
            <span className="text-sm text-muted">
              Nenhum endereço cadastrado
            </span>
          )}
        </div>
        {/* Fim endereço de entrega */}
        <Button
          onClick={() => createOrder(items)}
          variant="primary"
          className="py-3 px-6"
          disabled={!selectedFreight || isLoadingSimulation || isLoadingOrder}
        >
          {isLoadingOrder ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Finalizando...
            </div>
          ) : (
            'Finalizar compra'
          )}
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

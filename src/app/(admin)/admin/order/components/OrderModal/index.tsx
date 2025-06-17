'use client'

import { Modal } from '@/components/Modal'
import { Card } from '@/components/ui/card'
import { StatusBadge } from '@/components/StatusBadge'
import { formatDate } from '@/utils/date'
import { formatPrice } from '@/utils/mask'
import {
  Order,
  OrderShipmentDetailsResponse,
} from '@/types/api/Response/OrderResponse'
import { Button } from '@/components/ui/button'
import { OrderHttp } from '@/http/Order'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { Separator } from '@/components/ui/separator'
import { OrderStatus } from '@/types/api/Types/OrderStatus'

interface OrderModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  order: Order
}

export const OrderModal = ({ open, setOpen, order }: OrderModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [shipmentDetails, setShipmentDetails] =
    useState<OrderShipmentDetailsResponse | null>(order.shipmentDetails ?? null)

  useEffect(() => {
    setShipmentDetails(order.shipmentDetails ?? null)
  }, [order])

  const handleDispatch = async () => {
    try {
      setIsLoading(true)
      const response = await OrderHttp.dispatchOrder(order.id)
      if (!response.hasError) {
        setShipmentDetails(response.data)
        toast.success('Pedido despachado com sucesso!')
      } else {
        toast.error('Erro ao despachar pedido')
      }
    } catch (error) {
      toast.error('Erro ao despachar pedido')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAsShipped = async () => {
    try {
      setIsLoading(true)
      const response = await OrderHttp.updateStatus(order.id, 'Shipped')
      if (!response.hasError) {
        toast.success('Pedido marcado como enviado!')
        setOpen(false)
      } else {
        toast.error('Erro ao marcar como enviado')
      }
    } catch (error) {
      toast.error('Erro ao marcar como enviado')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusConfig = (status: string) => {
    const statusMap: Record<
      string,
      {
        status: OrderStatus
        label: string
      }
    > = {
      None: { status: 'None', label: 'Nenhum' },
      Pending: { status: 'Pending', label: 'Pendente' },
      Processing: { status: 'Processing', label: 'Em Separação' },
      WaitingShipment: { status: 'WaitingShipment', label: 'Aguardando Envio' },
      Shipped: { status: 'Shipped', label: 'Enviado' },
      Completed: { status: 'Completed', label: 'Concluído' },
      Canceled: { status: 'Canceled', label: 'Cancelado' },
    }
    return statusMap[status] || { status: 'None', label: status }
  }

  const statusConfig = getStatusConfig(order.status)
  const showShipmentDetails =
    order.status === 'WaitingShipment' ||
    order.status === 'Shipped' ||
    order.status === 'Completed' ||
    shipmentDetails

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title={`Pedido #${order.id}`}
      description={`Criado em ${formatDate(order.createdAt)}`}
      className="w-5xl"
    >
      <div className="grid gap-3">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold">Informações do Cliente</h3>
            <StatusBadge
              status={statusConfig.status}
              label={statusConfig.label}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Nome</p>
              <p className="text-sm font-medium">{order.user.name}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium">{order.user.email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Telefone</p>
              <p className="text-sm font-medium">{order.user.phone}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Documento Pessoal</p>
              <p className="text-sm font-medium">
                {order.user.personalDocument.type}:{' '}
                {order.user.personalDocument.number}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Documento Profissional
              </p>
              <p className="text-sm font-medium">
                {order.user.professionalDocument.type}:{' '}
                {order.user.professionalDocument.number}
              </p>
            </div>
            {order.status === 'Processing' && (
              <div className="flex items-end">
                <Button
                  onClick={handleDispatch}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Despachando...' : 'Despachar Pedido'}
                </Button>
              </div>
            )}
            {order.status === 'WaitingShipment' && (
              <div className="flex items-end">
                <Button
                  onClick={handleMarkAsShipped}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? 'Marcando...' : 'Marcar como enviado'}
                </Button>
              </div>
            )}
          </div>
        </Card>

        {showShipmentDetails && (
          <Card className="p-4">
            <h3 className="text-base font-semibold mb-2">Detalhes do Envio</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  ID do Pedido Melhor Envio
                </p>
                <p className="text-sm font-medium">
                  {shipmentDetails?.melhorEnvioOrderId}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Protocolo</p>
                <p className="text-sm font-medium">
                  {shipmentDetails?.melhorEnvioProtocol}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground">URL da Etiqueta</p>
                <a
                  href={shipmentDetails?.melhorEnvioLabelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  {shipmentDetails?.melhorEnvioLabelUrl}
                </a>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-4">
          <h3 className="text-base font-semibold mb-2">Itens do Pedido</h3>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.productId}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.productName}</p>
                    <p className="text-xs text-muted-foreground">
                      Quantidade: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </div>
                <Separator className="my-1" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">Total</h3>
            <p className="text-lg font-bold">
              {formatPrice(order.totalAmount)}
            </p>
          </div>
        </Card>
      </div>
    </Modal>
  )
}

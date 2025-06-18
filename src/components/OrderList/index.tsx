import { StatusBadge } from '@/components/StatusBadge'
import { Separator } from '@/components/ui/separator'
import { OrderResponse, Order } from '@/types/api/Response/OrderResponse'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { OrderProductItem } from '@/components/OrderProductItem'

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return (
    date.toLocaleDateString('pt-BR') +
    ' às ' +
    date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  )
}

function statusLabel(status: string) {
  switch (status) {
    case 'Completed':
      return 'Entregue'
    case 'Shipped':
      return 'Enviado'
    case 'Pending':
      return 'Pendente'
    case 'Canceled':
      return 'Cancelado'
    default:
      return status
  }
}

type Props = {
  orders: OrderResponse
}

export default function OrderList({ orders }: Props) {
  if (!orders.length) return <div>Você ainda não fez nenhum pedido.</div>

  return (
    <div className="flex flex-col gap-10">
      {orders.map((order: Order) => (
        <div
          key={order.id}
          className="transition-all duration-200 bg-white border border-gray-100 rounded-3xl shadow-[0_2px_16px_0_rgba(0,0,0,0.04)] hover:shadow-lg group overflow-hidden"
        >
          {/* Cabeçalho do pedido */}
          <div className="flex flex-col md:flex-row md:items-center justify-between px-8 py-5 bg-white border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                Pedido #{order.id}
              </span>
              <span className="ml-0 md:ml-8 text-gray-500 text-base">
                {formatDate(order.createdAt)}
              </span>
            </div>
            <div className="mt-3 md:mt-0 flex items-center gap-2">
              <StatusBadge
                status={order.status}
                label={statusLabel(order.status)}
              />
            </div>
          </div>

          {/* Produtos do pedido */}
          <div className="px-8 pt-6 pb-2 flex flex-col gap-4">
            <span className="font-semibold text-gray-700 text-base mb-1">
              Produtos do pedido
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {order.items.slice(0, 3).map((item) => (
                <OrderProductItem key={item.productId} item={item} />
              ))}
              {order.items.length > 4 && (
                <div className="flex items-center justify-center bg-gray-100 rounded-xl px-4 py-3 border border-gray-100 text-gray-500 font-medium text-base">
                  +{order.items.length - 3} outros produtos
                </div>
              )}
              {order.items.length === 4 && order.items[3] && (
                <OrderProductItem
                  key={order.items[3]?.productId}
                  item={order.items[3]}
                />
              )}
            </div>
          </div>

          {/* Valor total */}
          <div className="px-8 pb-6 pt-2">
            <Separator className="my-2 bg-gray-100" />
            <div className="flex justify-between items-end">
              <div className="flex flex-col items-start">
                <span className="text-gray-500 text-sm">Valor total</span>
                <span className="font-bold text-2xl text-gray-900 mt-1">
                  R$ {order.totalAmount.toFixed(2)}
                </span>
              </div>
              <Link
                href={`/account/orders/${order.id}`}
                passHref
                legacyBehavior
              >
                <Button
                  variant="primary"
                  className="ml-4 mt-2 whitespace-nowrap"
                >
                  Ver detalhes
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

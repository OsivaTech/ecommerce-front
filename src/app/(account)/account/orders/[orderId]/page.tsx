import { OrderHttp } from '@/http/Order'
import OrderDetail from '@/components/OrderDetail'
import { Suspense } from 'react'

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const resolvedParams = await params
  const ordersRes = await OrderHttp.getOrderById(Number(resolvedParams.orderId))

  if (!ordersRes.hasError && ordersRes.data) {
    return (
      <Suspense fallback={<div>Carregando...</div>}>
        <OrderDetail order={ordersRes.data} />
      </Suspense>
    )
  }

  return <div>Pedido não encontrado</div>
}

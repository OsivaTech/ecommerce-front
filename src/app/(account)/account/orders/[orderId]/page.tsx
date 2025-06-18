import { OrderHttp } from '@/http/Order'
import OrderDetail from '@/components/OrderDetail'
import { use } from 'react'

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const { orderId } = use(params)

  const ordersRes = await OrderHttp.getOrderById(Number(orderId))

  if (!ordersRes.hasError && ordersRes.data) {
    return <OrderDetail order={ordersRes.data} />
  }
}

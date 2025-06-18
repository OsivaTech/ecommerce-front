import { OrderHttp } from '@/http/Order'
import OrderList from '@/components/OrderList'
import { BackButton } from '@/components/BackButton'

export default async function OrdersPage() {
  const ordersRes = await OrderHttp.getMyOrders()
  const orders = !ordersRes.hasError ? ordersRes.data : []

  return (
    <div className="container mx-auto px-2 py-8">
      <BackButton className="mb-4" />
      <h1 className="text-3xl font-bold mb-8">Meus Pedidos</h1>
      <OrderList orders={orders} />
    </div>
  )
}

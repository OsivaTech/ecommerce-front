import { columns } from '@/app/(admin)/admin/order/components/columns'
import { DataTable } from '@/components/ui/data-table'
import { ApiOrder } from '@/http/Order'

export const OrderTable = async () => {
  const orders = await ApiOrder.getOrders()

  if ('code' in orders && 'message' in orders) {
    return <div>{orders.message}</div>
  }

  return (
    <div className="mt-[20px]">
      <DataTable columns={columns} data={orders} />
    </div>
  )
}

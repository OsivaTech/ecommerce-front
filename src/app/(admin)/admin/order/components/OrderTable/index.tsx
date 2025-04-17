import { columns } from '@/app/(admin)/admin/order/components/columns'
import { DataTable } from '@/components/ui/data-table'
import { ApiOrder } from '@/http/Order'

export const OrderTable = async () => {
  const orders = await ApiOrder.getOrders()

  if (orders.hasError) {
    return <div>Error</div>
  }

  return (
    <div className="mt-[20px]">
      <DataTable columns={columns} data={orders.data} />
    </div>
  )
}

import { DataTable } from '@/components/ui/data-table'
import { AdminTitle } from '@/components/AdminTitle'
import { columns } from '@/app/(admin)/admin/order/components/columns'
import { ApiOrder } from '@/http/Order'

export default async function Order() {
  const orders = await ApiOrder.getOrders()

  return (
    <div className="flex flex-col gap-4">
      <AdminTitle
        title="Pedidos"
        description="Pedidos realizados e seus status"
      />
      <div>
        <DataTable columns={columns} data={orders} />
      </div>
    </div>
  )
}

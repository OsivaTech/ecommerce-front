import { DataTable } from '@/components/ui/data-table'
import { AdminTitle } from '@/components/AdminTitle'
import { getOrders } from '@/http/Order'
import { columns } from '@/app/(admin)/admin/order/components/columns'

export default async function Order() {
  const orders = await getOrders()

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

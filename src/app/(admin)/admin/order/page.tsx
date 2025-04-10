import { AdminTitle } from '@/components/AdminTitle'
import { DataTable } from '@/components/ui/data-table'

export default function Order() {
  return (
    <div className="flex flex-col gap-4">
      <AdminTitle
        title="Pedidos"
        description="Pedidos realizados e seus status"
      />
      <div>{/* <DataTable columns={columns} data={orders} /> */}</div>
    </div>
  )
}

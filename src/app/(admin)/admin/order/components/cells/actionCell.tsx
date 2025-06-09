import { OrderModal } from '@/app/(admin)/admin/order/components/OrderModal'
import { EyeIcon } from 'lucide-react'
import { useState } from 'react'
import { Order } from '@/types/api/Response/OrderResponse'
import { Row } from '@tanstack/react-table'

export const ActionCell = ({ row }: { row: Row<Order> }) => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <EyeIcon className="cursor-pointer" onClick={() => setOpen(true)} />
      {open && (
        <OrderModal open={open} setOpen={setOpen} order={row.original} />
      )}
    </div>
  )
}

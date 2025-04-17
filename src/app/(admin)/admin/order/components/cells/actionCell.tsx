import { OrderModal } from '@/app/(admin)/admin/order/components/OrderModal'
import { EyeIcon } from 'lucide-react'
import { useState } from 'react'

export const ActionCell = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <EyeIcon className="cursor-pointer" onClick={() => setOpen(true)} />
      {open && <OrderModal open={open} setOpen={setOpen} />}
    </div>
  )
}

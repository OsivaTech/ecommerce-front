import { StockModal } from '@/app/(admin)/admin/stock/components/StockModal'
import { Product } from '@/types/api/Response/ProductResponse'
import { PencilIcon } from '@heroicons/react/24/outline'
import { Row } from '@tanstack/react-table'
import { useState } from 'react'

export const ActionsCell = ({ row }: { row: Row<Product> }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex gap-2">
      <PencilIcon
        className="h-4 w-4 cursor-pointer"
        onClick={() => setOpen(true)}
      />
      {open && (
        <StockModal open={open} setOpen={setOpen} product={row.original} />
      )}
    </div>
  )
}

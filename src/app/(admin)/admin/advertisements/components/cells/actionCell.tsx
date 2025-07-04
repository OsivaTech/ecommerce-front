import { AdvertisementModal } from '@/app/(admin)/admin/advertisements/components/AdvertisementModal'
import { AdvertisementResponse } from '@/types/api/Response/AdvertisementResponse'
import { PencilIcon } from '@heroicons/react/24/outline'
import { Row } from '@tanstack/react-table'
import { useState } from 'react'

export const ActionsCell = ({ row }: { row: Row<AdvertisementResponse> }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex gap-2">
      <PencilIcon
        className="h-4 w-4 cursor-pointer"
        onClick={() => setOpen(true)}
      />
      {open && (
        <AdvertisementModal
          open={open}
          setOpen={setOpen}
          advertisement={row.original}
          mode="edit"
        />
      )}
    </div>
  )
}

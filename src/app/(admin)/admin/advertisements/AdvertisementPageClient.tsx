'use client'

import { AdvertisementModal } from '@/app/(admin)/admin/advertisements/components/AdvertisementModal'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function AdvertisementPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        className="bg-primary text-white cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        Novo Anúncio
      </Button>

      <AdvertisementModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        advertisement={null}
        mode="create"
      />
    </>
  )
}

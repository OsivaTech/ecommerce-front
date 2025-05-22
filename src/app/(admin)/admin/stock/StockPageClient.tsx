'use client'

import { StockModal } from '@/app/(admin)/admin/stock/components/StockModal'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function StockPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        className="bg-primary text-white cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        Adicionar produto
      </Button>

      <StockModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        product={null}
        mode="create"
      />
    </>
  )
}

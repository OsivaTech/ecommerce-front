'use client'

import { CategoryModal } from '@/app/(admin)/admin/categories/components/CategoryModal'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function CategoryPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button
        className="bg-primary text-white cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        Nova Categoria
      </Button>

      <CategoryModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        category={null}
        mode="create"
      />
    </>
  )
}

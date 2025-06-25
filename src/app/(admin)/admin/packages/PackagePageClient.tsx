'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { PackageModal } from './components/PackageModal'
import { useState } from 'react'

export function PackagePageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Novo Pacote
      </Button>
      <PackageModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}

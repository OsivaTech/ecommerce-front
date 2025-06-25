'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { PackageModal } from '../PackageModal'
import { PackageResponse } from '@/types/api/Response/PackageResponse'
import { HttpPackage } from '@/http/Package'
import { toast } from 'react-hot-toast'
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface ActionCellProps {
  package: PackageResponse
}

export function ActionCell({ package: packageData }: ActionCellProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await HttpPackage.deletePackage(packageData.id.toString())
      toast.success('Pacote excluído com sucesso!')
      setIsDeleteModalOpen(false)
      // Recarregar a tabela
      if (
        typeof window !== 'undefined' &&
        (window as Window & { refreshPackages?: () => Promise<void> })
          .refreshPackages
      ) {
        await (window as Window & { refreshPackages?: () => Promise<void> })
          .refreshPackages!()
      }
    } catch (error) {
      toast.error('Erro ao excluir pacote')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsDeleteModalOpen(true)}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <PackageModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        package={packageData}
      />

      {isDeleteModalOpen && (
        <ConfirmationModal
          title="Excluir Pacote"
          description={`Tem certeza que deseja excluir o pacote "${packageData.name}"? Esta ação não pode ser desfeita.`}
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
          isPending={isDeleting}
        />
      )}
    </>
  )
}

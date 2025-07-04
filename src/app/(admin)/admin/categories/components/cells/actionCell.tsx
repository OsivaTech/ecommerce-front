import { CategoryModal } from '@/app/(admin)/admin/categories/components/CategoryModal'
import { Category } from '@/types/api/Response/CategoryResponse'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Row } from '@tanstack/react-table'
import { useState } from 'react'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { CategoryHttp } from '@/http/Category'
import { showToast } from '@/utils/toast'

export const ActionsCell = ({ row }: { row: Row<Category> }) => {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await CategoryHttp.deleteCategory(row.original.id)
      if (response.hasError) {
        showToast.error('Erro ao excluir categoria')
        return
      }
      showToast.success('Categoria excluída com sucesso')
      setDeleteOpen(false)
      // Recarregar a página para atualizar a tabela
      window.location.reload()
    } catch (error) {
      showToast.error('Erro ao excluir categoria')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex gap-2">
      <PencilIcon
        className="h-4 w-4 cursor-pointer text-blue-600 hover:text-blue-800"
        onClick={() => setEditOpen(true)}
      />
      <TrashIcon
        className="h-4 w-4 cursor-pointer text-red-600 hover:text-red-800"
        onClick={() => setDeleteOpen(true)}
      />

      {editOpen && (
        <CategoryModal
          open={editOpen}
          setOpen={setEditOpen}
          category={row.original}
          mode="edit"
        />
      )}

      {deleteOpen && (
        <ConfirmationModal
          title="Excluir Categoria"
          description={`Tem certeza que deseja excluir a categoria "${row.original.name}"? Esta ação não pode ser desfeita.`}
          onConfirm={handleDelete}
          onCancel={() => setDeleteOpen(false)}
          isPending={isDeleting}
        />
      )}
    </div>
  )
}

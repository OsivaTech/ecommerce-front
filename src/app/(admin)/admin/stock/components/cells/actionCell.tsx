import { StockModal } from '@/app/(admin)/admin/stock/components/StockModal'
import { ProductHttp } from '@/http/Product'
import { Product } from '@/types/api/Response/ProductResponse'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Row } from '@tanstack/react-table'
import { useState, useTransition } from 'react'
import { toast } from 'react-hot-toast'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { useRouter } from 'next/navigation'
import { ProductFormData } from '@/components/ProductForm/productSchema'

export const ActionsCell = ({ row }: { row: Row<Product> }) => {
  const [open, setOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = async () => {
    startTransition(async () => {
      const response = await ProductHttp.deleteProduct(String(row.original.id))
      if (response.hasError) {
        toast.error(response.error[0]?.message || 'Erro ao remover produto')
      } else {
        toast.success('Produto removido com sucesso')
        setIsDeleteModalOpen(false)
        router.refresh()
      }
    })
  }

  const productFormData: ProductFormData = {
    ...row.original,
    price: row.original.price ?? 0,
  }

  return (
    <div className="flex gap-2">
      <PencilIcon
        className="h-4 w-4 cursor-pointer"
        onClick={() => setOpen(true)}
      />
      {open && (
        <StockModal
          open={open}
          setOpen={setOpen}
          product={productFormData}
          mode="update"
        />
      )}
      <TrashIcon
        className="h-4 w-4 cursor-pointer"
        onClick={() => setIsDeleteModalOpen(true)}
      />
      {isDeleteModalOpen && (
        <ConfirmationModal
          title="Confirmar remoção"
          description="Tem certeza que deseja remover este produto? Essa ação não pode ser revertida!"
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
          isPending={isPending}
        />
      )}
    </div>
  )
}

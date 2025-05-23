import { Modal } from '@/components/Modal'
import { ProductForm } from '@/components/ProductForm'
import { ProductFormData } from '@/components/ProductForm/productSchema'
import { ProductHttp } from '@/http/Product'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { StockMovementModal } from '../StockMovementModal'

export const StockModal = ({
  open,
  setOpen,
  product,
  mode = 'create',
}: {
  open: boolean
  setOpen: (open: boolean) => void
  product: ProductFormData | null
  mode?: 'create' | 'update'
}) => {
  const router = useRouter()
  const [stockModalOpen, setStockModalOpen] = useState(false)

  const onSubmit = async (data: ProductFormData) => {
    if (mode === 'create') {
      const response = await ProductHttp.createProduct({
        name: data.name,
        description: data.description,
        price: data.price || 0,
        initialStock: data.stock || 0,
        imageId: data.file.id,
        categoryId: data.category.id,
        dimensions: data.dimensions || {
          width: 0,
          height: 0,
          length: 0,
          weight: 0,
        },
      })

      if (response.hasError) {
        toast.error(response.error[0]?.message || 'Erro ao criar produto')
      } else {
        toast.success('Produto criado com sucesso')
        setOpen(false)
        router.refresh()
      }
    } else {
      if (!product?.id) {
        toast.error('ID do produto não encontrado')
        return
      }

      const response = await ProductHttp.updateProduct(product.id, {
        name: data.name,
        description: data.description,
        price: data.price || 0,
        fileId: data.file.id,
        categoryId: data.category.id,
        status: data.status as 'None' | 'Enabled' | 'OutOfStock' | 'Disabled',
        dimensions: data.dimensions || {
          width: 0,
          height: 0,
          length: 0,
          weight: 0,
        },
      })

      if (response.hasError) {
        toast.error(response.error[0]?.message || 'Erro ao atualizar produto')
      } else {
        toast.success('Produto atualizado com sucesso')
        setOpen(false)
        router.refresh()
      }
    }
  }

  const handleStockUpdateSuccess = () => {
    setStockModalOpen(false)
    setOpen(false)
  }

  return (
    <>
      <Modal
        title={mode === 'create' ? 'Adicionar produto' : 'Atualizar produto'}
        description={
          mode === 'create'
            ? 'Adicione um produto ao estoque'
            : 'Atualize as informações do produto'
        }
        open={open}
        setOpen={setOpen}
        className="w-[800px]"
      >
        <ProductForm
          onSubmit={onSubmit}
          defaultValues={product}
          onCancel={() => setOpen(false)}
          disableStockInput={mode === 'update'}
          onStockUpdateClick={() => setStockModalOpen(true)}
        />
      </Modal>

      {product?.id && (
        <StockMovementModal
          open={stockModalOpen}
          setOpen={setStockModalOpen}
          productId={product.id.toString()}
          currentStock={product.stock || 0}
          onSuccess={handleStockUpdateSuccess}
        />
      )}
    </>
  )
}

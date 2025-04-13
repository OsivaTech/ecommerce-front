import { Modal } from '@/components/Modal'
import { ProductForm } from '@/components/ProductForm'
import { ProductFormData } from '@/components/ProductForm/productSchema'

export const StockModal = ({
  open,
  setOpen,
  product,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  product: ProductFormData
}) => {

  const onSubmit = (data: ProductFormData) => {
    console.log(data)
  }

  return (
    <Modal
      title="Adicionar produto"
      description="Adicione um produto ao estoque"
      open={open}
      setOpen={setOpen}
    >
      <ProductForm onSubmit={onSubmit} defaultValues={product} />
    </Modal>
  )
}

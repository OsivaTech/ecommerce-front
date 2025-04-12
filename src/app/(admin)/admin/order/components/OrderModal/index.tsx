import { Modal } from '@/components/Modal'

export const OrderModal = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  return (
    <>
      <Modal
        title="Pedido"
        open={open}
        setOpen={setOpen}
        description="Detalhes do pedido"
      >
        <div>
          <h1>Pedido</h1>
        </div>
      </Modal>
    </>
  )
}

import { Order } from '@/types/api/Response/OrderResponse'
import { Row } from '@tanstack/react-table'
import { StatusBadge } from '@/components/StatusBadge'

export const StatusCell = ({ row }: { row: Row<Order> }) => {
  const labelStatus = {
    None: 'Desconhecido',
    Pending: 'Pagamento pendente',
    Processing: 'Em separação',
    WaitingShipment: 'Aguardando envio',
    Shipped: 'Enviado',
    Completed: 'Concluído',
    Canceled: 'Cancelado',
  }

  return (
    <StatusBadge
      status={row.original.status}
      label={labelStatus[row.original.status]}
    />
  )
}

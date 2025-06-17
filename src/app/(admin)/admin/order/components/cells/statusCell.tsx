import { Order } from '@/types/api/Response/OrderResponse'
import { Row } from '@tanstack/react-table'
import { StatusBadge } from '@/components/StatusBadge'

export const StatusCell = ({ row }: { row: Row<Order> }) => {
  const labelStatus = {
    None: 'Desconhecido',
    Pending: 'Pendente',
    Processing: 'Em Separação',
    WaitingShipment: 'Aguardando Envio',
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

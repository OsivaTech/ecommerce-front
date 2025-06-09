import { Order, OrderStatus } from '@/types/api/Response/OrderResponse'
import { Row } from '@tanstack/react-table'
import { StatusBadge } from '@/components/StatusBadge'

const getStatusConfig = (
  status: string,
): {
  status: OrderStatus
  label: string
} => {
  const statusMap: Record<
    string,
    {
      status: OrderStatus
      label: string
    }
  > = {
    None: { status: 'None', label: 'Nenhum' },
    Pending: { status: 'Pending', label: 'Pendente' },
    Processing: { status: 'Processing', label: 'Em Separação' },
    WaitingShipment: { status: 'WaitingShipment', label: 'Aguardando Envio' },
    Shipped: { status: 'Shipped', label: 'Enviado' },
    Completed: { status: 'Completed', label: 'Concluído' },
    Canceled: { status: 'Canceled', label: 'Cancelado' },
  }

  return statusMap[status] || { status: 'None', label: 'Desconhecido' }
}

export const StatusCell = ({ row }: { row: Row<Order> }) => {
  const status = row.original.status
  const statusConfig = getStatusConfig(status)

  return <StatusBadge status={statusConfig.status} label={statusConfig.label} />
}

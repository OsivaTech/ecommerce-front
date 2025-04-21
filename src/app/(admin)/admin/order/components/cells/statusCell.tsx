import { Order } from '@/types/api/Response/OrderResponse'
import { Row } from '@tanstack/react-table'
import { StatusBadge } from '@/components/StatusBadge'

const getStatusConfig = (
  status: string,
): {
  status:
    | 'none'
    | 'pending'
    | 'processing'
    | 'approved'
    | 'completed'
    | 'canceled'
  label: string
} => {
  const statusMap: Record<
    string,
    {
      status:
        | 'none'
        | 'pending'
        | 'processing'
        | 'approved'
        | 'completed'
        | 'canceled'
      label: string
    }
  > = {
    None: { status: 'none', label: 'Nenhum' },
    Pending: { status: 'pending', label: 'Pendente' },
    Processing: { status: 'processing', label: 'Processando' },
    Approved: { status: 'approved', label: 'Aprovado' },
    Completed: { status: 'completed', label: 'Concluído' },
    Canceled: { status: 'canceled', label: 'Cancelado' },
  }

  return statusMap[status] || { status: 'none', label: 'Desconhecido' }
}

export const StatusCell = ({ row }: { row: Row<Order> }) => {
  const status = row.original.status
  const statusConfig = getStatusConfig(status)

  return <StatusBadge status={statusConfig.status} label={statusConfig.label} />
}

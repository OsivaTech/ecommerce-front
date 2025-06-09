import { Product } from '@/types/api/Response/ProductResponse'
import { Row } from '@tanstack/react-table'
import { StatusBadge } from '@/components/StatusBadge'

const getStatusConfig = (
  status: string,
): {
  status: 'None' | 'Enabled' | 'OutOfStock' | 'Disabled'
  label: string
} => {
  const statusMap: Record<
    string,
    {
      status: 'None' | 'Enabled' | 'OutOfStock' | 'Disabled'
      label: string
    }
  > = {
    None: { status: 'None', label: 'Nenhum' },
    Enabled: { status: 'Enabled', label: 'Disponível' },
    OutOfStock: { status: 'OutOfStock', label: 'Sem estoque' },
    Disabled: { status: 'Disabled', label: 'Desativado' },
  }

  return statusMap[status] || { status: 'None', label: 'Desconhecido' }
}

export const StatusCell = ({ row }: { row: Row<Product> }) => {
  const status = row.original.status
  const statusConfig = getStatusConfig(status)

  return <StatusBadge status={statusConfig.status} label={statusConfig.label} />
}

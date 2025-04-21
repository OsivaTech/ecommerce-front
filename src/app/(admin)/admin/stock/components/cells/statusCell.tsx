import { Product } from '@/types/api/Response/ProductResponse'
import { Row } from '@tanstack/react-table'
import { StatusBadge } from '@/components/StatusBadge'

const getStatusConfig = (
  status: string,
): {
  status: 'none' | 'enabled' | 'outOfStock' | 'disabled'
  label: string
} => {
  const statusMap: Record<
    string,
    {
      status: 'none' | 'enabled' | 'outOfStock' | 'disabled'
      label: string
    }
  > = {
    None: { status: 'none', label: 'Nenhum' },
    Enabled: { status: 'enabled', label: 'Disponível' },
    OutOfStock: { status: 'outOfStock', label: 'Sem Estoque' },
    Disabled: { status: 'disabled', label: 'Desativado' },
  }

  return statusMap[status] || { status: 'none', label: 'Desconhecido' }
}

export const StatusCell = ({ row }: { row: Row<Product> }) => {
  const status = row.original.status
  const statusConfig = getStatusConfig(status)

  return <StatusBadge status={statusConfig.status} label={statusConfig.label} />
}

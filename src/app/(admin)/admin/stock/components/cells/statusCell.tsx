import { Product } from '@/types/api/Response/ProductResponse'
import { Row } from '@tanstack/react-table'
import { StatusBadge } from '@/components/StatusBadge'

export const StatusCell = ({ row }: { row: Row<Product> }) => {
  const labelStatus = {
    None: 'Desconhecido',
    Enabled: 'Ativo',
    OutOfStock: 'Esgotado',
    Disabled: 'Inativo',
  }

  return (
    <StatusBadge
      status={row.original.status}
      label={labelStatus[row.original.status]}
    />
  )
}

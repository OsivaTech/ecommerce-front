import { Product } from '@/types/api/Response/ProductResponse'
import { Row } from '@tanstack/react-table'

export const StatusCell = ({ row }: { row: Row<Product> }) => {
  return <div>{row.original.stock > 0 ? 'Em estoque' : 'Sem estoque'}</div>
}

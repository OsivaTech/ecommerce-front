import { Product } from '@/types/api/Response/ProductResponse'
import { Row } from '@tanstack/react-table'

export const QuantityCell = ({ row }: { row: Row<Product> }) => {
  return <div>{row.original.stock}</div>
}

import { Product } from '@/types/api/Response/ProductResponse'
import { Row } from '@tanstack/react-table'

export const ProductCell = ({ row }: { row: Row<Product> }) => {
  return <div>{row.original.name}</div>
}

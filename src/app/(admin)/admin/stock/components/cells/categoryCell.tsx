import { Product } from '@/types/api/Response/ProductResponse'
import { Row } from '@tanstack/react-table'

export const CategoryCell = ({ row }: { row: Row<Product> }) => {
  return <div>{row.original.category.name}</div>
}

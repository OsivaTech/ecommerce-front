import { Product } from '@/types/api/Response/ProductResponse'
import { formatPrice } from '@/utils/mask'
import { Row } from '@tanstack/react-table'

export const PriceCell = ({ row }: { row: Row<Product> }) => {
  return <div>{formatPrice(row.original.price ?? 0)}</div>
}

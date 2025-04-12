import { Order } from '@/types/api/Response/OrderResponse'
import { Row } from '@tanstack/react-table'
import { formatPrice } from '@/utils/mask'
export const TotalCell = ({ row }: { row: Row<Order> }) => {
  return <div>{formatPrice(row.original.totalAmount)}</div>
}

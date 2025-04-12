import { Order } from '@/types/api/Response/OrderResponse'
import { Row } from '@tanstack/react-table'

export const OrderIdCell = ({ row }: { row: Row<Order> }) => {
  return <div>{row.original.id}</div>
}

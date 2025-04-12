import { Order } from '@/types/api/Response/OrderResponse'
import { Row } from '@tanstack/react-table'

export const StatusCell = ({ row }: { row: Row<Order> }) => {
  return <div>{row.original.status}</div>
}

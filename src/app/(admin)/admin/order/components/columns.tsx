'use client'

import { Order } from '@/types/api/Response/OrderResponse'
import { ColumnDef } from '@tanstack/react-table'
import { OrderIdCell } from './cells/orderIdCell'
import { DateCell } from '@/app/(admin)/admin/order/components/cells/dateCell'
import { CustomerCell } from '@/app/(admin)/admin/order/components/cells/customerCell'
import { StatusCell } from '@/app/(admin)/admin/order/components/cells/statusCell'
import { TotalCell } from '@/app/(admin)/admin/order/components/cells/totalCell'
import { ActionCell } from '@/app/(admin)/admin/order/components/cells/actionCell'

export const columns: ColumnDef<Order>[] = [
  {
    header: 'Pedido',
    accessorKey: 'id',
    cell: OrderIdCell,
  },
  {
    header: 'Data',
    accessorKey: 'createdAt',
    cell: DateCell,
  },
  {
    header: 'Cliente',
    accessorKey: 'cliente',
    cell: CustomerCell,
  },
  {
    header: 'Itens',
    accessorKey: 'items',
    cell: ({ row }) => {
      return <div>{row.original.items?.length}</div>
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: StatusCell,
  },
  {
    header: 'Total',
    accessorKey: 'total',
    cell: TotalCell,
  },
  {
    header: 'Ações',
    accessorKey: 'actions',
    cell: ActionCell,
  },
]

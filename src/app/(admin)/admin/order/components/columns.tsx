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
    enableSorting: false,
  },
  {
    header: 'Itens',
    accessorKey: 'items',
    cell: ({ row }) => {
      const total =
        row.original.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
      return <div>{total}</div>
    },
    enableSorting: false,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: StatusCell,
    enableSorting: false,
  },
  {
    header: 'Total',
    accessorKey: 'total',
    cell: TotalCell,
    enableSorting: false,
  },
  {
    header: 'Ações',
    accessorKey: 'actions',
    cell: ActionCell,
    enableSorting: false,
  },
]

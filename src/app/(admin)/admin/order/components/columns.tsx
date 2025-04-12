'use client'

import { Order } from '@/types/api/Response/OrderResponse'
import { formatPrice } from '@/utils/mask'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Order>[] = [
  {
    header: 'Pedido',
    accessorKey: 'id',
    cell: ({ row }) => {
      return <div>{row.original.id}</div>
    },
  },
  {
    header: 'Data',
    accessorKey: 'createdAt',
    cell: () => {
      return <div>row.original.createdAt</div>
    },
  },
  {
    header: 'Cliente',
    accessorKey: 'cliente',
    cell: ({ row }) => {
      return <div>{row.original.user.name}</div>
    },
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
    cell: ({ row }) => {
      return <div>{row.original.status}</div>
    },
  },
  {
    header: 'Total',
    accessorKey: 'total',
    cell: ({ row }) => {
      return <div>{formatPrice(row.original.totalAmount || 0)}</div>
    },
  },
]

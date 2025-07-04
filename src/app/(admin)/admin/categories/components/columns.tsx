'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Category } from '@/types/api/Response/CategoryResponse'
import { ActionsCell } from './cells/actionCell'

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className="font-medium">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Nome',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ActionsCell,
  },
]

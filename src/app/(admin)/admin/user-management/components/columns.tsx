'use client'
import { RegistrationPending } from '@/app/types/api/Response/RegistrationPendingResponse'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<RegistrationPending>[] = [
  {
    header: 'Perfil',
    accessorKey: 'type',
    cell: ({ row }) => {
      return <div>{row.original.professionalDocument?.type}</div>
    },
  },
  {
    header: 'Data',
    accessorKey: 'date',
    cell: ({ row }) => {
      return <div>DATA</div>
    },
  },
  {
    header: 'Cliente',
    accessorKey: 'name',
    cell: ({ row }) => {
      return <div>{row.original.name}</div>
    },
  },
  {
    header: 'E-mail',
    accessorKey: 'email',
    cell: ({ row }) => {
      return <div>{row.original.email}</div>
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ row }) => {
      return <div>status</div>
    },
  },
  {
    header: 'Documentos',
    accessorKey: 'documents',
    cell: ({ row }) => {
      return <div>actions items</div>
    },
  },
]

'use client'
import { DateCell } from '@/app/(admin)/admin/user/components/cells/dateCell'
import { CustomerNameCell } from '@/app/(admin)/admin/user/components/cells/customerName'
import { EmailCell } from '@/app/(admin)/admin/user/components/cells/emailCell'
import { ProfileCell } from '@/app/(admin)/admin/user/components/cells/profileCell'
import { ColumnDef } from '@tanstack/react-table'
import { User } from '@/types/api/Response/UserResponse'
import { ActionsCell } from '@/app/(admin)/admin/user/components/cells/actionsCell'
import { StatusCell } from '@/app/(admin)/admin/user/components/cells/statusCell'

export const columns: ColumnDef<User>[] = [
  {
    header: 'Perfil',
    accessorKey: 'type',
    cell: ProfileCell,
  },
  {
    header: 'Data',
    accessorKey: 'createdAt',
    cell: DateCell,
  },
  {
    header: 'Cliente',
    accessorKey: 'name',
    cell: CustomerNameCell,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: StatusCell,
  },
  {
    header: 'E-mail',
    accessorKey: 'email',
    cell: EmailCell,
  },
  {
    header: 'actions',
    accessorKey: 'actions',
    cell: ActionsCell,
  },
]

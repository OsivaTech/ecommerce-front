'use client'
import { DateCell } from '@/app/(admin)/admin/user-management/components/cells/dateCell'
import { CustomerNameCell } from '@/app/(admin)/admin/user-management/components/cells/customerName'
import { EmailCell } from '@/app/(admin)/admin/user-management/components/cells/emailCell'
import { ProfileCell } from '@/app/(admin)/admin/user-management/components/cells/profileCell'
import { RegistrationPending } from '@/types/api/Response/RegistrationPendingResponse'
import { ColumnDef } from '@tanstack/react-table'
import { StatusCell } from '@/app/(admin)/admin/user-management/components/cells/statusCell'
import { DocumentCell } from '@/app/(admin)/admin/user-management/components/cells/documentCell'

export const columns: ColumnDef<RegistrationPending>[] = [
  {
    header: 'Perfil',
    accessorKey: 'type',
    cell: ProfileCell,
  },
  {
    header: 'Data',
    accessorKey: 'date',
    cell: DateCell,
  },
  {
    header: 'Cliente',
    accessorKey: 'name',
    cell: CustomerNameCell,
  },
  {
    header: 'E-mail',
    accessorKey: 'email',
    cell: EmailCell,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: StatusCell,
  },
  {
    header: 'Documentos',
    accessorKey: 'documents',
    cell: DocumentCell,
  },
]

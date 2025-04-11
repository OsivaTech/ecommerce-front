import { Row } from '@tanstack/react-table'
import { StatusBadge } from '@/components/StatusBadge'
import { StatusPopover } from '@/components/StatusPopover'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { useState, useTransition } from 'react'
import { RegistrationPending } from '@/types/api/Response/RegistrationResponse'
import { approveRegistration } from '@/http/Registration'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export const StatusCell = ({ row }: { row: Row<RegistrationPending> }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [wasRejected, setWasRejected] = useState(false)
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const mappedStatus: Record<string, string> = {
    Pending: 'pending',
    Approved: 'approved',
    Rejected: 'rejected',
    None: 'none',
  }

  const labelStatus = {
    Pending: 'Em aprovação',
    Approved: 'Aprovado',
    Rejected: 'Rejeitado',
    None: 'Não iniciado',
  }

  const status = mappedStatus[row.original.status!]

  const handleApprove = async () => {
    startTransition(async () => {
      const response = await approveRegistration(row.original.id!.toString())
      console.log('response', response)
      if (response?.code) {
        toast.error(response.message)
      } else {
        toast.success('Registro aprovado com sucesso')
        router.refresh()
      }
    })
  }

  const handleReject = async () => {
    setIsOpen(false)
  }

  return (
    <>
      {status === 'pending' ? (
        <StatusPopover
          status={status}
          label={labelStatus[row.original.status!]}
          onApprove={() => {
            setIsOpen(true)
            setWasRejected(false)
          }}
          onReject={() => {
            setIsOpen(true)
            setWasRejected(true)
          }}
        />
      ) : (
        <StatusBadge
          status={status as 'pending' | 'approved' | 'rejected'}
          label={labelStatus[row.original.status!]}
        />
      )}
      {isOpen && (
        <ConfirmationModal
          title={wasRejected ? 'Confirmar rejeição' : 'Confirmar aprovação'}
          description={`${
            wasRejected
              ? 'Tem certeza que deseja rejeitar este usuário?'
              : 'Tem certeza que deseja aprovar este usuário?'
          } Essa ação não pode ser revertida!`}
          onConfirm={wasRejected ? handleReject : handleApprove}
          onCancel={() => setIsOpen(false)}
          isPending={isPending}
        />
      )}
    </>
  )
}

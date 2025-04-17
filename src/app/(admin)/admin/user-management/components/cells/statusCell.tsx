import { Row } from '@tanstack/react-table'
import { StatusBadge } from '@/components/StatusBadge'
import { StatusPopover } from '@/components/StatusPopover'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { useState, useTransition } from 'react'
import { RegistrationPending } from '@/types/api/Response/RegistrationResponse'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { RegistrationHttp } from '@/http/Registration'
import { RejectConfirmationModal } from '@/components/RejectConfirmationModal'
export const StatusCell = ({ row }: { row: Row<RegistrationPending> }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [wasRejected, setWasRejected] = useState(false)
  const router = useRouter()
  const [rejectReason, setRejectReason] = useState('')
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
      const response = await RegistrationHttp.approveRegistration(
        row.original.id!.toString(),
      )
      if (response?.hasError) {
        toast.error(response.error[0]?.message || 'Erro ao aprovar registro')
      } else {
        toast.success('Registro aprovado com sucesso')
        router.refresh()
      }
    })
  }

  const handleReject = async () => {
    setIsOpen(false)
    startTransition(async () => {
      const response = await RegistrationHttp.rejectRegistration(
        row.original.id!.toString(),
        rejectReason,
      )
      if (response?.hasError) {
        toast.error(response.error[0]?.message || 'Erro ao rejeitar registro')
      } else {
        toast.success('Registro rejeitado com sucesso')
        router.refresh()
      }
    })
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
      {isOpen && !wasRejected && (
        <ConfirmationModal
          title={'Confirmar aprovação'}
          description={`Tem certeza que deseja aprovar este usuário? Essa ação não pode ser revertida!`}
          onConfirm={handleApprove}
          onCancel={() => setIsOpen(false)}
          isPending={isPending}
        />
      )}
      {isOpen && wasRejected && (
        <RejectConfirmationModal
          title="Confirmar rejeição"
          description="Tem certeza que deseja rejeitar este usuário?"
          onConfirm={handleReject}
          onCancel={() => setIsOpen(false)}
          isPending={isPending}
          rejectReason={rejectReason}
          setRejectReason={setRejectReason}
        />
      )}
    </>
  )
}

import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Loader2 } from 'lucide-react'
type ConfirmationModalProps = {
  title: string
  description: string
  onConfirm: () => void
  onCancel: () => void
  isPending?: boolean
}

export const ConfirmationModal = ({
  title,
  description,
  onConfirm,
  onCancel,
  isPending,
}: ConfirmationModalProps) => {
  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" onClick={onCancel}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? 'Aguarde...' : 'Continuar'}
            {isPending && <Loader2 className="w-4 h-4 ml-2 animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

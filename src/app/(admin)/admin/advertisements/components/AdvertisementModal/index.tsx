'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AdvertisementResponse } from '@/types/api/Response/AdvertisementResponse'
import { AdvertisementForm } from './AdvertisementForm'

interface AdvertisementModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  advertisement: AdvertisementResponse | null
  mode: 'create' | 'edit'
}

export function AdvertisementModal({
  open,
  setOpen,
  advertisement,
  mode,
}: AdvertisementModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Novo Anúncio' : 'Editar Anúncio'}
          </DialogTitle>
        </DialogHeader>
        <AdvertisementForm
          advertisement={advertisement}
          mode={mode}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

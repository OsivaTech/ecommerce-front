'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { PackageResponse } from '@/types/api/Response/PackageResponse'
import { PackageForm } from './PackageForm'

interface PackageModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  package?: PackageResponse
}

export function PackageModal({
  open,
  onOpenChange,
  package: packageData,
}: PackageModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {packageData ? 'Editar Pacote' : 'Novo Pacote'}
          </DialogTitle>
        </DialogHeader>
        <PackageForm
          package={packageData}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { StatusBadge } from '@/components/StatusBadge'
import { Check, ChevronDown, X } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import { RegistrationStatus } from '@/types/api/Types/RegistrationStatus'

type StatusPopoverProps = {
  status: RegistrationStatus
  label: string
  onApprove: () => void
  onReject: () => void
}

export const StatusPopover = ({
  status,
  label,
  onApprove,
  onReject,
}: StatusPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <StatusBadge status={status} label={label} />
          <ChevronDown className="ml-1 size-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[150px]">
        <div
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
          onClick={onApprove}
        >
          <Check />
          <span className="text-sm">Aprovar</span>
        </div>
        <Separator />
        <div
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
          onClick={onReject}
        >
          <X />
          <span className="text-sm">Rejeitar</span>
        </div>
      </PopoverContent>
    </Popover>
  )
}

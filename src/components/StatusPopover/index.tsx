import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { StatusBadge } from '@/components/StatusBadge'
import { Button } from '@/components/ui/button'
import { Check, ChevronDown, X } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

type StatusPopoverProps = {
  status: 'pending' | 'approved' | 'rejected'
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
        <Button
          variant="outline"
          className="bg-transparent border-none cursor-pointer"
        >
          <StatusBadge status={status} label={label} />
          <ChevronDown />
        </Button>
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

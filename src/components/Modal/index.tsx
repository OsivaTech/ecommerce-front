import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export const Modal = ({
  children,
  title,
  trigger,
  open,
  setOpen,
  description,
  className,
}: {
  children: React.ReactNode
  title: string
  trigger?: React.ReactNode
  open: boolean
  setOpen: (open: boolean) => void
  description: string
  className?: string
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        className={`max-h-[80vh] overflow-hidden ${className || ''}`}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[calc(80vh-120px)] pr-2">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

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
      <DialogContent className={className}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

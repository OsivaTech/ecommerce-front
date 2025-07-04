import { Category } from '@/types/api/Response/CategoryResponse'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CategoryForm } from './CategoryForm'

interface CategoryModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  category: Category | null
  mode: 'create' | 'edit'
}

export function CategoryModal({
  open,
  setOpen,
  category,
  mode,
}: CategoryModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Nova Categoria' : 'Editar Categoria'}
          </DialogTitle>
        </DialogHeader>
        <CategoryForm
          category={category}
          mode={mode}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

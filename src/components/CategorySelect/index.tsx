import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CategoryHttp } from '@/http/Category'
import { CategoryResponse } from '@/types/api/Response/CategoryResponse'
import { Loader2, Plus } from 'lucide-react'
import { useEffect, useState, useTransition } from 'react'
import toast from 'react-hot-toast'
import { Modal } from '@/components/Modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const CategorySelect = ({
  onChange,
  value,
}: {
  onChange: (value: string) => void
  value: string
}) => {
  const [categories, setCategories] = useState<CategoryResponse>([])
  const [isPending, startTransition] = useTransition()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  const fetchCategories = async () => {
    const categories = await CategoryHttp.getAllCategories()
    if (categories.hasError) {
      toast.error(categories.error[0]?.message || 'Erro ao buscar categorias')
    } else {
      setCategories(categories.data)
    }
  }

  useEffect(() => {
    startTransition(fetchCategories)
  }, [])

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error('O nome da categoria é obrigatório')
      return
    }

    const response = await CategoryHttp.createCategory({
      name: newCategoryName,
    })
    if (response.hasError) {
      toast.error(response.error[0]?.message || 'Erro ao criar categoria')
    } else {
      toast.success('Categoria criada com sucesso')
      setNewCategoryName('')
      setIsModalOpen(false)
      await fetchCategories()
      // Seleciona a nova categoria
      onChange(response.data.id.toString())
    }
  }

  return (
    <>
      <Select
        onValueChange={(value) => {
          if (value === 'new') {
            setIsModalOpen(true)
          } else {
            onChange(value)
          }
        }}
        value={value}
      >
        <SelectTrigger disabled={isPending} className="w-full">
          <SelectValue placeholder="Selecione" />
          {isPending && <Loader2 className="animate-spin" />}
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem
              key={category.id}
              value={category?.id?.toString() || ''}
            >
              {category.name}
            </SelectItem>
          ))}
          <SelectItem value="new" className="text-primary">
            <div className="flex items-center gap-2">
              <Plus className="size-4" />
              Nova categoria
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <Modal
        title="Nova categoria"
        description="Adicione uma nova categoria ao sistema"
        open={isModalOpen}
        setOpen={setIsModalOpen}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="categoryName">Nome da categoria</Label>
            <Input
              id="categoryName"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Digite o nome da categoria"
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="w-1/2"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              className="w-1/2"
              onClick={handleCreateCategory}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

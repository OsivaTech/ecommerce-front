'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Category } from '@/types/api/Response/CategoryResponse'
import { CategoryHttp } from '@/http/Category'
import { showToast } from '@/utils/toast'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const categorySchema = z.object({
  name: z.string().min(1, 'O nome da categoria é obrigatório'),
})

type CategoryFormData = z.infer<typeof categorySchema>

interface CategoryFormProps {
  category: Category | null
  mode: 'create' | 'edit'
  onSuccess: () => void
}

export function CategoryForm({ category, mode, onSuccess }: CategoryFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || '',
    },
  })

  const onSubmit = async (data: CategoryFormData) => {
    setIsLoading(true)
    try {
      if (mode === 'create') {
        const response = await CategoryHttp.createCategory(data)
        if (response.hasError) {
          showToast.error(
            response.error[0]?.message || 'Erro ao criar categoria',
          )
          return
        }
        showToast.success('Categoria criada com sucesso')
      } else {
        if (!category) {
          showToast.error('Categoria não encontrada')
          return
        }
        const response = await CategoryHttp.updateCategory(category.id, data)
        if (response.hasError) {
          showToast.error(
            response.error[0]?.message || 'Erro ao atualizar categoria',
          )
          return
        }
        showToast.success('Categoria atualizada com sucesso')
      }
      onSuccess()
      // Recarregar a página para atualizar a tabela
      window.location.reload()
    } catch (error) {
      showToast.error('Erro inesperado')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome da Categoria</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Digite o nome da categoria"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => onSuccess()}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? 'Salvando...'
            : mode === 'create'
              ? 'Criar'
              : 'Atualizar'}
        </Button>
      </div>
    </form>
  )
}

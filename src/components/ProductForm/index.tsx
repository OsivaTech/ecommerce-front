import { CategorySelect } from '@/components/CategorySelect'
import { StatusSelect } from '@/components/StatusSelect'
import {
  ProductFormData,
  productSchema,
} from '@/components/ProductForm/productSchema'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { UploadFrame } from '@/components/UploadField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CategoryResponse } from '@/types/api/Response/CategoryResponse'
import { CategoryHttp } from '@/http/Category'
import { useEffect, useState } from 'react'
import { ProductHttp } from '@/http/Product'
import { toast } from 'react-hot-toast'
import { RichTextEditor } from '@/components/RichTextEditor'

const statusOptions = [
  { label: 'Ativo', value: 'Enabled' },
  { label: 'Sem estoque', value: 'OutOfStock' },
  { label: 'Desativado', value: 'Disabled' },
]

export const ProductForm = ({
  onSubmit,
  defaultValues,
  onCancel,
}: {
  onSubmit: (data: ProductFormData) => void
  defaultValues?: ProductFormData | null
  onCancel?: () => void
}) => {
  const [categories, setCategories] = useState<CategoryResponse>([])

  useEffect(() => {
    async function fetchCategories() {
      const response = await CategoryHttp.getAllCategories()
      if (!response.hasError) {
        setCategories(response.data)
      }
    }
    fetchCategories()
  }, [])

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: defaultValues?.id,
      name: defaultValues?.name || '',
      description: defaultValues?.description || '',
      price: defaultValues?.price || 0,
      stock: defaultValues?.stock || 0,
      category: defaultValues?.category || { id: 0, name: '' },
      file: defaultValues?.file || {
        id: 0,
        name: '',
        url: '',
        size: 0,
        contentType: '',
      },
      status: defaultValues?.status || 'Enabled',
      dimensions: defaultValues?.dimensions || {
        width: 0,
        height: 0,
        length: 0,
        weight: 0,
      },
    },
  })

  const handleSubmit = async (data: ProductFormData) => {
    try {
      console.log('Form data:', data)
      if (!data.file.id) {
        toast.error('A imagem do produto é obrigatória')
        return
      }
      await onSubmit(data)
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UploadFrame
                    onChange={(file) => {
                      field.onChange(file)
                      form.setValue(
                        'file',
                        file || {
                          id: 0,
                          name: '',
                          url: '',
                          size: 0,
                          contentType: '',
                        },
                      )
                    }}
                    value={field.value}
                    uploadFunction={ProductHttp.uploadImage}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="category.id"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <CategorySelect
                        onChange={(value) => {
                          field.onChange(Number(value))
                          form.setValue(
                            'category.name',
                            categories.find((c) => c.id === Number(value))
                              ?.name || '',
                          )
                        }}
                        value={field.value?.toString() || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-3/5">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <StatusSelect
                        onChange={field.onChange}
                        value={field.value || ''}
                        options={statusOptions}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem className="w-2/5">
                    <FormLabel>Quantidade</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <RichTextEditor
                  value={field.value || ''}
                  onChange={field.onChange}
                  placeholder="Digite a descrição do produto..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Dimensões</h3>
          </div>
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="dimensions.width"
              render={({ field }) => (
                <FormItem className="w-1/4">
                  <FormLabel>Largura (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dimensions.height"
              render={({ field }) => (
                <FormItem className="w-1/4">
                  <FormLabel>Altura (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dimensions.length"
              render={({ field }) => (
                <FormItem className="w-1/4">
                  <FormLabel>Comprimento (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dimensions.weight"
              render={({ field }) => (
                <FormItem className="w-1/4">
                  <FormLabel>Peso (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="w-1/2"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button type="submit" className="w-1/2">
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}

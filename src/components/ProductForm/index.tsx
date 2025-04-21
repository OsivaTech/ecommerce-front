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
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { UploadField } from '@/components/UploadField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CategoryResponse } from '@/types/api/Response/CategoryResponse'
import { CategoryHttp } from '@/http/Category'
import { useEffect, useState } from 'react'

const statusOptions = [
  { label: 'Ativo', value: 'Enabled' },
  { label: 'Sem estoque', value: 'OutOfStock' },
  { label: 'Desativado', value: 'Disabled' },
]

export const ProductForm = ({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: ProductFormData) => void
  defaultValues?: ProductFormData | null
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
      name: defaultValues?.name,
      description: defaultValues?.description,
      price: defaultValues?.price,
      stock: defaultValues?.stock,
      category: defaultValues?.category,
      file: defaultValues?.file,
      status: defaultValues?.status,
      dimensions: defaultValues?.dimensions || {
        width: 0,
        height: 0,
        length: 0,
        weight: 0,
      },
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <div className="relative">
            {defaultValues?.file?.url ? (
              <FormField
                control={form.control}
                name="file.id"
                render={({ field }) => (
                  <UploadField
                    onChange={field.onChange}
                    value={defaultValues?.file || null}
                  />
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="file.id"
                render={({ field }) => (
                  <UploadField
                    onChange={field.onChange}
                    value={defaultValues?.file || null}
                  />
                )}
              />
            )}
          </div>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-2 w-full">
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
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-2 w-full">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <StatusSelect
                        onChange={field.onChange}
                        value={field.value || ''}
                        options={statusOptions}
                      />
                    </FormControl>
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
                <textarea
                  {...field}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={field.value || ''}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium">Dimensões</h3>
            <span className="text-sm text-muted-foreground">(opcional)</span>
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
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
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
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
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
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
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
                </FormItem>
              )}
            />
          </div>
        </div>
        <Separator />
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="w-1/2">
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

import { CategorySelect } from '@/components/CategorySelect'
import { ProductFormData, productSchema } from '@/components/ProductForm/productSchema'
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

export const ProductForm = ({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: ProductFormData) => void
  defaultValues?: ProductFormData
}) => {
 
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
    },
  })
  console.log(form.watch('file.id'))
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="category.id"
            render={({ field }) => (
              <FormItem className="w-3/5">
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <CategorySelect
                    onChange={field.onChange}
                    value={field.value?.toString() || ''}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem className="w-1/5">
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="w-1/5">
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input onChange={field.onChange} value={field.value || ''} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div>
          {/* <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="file.id"
              render={({ field }) => (
                <UploadField  />
              )}
            />
         
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

'use client'
import { Modal } from '@/components/Modal'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { userSchema, UserFormData } from '../editUserSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { User } from '@/types/api/Response/UserResponse'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { userStatus } from '@/constants/utils'
import { Form, FormField } from '@/components/ui/form'
import { UserHttp } from '@/http/User'
import { toast } from 'react-hot-toast'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export const UserEditModal = ({
  user,
  isOpen,
  setIsOpen,
}: {
  user: User
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status,
      address: user.address,
      professionalDocument: user.professionalDocument,
      personalDocument: user.personalDocument,
    },
  })

  const addExtensionToFileNameUsingContentType = (contentType: string) => {
    if (contentType.includes('pdf')) {
      return 'pdf'
    }
    if (contentType.includes('image')) {
      return 'jpg'
    }
    if (contentType.includes('application')) {
      return 'txt'
    }
    return 'txt'
  }

  const handleSubmit = async (data: UserFormData) => {
    startTransition(async () => {
      const response = await UserHttp.updateUserStatus(
        user.id.toString(),
        data.status,
      )
      if (response.hasError) {
        toast.error(response.error[0]?.message || 'Erro ao atualizar usuário')
      } else {
        toast.success('Usuário atualizado com sucesso')
        setIsOpen(false)
        router.refresh()
      }
    })
  }

  return (
    <Modal
      title="Detalhe do usuário"
      description="Edite os dados do usuário"
      open={isOpen}
      setOpen={setIsOpen}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 mt-4"
        >
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nome"
                disabled
                errorMessage={form.formState.errors.name?.message}
                {...form.register('name')}
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <Label htmlFor="professionalDocument.type">Perfil</Label>
              <Input
                id="professionalDocument.type"
                type="text"
                placeholder="Perfil"
                disabled
                {...form.register('professionalDocument.type')}
              />
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(userStatus).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </>
                )}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="space-y-2 w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                placeholder="Email"
                disabled
                errorMessage={form.formState.errors.email?.message}
                {...form.register('email')}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="space-y-2 w-1/5">
              <Label htmlFor="address.state">Estado</Label>
              <Input
                id="address.state"
                type="text"
                placeholder="Estado"
                disabled
                errorMessage={form.formState.errors.address?.state?.message}
                {...form.register('address.state')}
              />
            </div>
            <div className="space-y-2 flex-1">
              <Label htmlFor="address.city">Cidade</Label>
              <Input
                id="address.city"
                type="text"
                placeholder="Cidade"
                disabled
                errorMessage={form.formState.errors.address?.city?.message}
                {...form.register('address.city')}
              />
            </div>
            <div className="space-y-2 flex-1">
              <Label htmlFor="address.postalCode">CEP</Label>
              <Input
                id="address.postalCode"
                type="text"
                placeholder="CEP"
                disabled
                errorMessage={
                  form.formState.errors.address?.postalCode?.message
                }
                {...form.register('address.postalCode')}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="space-y-2 w-2/3">
              <Label htmlFor="address.street">Rua</Label>
              <Input
                id="address.street"
                type="text"
                placeholder="Rua"
                disabled
                errorMessage={form.formState.errors.address?.street?.message}
                {...form.register('address.street')}
              />
            </div>
            <div className="space-y-2 w-1/3">
              <Label htmlFor="address.number">Numero</Label>
              <Input
                id="address.number"
                type="text"
                placeholder="Numero"
                disabled
                errorMessage={form.formState.errors.address?.number?.message}
                {...form.register('address.number')}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="space-y-2 w-1/3">
              <Label htmlFor="address.neighborhood">Bairro</Label>
              <Input
                id="address.neighborhood"
                type="text"
                placeholder="Bairro"
                disabled
                errorMessage={
                  form.formState.errors.address?.neighborhood?.message
                }
                {...form.register('address.neighborhood')}
              />
            </div>
            <div className="space-y-2 w-2/3">
              <Label htmlFor="address.complement">Complemento</Label>
              <Input
                id="address.complement"
                type="text"
                placeholder="Complemento"
                disabled
                errorMessage={
                  form.formState.errors.address?.complement?.message
                }
                {...form.register('address.complement')}
              />
            </div>
          </div>

          <div>
            <div className="flex gap-2">
              <Label htmlFor="professionalDocument.file">Documento : </Label>
              <Label className="text-blue-900">
                <a href={user.professionalDocument.file?.url} target="_blank">
                  {user.professionalDocument.file?.name}.
                  {addExtensionToFileNameUsingContentType(
                    user.professionalDocument.file?.contentType || '',
                  )}
                </a>
              </Label>
            </div>
          </div>
          <Separator />
          <div className="flex justify-end gap-2 w-full">
            <Button
              type="button"
              variant="outline"
              className="flex-1 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 cursor-pointer"
              disabled={!form.formState.isDirty || isPending}
              isLoading={isPending}
            >
              Salvar
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}

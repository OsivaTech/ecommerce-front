'use client'

import Button from '../Button/Button'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { showToasthHandleError } from '@/utils/toast'
import {
  RegistrationFormData,
  registrationSchema,
} from '@/components/SignupForm/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Input from '@/components/Input/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDebounce } from '@/hook/useDebounce'
import { getAddressByPostalCode } from '@/http/Address'
import toast from 'react-hot-toast'
import { RegistrationHttp } from '@/http/Registration'
import { UploadButton } from '@/components/UploadField/UploadButton'
import { useRouter } from 'next/navigation'

export default function SignupForm() {
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  })
  const debouncedPostalCode = useDebounce(form.watch('address.postalCode'))
  const [isLoading, startTransition] = useTransition()
  const [isSubmitPending, startSubmitTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    const fetchAddress = async () => {
      startTransition(async () => {
        const response = await getAddressByPostalCode(debouncedPostalCode)
        if (response.hasError) {
          toast.error('Endereço não encontrado')
        } else {
          form.setValue('address.street', response.data?.street ?? '')
          form.setValue(
            'address.neighborhood',
            response.data?.neighborhood ?? '',
          )
          form.setValue('address.city', response.data?.city ?? '')
          form.setValue('address.state', response.data?.state ?? '')
        }
      })
    }
    if (debouncedPostalCode) {
      fetchAddress()
    }
  }, [debouncedPostalCode])

  const onSubmit = async (data: RegistrationFormData) => {
    startSubmitTransition(async () => {
      try {
        const response = await RegistrationHttp.performRegistration({
          ...data,
          phone: data.phone.replace(/\D/g, ''),
          address: {
            ...data.address,
            postalCode: data.address.postalCode.replace(/\D/g, ''),
          },
        })
        if (response.hasError) {
          toast.error(response.error[0]?.message ?? 'Erro ao criar usuário')
        } else {
          toast.success('Usuário criado com sucesso')
          router.push('/')
        }
      } catch (error) {
        showToasthHandleError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nome completo" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input {...field} placeholder="E-mail" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input mask="phone" {...field} placeholder="Telefone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col lg:flex-row gap-4">
          <FormField
            control={form.control}
            name="personalDocument.type"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Tipo de documento</FormLabel>
                <FormControl className="w-full h-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="min-h-[50px] w-full">
                      <SelectValue placeholder="Selecione o tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CPF">CPF</SelectItem>
                      <SelectItem value="CNPJ">CNPJ</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personalDocument.number"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Número do documento </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Número do documento" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex  gap-4 flex-col lg:flex-row ">
          <FormField
            control={form.control}
            name="professionalDocument.type"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Tipo de documento</FormLabel>
                <FormControl className="w-full h-full">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="min-h-[50px] w-full">
                      <SelectValue placeholder="Selecione o tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CRM">CRM</SelectItem>
                      <SelectItem value="CRO">CRO</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="professionalDocument.number"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Número da licença (CRM, CRO, etc)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Número da licença" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="professionalDocument.fileId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col gap-2">
                  <p>Anexar licença profissional</p>
                  <UploadButton
                    className="bg-gray-200 w-1/2"
                    onChange={field.onChange}
                    value={null}
                    label="Anexar"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address.postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input
                  mask="cep"
                  {...field}
                  placeholder="CEP"
                  isLoading={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch('address.postalCode') && (
          <>
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem className="w-4/5">
                    <FormLabel>Nome da rua</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nome da rua"
                        value={form.watch('address.street')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.number"
                render={({ field }) => (
                  <FormItem className="w-1/5">
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        placeholder="Número"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="address.complement"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        placeholder="Complemento"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.neighborhood"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Bairro" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Cidade" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address.state"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Estado" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        )}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Criar senha</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Criar senha" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="repeatPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repetir Senha</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Repetir Senha" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className='text-sm"'>
          Ao criar sua conta, você concorda com nossos termos de uso e política
          de privacidade.
        </p>

        <Button
          text="Criar Conta"
          className="w-full bg-amber-700 text-white p-3 rounded-3xl font-bold hover:bg-amber-800"
          isLoading={isSubmitPending}
        />
      </form>
    </Form>
  )
}

'use client'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Input from '@/components/Input/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@/components/ui/separator'
import { signIn } from '@/http/Auth'
import toast from 'react-hot-toast'
import { LoginFormValues, loginSchema } from './loginSchema'
import { createSession } from '@/lib/session'
import { useRouter } from 'next/navigation'
export const LoginForm = () => {
  const router = useRouter()
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: { email: string; password: string }) => {
    const response = await signIn(data.email, data.password)
    if (response.hasError) {
      response.error.map((error) => {
        toast.error(error.message)
        return error
      })
    } else {
      toast.success('Login realizado com sucesso')
      createSession(response.data.accessToken!)
      router.push('/')
    }
  }

  return (
    <div className="w-full container mx-auto max-w-[500px]">
      <Form {...form}>
        <form
          className="flex flex-col gap-4 "
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Entrar</Button>
        </form>
      </Form>
      <Separator className="my-4" />
      <Button variant="link" className="w-full">
        Ainda não tem uma conta? Crie uma conta
      </Button>
    </div>
  )
}

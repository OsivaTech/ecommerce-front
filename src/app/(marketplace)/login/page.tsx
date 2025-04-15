import { LoginForm } from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] w-screen">
      <h1 className="text-2xl font-bold">Olá!</h1>
      <p className="text-sm text-gray-500">
        Para continuar, digite seu e-mail e senha
      </p>
      <LoginForm />
    </div>
  )
}

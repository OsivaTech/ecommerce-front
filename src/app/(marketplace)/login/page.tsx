import { LoginForm } from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-140px)] gap-2">
      <h1 className="text-2xl font-bold text-title">
        Que bom que você voltou!
      </h1>
      <p className="text-sm text-muted">
        Para continuar, digite seu e-mail e senha
      </p>
      <LoginForm />
    </div>
  )
}

'use client'

import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { APP_LINKS } from '../../../../../constants'

export default function SignupSuccess() {
  const router = useRouter()
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <AlertCircle className="w-16 h-16 text-yellow-500" />
        </div>

        <h2 className="text-2xl font-bold mb-4">
          Cadastro pendente de aprovação!
        </h2>

        <div className="space-y-4 text-muted mb-8">
          <p>Seu cadastro foi enviado para aprovação de um administrador.</p>
          <p>
            Assim que seu for aprovado, você receberá um e-mail com as
            instruções para acessar sua conta.
          </p>
        </div>

        <Button
          onClick={() => router.push(APP_LINKS.HOMEPAGE())}
          variant="primary"
          className="px-6 py-3"
        >
          Voltar para a página inicial
        </Button>
      </div>
    </div>
  )
}

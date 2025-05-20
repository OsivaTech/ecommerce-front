'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2, CheckCircle, XCircle } from 'lucide-react'
import { ProvidersHttp } from '@/http/Providers'

export default function MelhorEnvioSuccessPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading',
  )
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    async function sendToApi() {
      const code = searchParams.get('code')
      if (!code) {
        setStatus('error')
        setErrorMsg('Código não informado na URL.')
        return
      }
      try {
        const response = await ProvidersHttp.setupMelhorEnvio({ code })
        if (response.hasError) {
          setStatus('error')
          setErrorMsg(response.error?.[0]?.message || 'Erro desconhecido.')
        } else {
          setStatus('success')
        }
      } catch (e) {
        setStatus('error')
        setErrorMsg('Erro inesperado ao processar integração.')
      }
    }
    sendToApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {status === 'loading' && (
        <>
          <Loader2 className="animate-spin w-12 h-12 mb-4 text-primary" />
          <span className="text-lg font-medium">
            Processando integração com Melhor Envio...
          </span>
        </>
      )}
      {status === 'success' && (
        <div className="flex flex-col items-center">
          <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
          <span className="text-green-600 font-semibold text-2xl mb-2">
            Integração realizada com sucesso!
          </span>
        </div>
      )}
      {status === 'error' && (
        <div className="flex flex-col items-center">
          <XCircle className="w-16 h-16 text-red-600 mb-4" />
          <span className="text-red-600 font-semibold text-2xl mb-2">
            Erro ao processar integração
          </span>
          {errorMsg && (
            <span className="text-red-500 text-base text-center max-w-md">
              {errorMsg}
            </span>
          )}
        </div>
      )}
    </div>
  )
}

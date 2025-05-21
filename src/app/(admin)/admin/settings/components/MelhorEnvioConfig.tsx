'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { ProvidersHttp } from '@/http/Providers'

export function MelhorEnvioConfig() {
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const [redirectUri, setRedirectUri] = useState('')
  const [loading, setLoading] = useState(false)
  const [statusLoading, setStatusLoading] = useState(true)
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    async function fetchStatus() {
      setStatusLoading(true)
      try {
        const response = await ProvidersHttp.getStatusMelhorEnvio()
        if (!response.hasError && response.data) {
          setIsConfigured(response.data.isConfigured ?? false)
          setShowForm(!(response.data.isConfigured ?? false))
        } else {
          setIsConfigured(false)
          setShowForm(true)
        }
      } catch {
        setIsConfigured(false)
        setShowForm(true)
      } finally {
        setStatusLoading(false)
      }
    }
    fetchStatus()
  }, [])

  const handleConfig = async () => {
    if (!clientId || !clientSecret || !redirectUri) {
      toast.error('Preencha todos os campos')
      return
    }
    setLoading(true)
    try {
      const response = await ProvidersHttp.setupMelhorEnvio({
        clientId,
        clientSecret,
        redirectUri,
      })

      if (response.hasError) {
        toast.error(
          response.error?.[0]?.message || 'Erro ao gerar URL de autenticação.',
        )
      } else {
        window.open(response.data.url, '_blank')
      }
    } catch (e) {
      toast.error('Erro inesperado ao gerar URL de autenticação.')
    } finally {
      setLoading(false)
    }
  }

  if (statusLoading) {
    return (
      <div className="text-center py-8">Carregando status da integração...</div>
    )
  }

  if (isConfigured && !showForm) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <CheckCircle className="w-16 h-16 text-green-600 mb-2" />
        <span className="text-green-700 font-semibold text-lg">
          Integração já configurada!
        </span>
        <Button variant="outline" onClick={() => setShowForm(true)}>
          Reconfigurar
        </Button>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Melhor Envio</h3>
        <p className="text-muted-foreground">
          Configure a integração com o Melhor Envio
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="clientId">Client Id</Label>
          <Input
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="Digite o Client Id"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientSecret">Client Secret</Label>
          <Input
            id="clientSecret"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            placeholder="Digite o Client Secret"
            type="password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="redirectUri">Redirect URI</Label>
          <Input
            id="redirectUri"
            value={redirectUri}
            onChange={(e) => setRedirectUri(e.target.value)}
            placeholder="Digite a Redirect URI"
          />
        </div>
        <Button
          variant="outline"
          className="gap-2 w-full"
          onClick={handleConfig}
          disabled={loading}
        >
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          {loading ? 'Gerando URL...' : 'Configurar Melhor Envio'}
        </Button>
      </div>
    </div>
  )
}

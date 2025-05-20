'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export function MelhorEnvioConfig() {
  const [clientId, setClientId] = useState('')
  const redirectUri =
    'https://lsinjectable.com.br/admin/settings/integrations/melhorenvio/setup'

  const generateAuthUrl = () => {
    if (!clientId) {
      toast.error('Preencha o Client Id')
      return
    }

    const scopes = [
      'shipping-calculate',
      'shipping-cancel',
      'shipping-checkout',
      'shipping-companies',
      'shipping-generate',
      'shipping-preview',
      'shipping-print',
      'shipping-share',
      'shipping-tracking',
      'ecommerce-shipping',
      'cart-read',
      'cart-write',
    ].join(' ')

    const baseUrl = 'https://sandbox.melhorenvio.com.br/oauth/authorize'
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scopes,
    })

    const authUrl = `${baseUrl}?${params.toString()}`
    window.open(authUrl, '_blank')
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

        <Button
          variant="outline"
          className="gap-2 w-full"
          onClick={generateAuthUrl}
        >
          <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          Configurar Melhor Envio
        </Button>
      </div>
    </div>
  )
}

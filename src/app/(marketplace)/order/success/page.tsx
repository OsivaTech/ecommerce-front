'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { APP_LINKS } from '../../../../../constants'
import { OrderHttp } from '@/http/Order'
import { useCart } from '@/context/useCart'
export default function OrderSuccess() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const cart = useCart()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        const receiptUrl = searchParams.get('receipt_url')
        const transactionId = searchParams.get('transaction_id')
        const captureMethod = searchParams.get('capture_method')
        const orderNsu = searchParams.get('order_nsu')
        const slug = searchParams.get('slug')

        if (!transactionId || !captureMethod || !orderNsu) {
          throw new Error('Parâmetros inválidos')
        }

        await OrderHttp.completeOrder(Number(orderNsu), {
          receiptUrl: receiptUrl ?? '',
          transactionId: transactionId ?? '',
          captureMethod: captureMethod ?? '',
          orderNsu: orderNsu ?? '',
          slug: slug ?? '',
        })

        setIsLoading(false)
      } catch (err) {
        setError('Ocorreu um erro ao confirmar o pagamento')
        setIsLoading(false)
      }
    }
    cart.clearCart()
    confirmPayment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="animate-pulse h-16 w-16 rounded-full bg-gray-200" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Processando seu pedido...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Erro ao processar pedido</h2>
          <div className="space-y-4 text-muted mb-8">
            <p>{error}</p>
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>

        <h2 className="text-2xl font-bold mb-4">
          Pedido confirmado com sucesso!
        </h2>

        <div className="space-y-4 text-muted mb-8">
          <p>Seu pedido foi processado e confirmado.</p>
          <p>
            Em breve você receberá um e-mail com todos os detalhes da sua
            compra.
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

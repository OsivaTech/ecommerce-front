'use client'

import { Order } from '@/types/api/Response/OrderResponse'
import { StatusBadge } from '@/components/StatusBadge'
import { Separator } from '@/components/ui/separator'
import { OrderProductItem } from '@/components/OrderProductItem'
import { BackButton } from '@/components/BackButton'
import { formatDate } from '@/utils/formatDate'
import { useState } from 'react'
import { OrderHttp } from '@/http/Order'
import { Button } from '../ui/button'

export default function OrderDetail({ order }: { order: Order }) {
  const labelOrderStatus = {
    None: 'Desconhecido',
    Pending: 'Pagamento pendente',
    Processing: 'Em separação',
    WaitingShipment: 'Aguardando envio',
    Shipped: 'Enviado',
    Completed: 'Concluído',
    Canceled: 'Cancelado',
  }

  const labelTransactionStatus = {
    Pending: 'Aguardando pagamento',
    Approved: 'Aprovado',
    Declined: 'Recusado',
    Refunded: 'Reembolsado',
  }

  const [loading, setLoading] = useState(false)

  async function handlePayOrder() {
    setLoading(true)
    try {
      const link = await OrderHttp.payOrder(order.id)
      if (!link.hasError) {
        window.location.href = link.data
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-2 py-8">
      <BackButton className="mb-4" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Coluna principal */}
        <div className="flex-1 lg:w-2/3">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-2">Pedido #{order.id}</h1>

            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-4">Produtos</h2>
              <div className="flex flex-col gap-3">
                {order.items.map((item) => (
                  <OrderProductItem key={item.productId} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Coluna lateral */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-lg mb-4">Detalhes do Pedido</h2>

            <div className="space-y-4">
              <div className="flex flex-row justify-between">
                <div>
                  <span className="text-gray-500 text-sm">Data do Pedido</span>
                  <div
                    className="text-gray-900 font-medium text-base"
                    style={{ minHeight: 28 }}
                  >
                    {formatDate(order.createdAt)}
                  </div>
                </div>

                <div>
                  <span className="text-gray-500 text-sm">Status</span>
                  <div className="mt-1">
                    <StatusBadge
                      status={order.status}
                      label={labelOrderStatus[order.status]}
                    />
                  </div>
                </div>
              </div>
              {order.status === 'Pending' && (
                <div className="flex justify-center">
                  <Button
                    onClick={handlePayOrder}
                    variant="outline"
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition w-full"
                  >
                    {loading ? 'Redirecionando...' : 'Realizar pagamento'}
                  </Button>
                </div>
              )}

              <Separator className="my-4" />
              <h3 className="font-medium text-gray-900 mb-2">Resumo</h3>
              {/* Resumo financeiro */}
              <div className="bg-gray-50 rounded-lg p-4 mb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">Produto</span>
                  <span className="text-gray-900 text-base font-normal">
                    R$ {(order.totalAmount - order.freightPrice).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">Frete</span>
                  {order.freightPrice === 0 ||
                  order.freightPrice === undefined ? (
                    <span className="text-green-600 text-base font-normal">
                      Grátis
                    </span>
                  ) : (
                    <span className="text-gray-900 text-base font-normal">
                      R$ {order.freightPrice?.toFixed(2)}
                    </span>
                  )}
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600 text-sm font-semibold">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-gray-900">
                    R$ {order.totalAmount}
                  </span>
                </div>
              </div>

              {(order.shipmentDetails || order.user.address) && (
                <>
                  <Separator className="my-4" />
                  <h3 className="font-medium text-gray-900 mb-2">
                    Informações de entrega
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 mb-2">
                    {order.shipmentDetails && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Detalhes da entrega
                        </h4>
                        <div className="space-y-1 text-sm text-gray-700">
                          <div>
                            <span className="text-gray-600">
                              ID do pedido de frete:
                            </span>
                            <span className="ml-1 font-medium">
                              {order.shipmentDetails.melhorEnvioOrderId}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Protocolo:</span>
                            <span className="ml-1 font-medium">
                              {order.shipmentDetails.melhorEnvioProtocol}
                            </span>
                          </div>
                          {order.shipmentDetails.melhorEnvioLabelUrl && (
                            <div>
                              <a
                                href={order.shipmentDetails.melhorEnvioLabelUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-medium"
                              >
                                Ver etiqueta de envio
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {order.user.address && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">
                          Endereço de entrega
                        </h4>
                        <div className="space-y-1 text-sm text-gray-700">
                          <div>
                            {order.user.address.street},{' '}
                            {order.user.address.number}
                          </div>
                          {order.user.address.complement && (
                            <div>{order.user.address.complement}</div>
                          )}
                          <div>{order.user.address.neighborhood}</div>
                          <div>
                            {order.user.address.city} -{' '}
                            {order.user.address.state}
                          </div>
                          <div>{order.user.address.postalCode}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {order.transactions && order.transactions.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Informações de Pagamento
                    </h3>
                    <div className="space-y-3">
                      {order.transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className="bg-gray-50 rounded-lg p-3"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-gray-500 text-sm">
                              Status
                            </span>
                            <StatusBadge
                              status={transaction.status}
                              label={labelTransactionStatus[transaction.status]}
                            />
                          </div>
                          <div className="space-y-1 text-sm">
                            <p className="text-gray-600">
                              <span className="text-gray-500">Método:</span>{' '}
                              {transaction.paymentMethod === 'CreditCard' &&
                                'Cartão de Crédito'}
                              {transaction.paymentMethod === 'DebitCard' &&
                                'Cartão de Débito'}
                              {transaction.paymentMethod === 'Boleto' &&
                                'Boleto'}
                              {transaction.paymentMethod === 'Pix' && 'PIX'}
                            </p>
                            <p className="text-gray-600">
                              <span className="text-gray-500">Valor:</span> R${' '}
                              {transaction.amount.toFixed(2)}
                            </p>
                            {transaction.receiptUrl && (
                              <a
                                href={transaction.receiptUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline text-sm block mt-2"
                              >
                                Ver comprovante
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

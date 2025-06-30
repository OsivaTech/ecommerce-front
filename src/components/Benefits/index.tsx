import { Shield, Truck, CreditCard, Users } from 'lucide-react'

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
  iconBgColor: string
  iconColor: string
}

export const Benefits = () => {
  const benefits: Benefit[] = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Produtos originais',
      description: '100% originais e regulamentados pela Anvisa',
      iconBgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Entrega rápida',
      description: 'Envio para todo o Brasil com rastreamento',
      iconBgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: 'Pagamento seguro',
      description: 'Pix e cartão com parcelamento disponível',
      iconBgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Suporte especializado',
      description: 'Atendimento para profissionais da área',
      iconBgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
  ]

  return (
    <section className="container mx-auto mt-16 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">
          Por que escolher nossa loja?
        </h2>
        <p className="text-muted">
          Oferecemos a melhor experiência para profissionais da área
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="text-center">
            <div
              className={`w-16 h-16 ${benefit.iconBgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
            >
              <div className={benefit.iconColor}>{benefit.icon}</div>
            </div>
            <h3 className="font-semibold mb-2">{benefit.title}</h3>
            <p className="text-sm text-muted">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

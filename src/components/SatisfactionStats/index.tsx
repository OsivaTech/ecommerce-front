import { Users, Star, TrendingUp, Clock } from 'lucide-react'

export const SatisfactionStats = () => {
  return (
    <section className="container mx-auto mt-16 px-4">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold mb-2">Nossos números</h3>
        <p className="text-muted">Resultados que comprovam nossa excelência</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center border border-green-200">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
          <p className="text-sm font-medium text-green-700 mb-1">
            Clientes Satisfeitos
          </p>
          <p className="text-xs text-green-600">Taxa de satisfação</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border border-blue-200">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
          <p className="text-sm font-medium text-blue-700 mb-1">
            Avaliação Média
          </p>
          <p className="text-xs text-blue-600">Baseada em 1000+ reviews</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center border border-purple-200">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">1000+</div>
          <p className="text-sm font-medium text-purple-700 mb-1">Avaliações</p>
          <p className="text-xs text-purple-600">
            De profissionais verificados
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center border border-orange-200">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-orange-600 mb-2">24h</div>
          <p className="text-sm font-medium text-orange-700 mb-1">
            Tempo de Resposta
          </p>
          <p className="text-xs text-orange-600">Suporte especializado</p>
        </div>
      </div>

      {/* Barra de progresso adicional */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <div className="text-center mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">
            Distribuição de Avaliações
          </h4>
          <p className="text-sm text-muted">
            Baseado em feedback real dos clientes
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 w-8">5★</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: '85%' }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600 w-12">85%</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 w-8">4★</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: '10%' }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600 w-12">10%</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 w-8">3★</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-yellow-500 h-3 rounded-full"
                style={{ width: '3%' }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600 w-12">3%</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 w-8">2★</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-orange-500 h-3 rounded-full"
                style={{ width: '1%' }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600 w-12">1%</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 w-8">1★</span>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-red-500 h-3 rounded-full"
                style={{ width: '1%' }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600 w-12">1%</span>
          </div>
        </div>
      </div>
    </section>
  )
}

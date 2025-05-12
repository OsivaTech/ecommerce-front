'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'Os produtos vendidos são originais e regulamentados?',
    answer:
      'Sim. Trabalhamos apenas com produtos originais, de procedência confiável e fornecidos por distribuidores autorizados. Todos seguem os padrões exigidos pela Anvisa e demais órgãos reguladores.',
  },
  {
    question: 'Preciso de registro profissional para comprar?',
    answer:
      'Sim. Por se tratarem de produtos estéticos injetáveis e de uso profissional, é necessário apresentar um documento que comprove sua habilitação na área da saúde estética.',
  },
  {
    question:
      'Vocês vendem para pessoa física ou apenas para clínicas e profissionais da área?',
    answer:
      'Vendemos apenas para profissionais da saúde e estética devidamente habilitados, como biomédicos, farmacêuticos, dentistas, médicos, entre outros.',
  },
  {
    question:
      'Como faço para enviar meu comprovante de habilitação profissional?',
    answer:
      'Durante o cadastro em nosso site, você poderá anexar seu comprovante. Após a análise e aprovação da nossa equipe, sua conta será liberada para compras.',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer:
      'Aceitamos Pix, cartão de crédito (com parcelamento), com pagamento via gateway de pagamento InfinitePay.',
  },
  {
    question: 'É possível parcelar a compra?',
    answer:
      'Sim. Parcelamos suas compras no cartão de crédito, dependendo do valor e das condições promocionais vigentes.',
  },
  {
    question: 'O site é seguro para realizar pagamentos?',
    answer:
      'Sim. Utilizamos conexões criptografadas (SSL) e parceiros de pagamento reconhecidos, garantindo a segurança total dos seus dados e transações.',
  },
  {
    question: 'Como funciona a entrega dos produtos?',
    answer:
      'Enviamos para todo o Brasil via transportadoras parceiras e serviços expressos. O prazo de entrega pode variar de acordo com a região e a forma de envio escolhida.',
  },
  {
    question: 'Qual o prazo de entrega para minha região?',
    answer:
      'O prazo estimado será informado no momento da compra, após você informar seu CEP. Trabalhamos para que o envio seja rápido e eficiente.',
  },
  {
    question: 'Como acompanho o status do meu pedido?',
    answer:
      'Assim que o pedido for confirmado, você receberá um código de rastreamento por e-mail. Também é possível acompanhar diretamente pela sua conta no site.',
  },
  {
    question: 'Posso retirar meu pedido pessoalmente?',
    answer:
      'Atualmente, não oferecemos a opção de retirada. Todos os pedidos são enviados para o endereço cadastrado no ato da compra.',
  },
  {
    question: 'Os produtos são enviados com nota fiscal?',
    answer:
      'Sim. Todas as compras são acompanhadas de nota fiscal, enviada digitalmente e também junto com o produto.',
  },
  {
    question: 'E se o produto chegar com defeito ou avariado?',
    answer:
      'Nesse caso, pedimos que entre em contato conosco imediatamente com fotos do produto e da embalagem. Faremos a substituição ou reembolso o mais rápido possível.',
  },
  {
    question:
      'Vocês oferecem suporte para dúvidas sobre a aplicação dos produtos?',
    answer:
      'Nosso suporte está disponível para esclarecer dúvidas sobre características dos produtos. No entanto, a aplicação deve ser realizada apenas por profissionais capacitados, conforme as orientações do fabricante.',
  },
  {
    question: 'Quais cuidados devo ter com o armazenamento dos produtos?',
    answer:
      'Cada produto possui instruções específicas de armazenamento, que devem ser seguidas rigorosamente. Produtos injetáveis geralmente exigem refrigeração entre 2ºC e 8ºC.',
  },
  {
    question: 'É possível agendar a entrega para um dia específico?',
    answer:
      'No momento, não oferecemos agendamento de entregas, mas sempre buscamos cumprir o prazo estimado informado no checkout.',
  },
  {
    question: 'Como posso entrar em contato com o suporte?',
    answer:
      'Você pode nos chamar pelo WhatsApp ou enviar uma mensagem no e-mail. Nosso time está disponível de segunda a sexta, das 9h às 18h.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-lg text-gray-600">
            Encontre respostas para as dúvidas mais comuns sobre nossos produtos
            e serviços
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.question}
                  </h3>
                  <span className="ml-6 flex-shrink-0">
                    <svg
                      className={`h-6 w-6 transform ${
                        openIndex === index ? 'rotate-180' : ''
                      } transition-transform duration-200`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

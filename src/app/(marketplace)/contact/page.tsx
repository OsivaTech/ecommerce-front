'use client'

import {
  RiMailLine,
  RiPhoneLine,
  RiWhatsappLine,
  RiMapPinLine,
} from 'react-icons/ri'

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Entre em Contato</h1>
          <p className="text-gray-600">
            Estamos aqui para ajudar. Entre em contato conosco através do
            WhatsApp para um atendimento mais rápido.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <a
            href="https://wa.me/5531972498696"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <RiWhatsappLine className="text-xl" />
            Falar no WhatsApp
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6">
            <div className="flex text-primary justify-center text-2xl mb-3">
              <RiPhoneLine />
            </div>
            <h3 className="font-semibold mb-2">Telefone</h3>
            <p className="text-gray-600">(31) 97249-8696</p>
          </div>

          <div className="p-6">
            <div className="flex text-primary justify-center text-2xl mb-3">
              <RiMailLine />
            </div>
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-gray-600">contato@lsinjectable.com.br</p>
          </div>

          <div className="p-6">
            <div className="flex text-primary justify-center text-2xl mb-3">
              <RiMapPinLine />
            </div>
            <h3 className="font-semibold mb-2">Endereço</h3>
            <p className="text-gray-600">
              Avenida Raja Gabaglia, 2000
              <br />
              Belo Horizonte - MG
              <br />
              CEP: 30494-170
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Testimonial {
  id: number
  name: string
  profession: string
  rating: number
  comment: string
  avatar: string
  verified: boolean
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Dra. Ana Silva',
    profession: 'Dermatologista',
    rating: 5,
    comment:
      'Excelente qualidade dos produtos e atendimento impecável. Sempre recebo meus pedidos no prazo e com toda a documentação necessária.',
    avatar: '/images/avatar1.jpg',
    verified: true,
  },
  {
    id: 2,
    name: 'Dr. Carlos Mendes',
    profession: 'Biomédico',
    rating: 5,
    comment:
      'Produtos originais e preços competitivos. O suporte técnico é muito atencioso e sempre me ajudam com dúvidas sobre os produtos.',
    avatar: '/images/avatar2.jpg',
    verified: true,
  },
  {
    id: 3,
    name: 'Dra. Fernanda Costa',
    profession: 'Farmacêutica',
    rating: 5,
    comment:
      'Já sou cliente há mais de 2 anos e nunca tive problemas. A entrega é sempre pontual e os produtos chegam em perfeitas condições.',
    avatar: '/images/avatar3.jpg',
    verified: true,
  },
  {
    id: 4,
    name: 'Dr. Roberto Alves',
    profession: 'Dentista',
    rating: 5,
    comment:
      'Melhor fornecedor que já trabalhei. Produtos de qualidade e preços justos. Recomendo para todos os colegas.',
    avatar: '/images/avatar4.jpg',
    verified: true,
  },
]

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1,
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <section className="container mx-auto mt-16 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">O que nossos clientes dizem</h2>
        <p className="text-muted">
          Depoimentos de profissionais que confiam em nós
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="p-8 relative">
          <Quote className="w-12 h-12 text-primary/20 absolute top-4 left-4" />

          <div className="text-center">
            {/* Avaliação */}
            <div className="flex justify-center gap-1 mb-4">
              {renderStars(testimonials[currentIndex]?.rating || 5)}
            </div>

            {/* Comentário */}
            <blockquote className="text-lg text-gray-700 mb-6 italic">
              &ldquo;{testimonials[currentIndex]?.comment}&rdquo;
            </blockquote>

            {/* Informações do cliente */}
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">
                  {testimonials[currentIndex]?.name
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('') || 'U'}
                </span>
              </div>
              <div className="text-left">
                <p className="font-semibold">
                  {testimonials[currentIndex]?.name}
                </p>
                <p className="text-sm text-muted">
                  {testimonials[currentIndex]?.profession}
                </p>
              </div>
              {testimonials[currentIndex]?.verified && (
                <Badge variant="secondary" className="text-xs">
                  Verificado
                </Badge>
              )}
            </div>
          </div>

          {/* Indicadores */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}

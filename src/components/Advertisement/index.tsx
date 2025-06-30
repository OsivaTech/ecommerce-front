'use client'

import React, { useEffect, useState } from 'react'
import { AdvertisementResponse } from '@/types/api/Response/AdvertisementResponse'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface AdvertisementProps {
  advertisements: AdvertisementResponse
}

export const Advertisement = ({ advertisements }: AdvertisementProps) => {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === advertisements.length - 1 ? 0 : prevIndex + 1,
      )
    }, 7000) // Auto-scroll every 7 seconds

    return () => clearInterval(interval) // Cleanup on unmount
  }, [advertisements])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? advertisements.length - 1 : prevIndex - 1,
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === advertisements.length - 1 ? 0 : prevIndex + 1,
    )
  }

  const currentAd = advertisements[currentIndex]
  const currentMedia = currentAd?.medias?.[0] || {
    title: '',
    description: '',
    cta: '',
    image: { url: '' },
    urlGoTo: '',
  }

  return (
    <div className="container mx-auto w-full">
      <div className="relative aspect-[21/9] md:rounded-lg shadow-lg overflow-hidden">
        {/* Imagem de fundo */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={() => {
            if (currentAd?.type === 'MediaOnly' && currentMedia.urlGoTo) {
              router.push(currentMedia.urlGoTo)
            }
          }}
        >
          <Image
            src={currentMedia.image.url}
            alt={currentMedia.title || ''}
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Conteúdo sobreposto (aparece apenas se o tipo do anúncio for MediaAndText) */}
        {currentAd?.type === 'MediaAndText' && (
          <div className="absolute inset-0 flex items-center justify-between px-4 py-2.5 md:px-24 md:py-6 bg-black/30">
            <div className="text-white flex flex-col justify-evenly h-full md:w-1/2">
              <h1 className="text-lg md:text-3xl font-bold">
                {currentMedia.title}
              </h1>
              <p className="text-sm md:text-lg">{currentMedia.description}</p>
              <Button
                variant="primary"
                className="w-fit"
                onClick={() => router.push(currentMedia.urlGoTo || '')}
              >
                {currentMedia.cta || 'Saiba mais'}
              </Button>
            </div>
          </div>
        )}

        {/* Botões de navegação */}
        <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4">
          <button
            onClick={handlePrev}
            className="hidden md:flex bg-white/50 w-12 h-12 rounded-full hover:bg-gray-300 transition items-center justify-center"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="hidden md:flex bg-white/50 w-12 h-12 rounded-full hover:bg-gray-300 transition items-center justify-center"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {advertisements.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-gray-700' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { AdvertisementResponse } from '@/types/api/Response/AdvertisementResponse'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'

interface AdvertisementProps {
  advertisements: AdvertisementResponse
}

export const Advertisement = ({ advertisements }: AdvertisementProps) => {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(0)

  // Auto-scroll logic
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) =>
        prevIndex === advertisements.length - 1 ? 0 : prevIndex + 1,
      )
    }, 7000) // Auto-scroll every 7 seconds

    return () => clearInterval(interval)
  }, [advertisements, isAutoPlaying])

  const handlePrev = useCallback(() => {
    setIsAutoPlaying(false) // Para o auto-scroll
    setDirection(-1)
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? advertisements.length - 1 : prevIndex - 1,
    )
  }, [advertisements.length])

  const handleNext = useCallback(() => {
    setIsAutoPlaying(false) // Para o auto-scroll
    setDirection(1)
    setCurrentIndex((prevIndex) =>
      prevIndex === advertisements.length - 1 ? 0 : prevIndex + 1,
    )
  }, [advertisements.length])

  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const swipeThreshold = 50
      if (info.offset.x > swipeThreshold) {
        setIsAutoPlaying(false) // Para o auto-scroll
        handlePrev()
      } else if (info.offset.x < -swipeThreshold) {
        setIsAutoPlaying(false) // Para o auto-scroll
        handleNext()
      }
    },
    [handlePrev, handleNext],
  )

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  const currentAd = advertisements[currentIndex]
  const currentMedia = currentAd?.medias?.[0] || {
    title: '',
    description: '',
    cta: '',
    image: { url: '' },
    urlGoTo: '',
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      scale: 0.8,
    }),
  }

  return (
    <div className="w-full relative group">
      <div className="relative aspect-[21/9] shadow-2xl overflow-hidden">
        {/* Carrossel com Framer Motion */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-pointer"
            onClick={() => {
              if (currentAd?.type === 'MediaOnly' && currentMedia.urlGoTo) {
                setIsAutoPlaying(false) // Para o auto-scroll
                router.push(currentMedia.urlGoTo)
              }
            }}
          >
            {/* Imagem de fundo com overlay gradiente */}
            <div className="relative w-full h-full">
              <Image
                src={currentMedia.image.url}
                alt={currentMedia.title || ''}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
            </div>

            {/* Conteúdo sobreposto */}
            {currentAd?.type === 'MediaAndText' && (
              <motion.div
                className="absolute inset-0 flex items-center justify-between px-6 py-4 md:px-24 md:py-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="text-white flex flex-col justify-evenly h-full md:w-1/2 space-y-4">
                  <motion.h1
                    className="text-xl md:text-4xl font-bold leading-tight"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {currentMedia.title}
                  </motion.h1>
                  <motion.p
                    className="text-sm md:text-lg text-gray-200 leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {currentMedia.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <Button
                      variant="primary"
                      className="w-fit px-6 py-3 text-sm md:text-base font-semibold hover:scale-105 transition-transform duration-200"
                      onClick={() => {
                        setIsAutoPlaying(false) // Para o auto-scroll
                        router.push(currentMedia.urlGoTo || '')
                      }}
                    >
                      {currentMedia.cta || 'Saiba mais'}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Botões de navegação */}
        <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            onClick={handlePrev}
            className="hidden md:flex bg-white/20 backdrop-blur-sm w-12 h-12 rounded-full hover:bg-white/40 transition-all duration-200 items-center justify-center text-white border border-white/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            onClick={handleNext}
            className="hidden md:flex bg-white/20 backdrop-blur-sm w-12 h-12 rounded-full hover:bg-white/40 transition-all duration-200 items-center justify-center text-white border border-white/30"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>

        {/* Controles de reprodução */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            onClick={toggleAutoPlay}
            className="bg-black/30 backdrop-blur-sm w-10 h-10 rounded-full hover:bg-black/50 transition-all duration-200 items-center justify-center text-white border border-white/30 flex"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
          </motion.button>
        </div>

        {/* Contador de bolinhas */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2 z-10">
          {advertisements.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setIsAutoPlaying(false) // Para o auto-scroll
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
              }}
              className="relative"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
              {index === currentIndex && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

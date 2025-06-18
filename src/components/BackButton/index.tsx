'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  className?: string
}

export function BackButton({ className = '' }: BackButtonProps) {
  const router = useRouter()

  return (
    <button
      type="button"
      className={`flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer ${className}`}
      onClick={() => router.back()}
    >
      <ArrowLeft className="w-4 h-4" />
      Voltar
    </button>
  )
}

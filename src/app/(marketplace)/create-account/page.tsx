'use client'

import Link from 'next/link'

import SignupForm from '@/components/SignupForm/SignupForm'

export default function CreateAccount() {
  return (
    <>
      <h2 className="text-[22px] font-bold text-center  px-4 py-8">
        Crie sua conta
      </h2>
      <div className="container mx-auto justify-items-start">
        <div className="p-4 rounded-lg w-full max-w-2xl mx-auto">
          <SignupForm />

          <div className="mt-6 flex flex-col gap-2 text-center">
            <p className="text-gray-600">Já tem uma conta?</p>
            <Link
              href="/login"
              className="w-full underline text-primary hover:text-primary-hover"
            >
              Entrar
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

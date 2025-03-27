'use client'

import * as yup from 'yup'
import Button from '../Button/Button'
import { useRef, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Input from '../Input/Input'
interface FormData {
  nome: string
  sobrenome: string
  email: string
  senha: string
  repetirSenha: string
  numeroLicenca: string
  anexo: FileList
}

const schema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),
  sobrenome: yup.string().required('O sobrenome é obrigatório'),
  email: yup
    .string()
    .email('E-mail inválido')
    .required('O e-mail é obrigatório'),
  senha: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('A senha é obrigatória'),
  repetirSenha: yup
    .string()
    .oneOf([yup.ref('senha')], 'As senhas não coincidem')
    .required('É necessário repetir a senha'),
  numeroLicenca: yup.string().required('O número da licença é obrigatório'),
  anexo: yup
    .mixed<FileList>()
    .test(
      'fileList',
      'O anexo é obrigatório',
      (value) => value instanceof FileList && value.length > 0,
    )
    .required('O anexo é obrigatório'),
})

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setValue('anexo', files) // Atualiza o valor do campo "anexo" no react-hook-form
      clearErrors('anexo')
      setFileName(files[0].name) // Atualiza o nome do arquivo exibido
    }
  }

  const onSubmit = (data: FormData) => {
    console.log('Dados enviados:', data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div>
        <Input
          {...register('nome')}
          placeholder="Nome"
          label="Nome"
          messageError={errors.nome?.message}
        />
      </div>

      <div>
        <Input
          {...register('sobrenome')}
          placeholder="Sobrenome"
          label="Sobrenome"
          messageError={errors.sobrenome?.message}
        />
      </div>

      <div>
        <Input
          {...register('email')}
          placeholder="E-mail"
          label="Endereço de e-mail"
          type="email"
          messageError={errors.email?.message}
        />
      </div>

      <div>
        <Input
          {...register('senha')}
          placeholder="Criar senha"
          label="Criar senha"
          type="password"
          messageError={errors.senha?.message}
        />
      </div>

      <div>
        <Input
          {...register('repetirSenha')}
          placeholder="Repetir Senha"
          label="Repetir Senha"
          type="password"
          messageError={errors.repetirSenha?.message}
        />
      </div>

      <div>
        <Input
          {...register('numeroLicenca')}
          placeholder="Número da licença"
          label="Número da licença (CRM, CRO, etc)"
          messageError={errors.numeroLicenca?.message}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-4">Anexo</label>
        <label
          className="h-10 min-w-[80px] max-w-[480px] px-4 rounded-[12px] flex items-center justify-center 
    font-medium transition text-[12px] bg-[#E8EDF2] text-[#0D141C] hover:bg-cyan-600 hover:text-white"
        >
          Selecionar Arquivo
          <input
            type="file"
            {...register('anexo')}
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </label>
        {fileName && (
          <p className="text-gray-700 mt-2 text-sm">📄 {fileName}</p>
        )}
        {errors.anexo && (
          <p className="text-red-500 text-sm">{errors.anexo.message}</p>
        )}
      </div>
      <p className='text-sm"'>
        Ao criar sua conta, você concorda com nossos termos de uso e política de
        privacidade.
      </p>
      <Button
        text="Criar Conta"
        className="w-full bg-cyan-600 text-white p-3 rounded-3xl font-bold hover:bg-blue-700"
      />
    </form>
  )
}

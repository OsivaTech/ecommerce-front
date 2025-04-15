import { z } from 'zod'

export const personalDocumentTypeSchema = z.enum(['None', 'CPF', 'CNPJ'])
export const professionalDocumentTypeSchema = z.enum(['None', 'CRM', 'CRO'])

export const personalDocumentSchema = z.object({
  number: z
    .string()
    .min(1, 'O campo é obrigatório')
    .min(11, 'O número do documento deve ter pelo menos 11 caracteres'),
  type: personalDocumentTypeSchema,
})

export const professionalDocumentSchema = z.object({
  number: z.string().min(1, 'O campo é obrigatório'),
  type: professionalDocumentTypeSchema,
  fileId: z.number().optional(),
})

export const addressSchema = z.object({
  street: z.string().min(1, 'O campo é obrigatório'),
  number: z.string().nullable(),
  complement: z.string().nullable().optional(),
  neighborhood: z.string().min(1, 'O campo é obrigatório'),
  city: z.string().min(1, 'O campo é obrigatório'),
  state: z
    .string()
    .min(1, 'O campo é obrigatório')
    .min(2, 'O estado deve ter 2 caracteres')
    .max(2, 'O estado deve ter 2 caracteres'),
  postalCode: z.string().min(1, 'O campo é obrigatório'),
})

export const registrationSchema = z
  .object({
    name: z
      .string()
      .min(1, 'O campo é obrigatório')
      .min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: z.string().min(1, 'O campo é obrigatório').email('Email inválido'),
    phone: z
      .string()
      .min(1, 'O campo é obrigatório')
      .min(10, 'O telefone deve ter pelo menos 10 caracteres'),
    password: z
      .string()
      .min(1, 'O campo é obrigatório')
      .min(6, 'A senha deve ter pelo menos 6 caracteres'),
    repeatPassword: z
      .string()
      .min(1, 'O campo é obrigatório')
      .min(6, 'A senha deve ter pelo menos 6 caracteres'),
    personalDocument: personalDocumentSchema,
    professionalDocument: professionalDocumentSchema,
    address: addressSchema,
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'As senhas não coincidem',
    path: ['repeatPassword'],
  })

export type RegistrationFormData = z.infer<typeof registrationSchema>

import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .email('Digite um email válido')
    .min(1, 'O email é obrigatório'),
  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .min(1, 'A senha é obrigatória'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

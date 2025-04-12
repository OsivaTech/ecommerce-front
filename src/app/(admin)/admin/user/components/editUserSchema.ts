import { z } from 'zod'

export const personalDocumentSchema = z.object({
  number: z.string().optional(),
  type: z.enum(['None', 'CPF', 'CNPJ']).optional(),
})

export const professionalDocumentSchema = z.object({
  file: z
    .object({
      id: z.number(),
      name: z.string(),
      url: z.string(),
      size: z.number(),
      contentType: z.string(),
    })
    .optional()
    .nullable(),
  number: z.string().optional(),
  type: z.enum(['None', 'CRM', 'CRO']).optional(),
  fileId: z.number().optional(),
})

export const addressSchema = z.object({
  id: z.number().optional().nullable(),
  street: z.string().optional().nullable(),
  number: z.string().optional().nullable(),
  complement: z.string().optional().nullable(),
  neighborhood: z.string().optional().nullable(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
})

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  status: z.enum(['None', 'Active', 'Inactive', 'Blocked', 'Deleted']),
  personalDocument: personalDocumentSchema,
  professionalDocument: professionalDocumentSchema,
  address: addressSchema.optional().nullable(),
})

export type UserFormData = z.infer<typeof userSchema>

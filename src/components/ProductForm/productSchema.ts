import { z } from 'zod'

const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
})

const fileSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  size: z.number(),
  contentType: z.string(),
})

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number().nullable().optional(),
  stock: z.number(),
  category: categorySchema,
  file: fileSchema,
})

export type ProductFormData = z.infer<typeof productSchema>

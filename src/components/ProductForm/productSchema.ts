import { z } from 'zod'

const categorySchema = z.object({
  id: z.number().min(1, 'A categoria é obrigatória'),
  name: z.string().optional(),
})

const fileSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  size: z.number(),
  contentType: z.string(),
})

const dimensionsSchema = z
  .object({
    width: z.number().min(0, 'A largura deve ser maior ou igual a 0'),
    height: z.number().min(0, 'A altura deve ser maior ou igual a 0'),
    length: z.number().min(0, 'O comprimento deve ser maior ou igual a 0'),
    weight: z.number().min(0, 'O peso deve ser maior ou igual a 0'),
  })
  .optional()

export const productSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  price: z
    .number()
    .min(0, 'O preço deve ser maior ou igual a 0')
    .nullable()
    .optional(),
  stock: z.number().min(0, 'O estoque deve ser maior ou igual a 0'),
  category: categorySchema,
  file: fileSchema,
  status: z.string().min(1, 'O status é obrigatório'),
  dimensions: dimensionsSchema,
})

export type ProductFormData = z.infer<typeof productSchema>

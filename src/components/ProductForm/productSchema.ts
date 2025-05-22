import { z } from 'zod'

const categorySchema = z.object({
  id: z.number().min(1, 'A categoria é obrigatória'),
  name: z.string().optional(),
})

const fileSchema = z.object({
  id: z.number().min(1, 'A imagem é obrigatória'),
  name: z.string(),
  url: z.string(),
  size: z.number(),
  contentType: z.string(),
})

const dimensionsSchema = z.object({
  width: z.number().min(0.01, 'A largura deve ser maior que zero'),
  height: z.number().min(0.01, 'A altura deve ser maior que zero'),
  length: z.number().min(0.01, 'O comprimento deve ser maior que zero'),
  weight: z.number().min(0.01, 'O peso deve ser maior que zero'),
})

export const productSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'O nome é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  price: z
    .number()
    .min(0.01, 'O preço é obrigatório e deve ser maior que zero'),
  stock: z.number().min(0, 'O estoque deve ser maior ou igual a 0').optional(),
  category: categorySchema,
  file: fileSchema,
  status: z.string().min(1, 'O status é obrigatório'),
  dimensions: dimensionsSchema,
})

export type ProductFormData = z.infer<typeof productSchema>

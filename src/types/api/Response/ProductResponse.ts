import { components } from '@/schema/types'

export type ProductResponse = components['schemas']['ProductResponse'][]

export type Product = components['schemas']['ProductResponse']

export type ProductFeaturedResponse =
  components['schemas']['ProductResponseWithTotalOrders'][]

export type ProductFeatured =
  components['schemas']['ProductResponseWithTotalOrders']

export type CreateProductResponse = components['schemas']['ProductResponse']

export type UpdateProductResponse = components['schemas']['ProductResponse']

export type CategoryDto = {
  id: string
  slug: string
  name: string
  sortOrder: number
  isActive: boolean
}

export type ProductDto = {
  id: string
  slug: string
  name: string
  description: string | null
  details: string | null
  weight: string
  price: number
  badge: string | null
  imageUrl: string | null
  categoryId: string
  sortOrder: number
  isActive: boolean
}

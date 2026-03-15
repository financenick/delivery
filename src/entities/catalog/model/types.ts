export type Product = {
  id: string
  slug?: string
  name: string
  description?: string
  details?: string
  weight: string
  price: number
  badge?: string
  imageUrl?: string
  categoryId: string
  sortOrder?: number
  isActive?: boolean
}

export type Category = {
  id: string
  slug?: string
  name: string
  sortOrder?: number
  isActive?: boolean
}

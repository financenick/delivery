export type Product = {
  id: string
  name: string
  description?: string
  details?: string
  image?: string
  weight: string
  price: number
  badge?: string
  categoryId: string
}

export type Category = {
  id: string
  name: string
}

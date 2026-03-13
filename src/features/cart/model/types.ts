import type { Product } from '../../../entities/catalog/model/types'

export type CartItem = {
  product: Product
  quantity: number
}

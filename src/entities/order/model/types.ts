import type { CartItem } from '../../../features/cart/model/types'
import type { PaymentMethodDto } from '../api/contracts'

export type CheckoutFormValues = {
  customerName: string
  customerPhone: string
  deliveryAddress: string
  comment: string
  paymentMethod: PaymentMethodDto
}

export type OrderDraft = {
  form: CheckoutFormValues
  items: CartItem[]
}

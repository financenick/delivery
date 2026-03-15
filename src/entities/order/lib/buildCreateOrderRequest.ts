import type { CartItem } from '../../../features/cart/model/types'
import type { CreateOrderRequestDto } from '../api/contracts'
import type { CheckoutFormValues } from '../model/types'

export function buildCreateOrderRequest(
  form: CheckoutFormValues,
  cart: CartItem[],
): CreateOrderRequestDto {
  return {
    customerName: form.customerName.trim(),
    customerPhone: form.customerPhone.trim(),
    deliveryAddress: form.deliveryAddress.trim(),
    comment: form.comment.trim() || null,
    paymentMethod: form.paymentMethod,
    items: cart.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      unitPrice: item.product.price,
    })),
  }
}

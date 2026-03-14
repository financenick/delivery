export type PaymentMethodDto = 'cash' | 'card'

export type CreateOrderItemDto = {
  productId: string
  quantity: number
  unitPrice: number
}

export type CreateOrderRequestDto = {
  customerName: string
  customerPhone: string
  deliveryAddress: string
  comment: string | null
  paymentMethod: PaymentMethodDto
  items: CreateOrderItemDto[]
}

export type CreateOrderResponseDto = {
  orderId: string
  status: 'created'
}

# Order API Contract

## Create Order Request

```ts
type PaymentMethodDto = 'cash' | 'card'

type CreateOrderItemDto = {
  productId: string
  quantity: number
  unitPrice: number
}

type CreateOrderRequestDto = {
  customerName: string
  customerPhone: string
  deliveryAddress: string
  comment: string | null
  paymentMethod: PaymentMethodDto
  items: CreateOrderItemDto[]
}
```

Notes:
- `customerPhone` is sent in normalized UI format, currently `+7 (999) 123-45-67`.
- `unitPrice` is included so the backend receives the client-side snapshot of the basket. The backend should still validate actual prices before creating the order.
- `comment` is nullable.
- `items` must contain at least one product.

## Create Order Response

```ts
type CreateOrderResponseDto = {
  orderId: string
  status: 'created'
}
```

## Endpoint

- `POST /orders`

Current business flow:
- The first backend version only needs to accept the order and trigger a notification about a new order.
- Full payment processing, order statuses, and user account binding are out of scope for now.

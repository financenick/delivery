import { useEffect, useMemo, useState } from 'react'
import type { Product } from '../../../entities/catalog/model/types'
import type { CartItem } from './types'

const CART_STORAGE_KEY = 'delivery-cart'

function readCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return []

  try {
    const rawValue = window.localStorage.getItem(CART_STORAGE_KEY)
    if (!rawValue) return []

    const parsed = JSON.parse(rawValue)
    if (!Array.isArray(parsed)) return []

    return parsed.filter((item): item is CartItem => {
      return Boolean(
        item &&
          typeof item.quantity === 'number' &&
          item.product &&
          typeof item.product.id === 'string' &&
          typeof item.product.name === 'string' &&
          typeof item.product.weight === 'string' &&
          typeof item.product.price === 'number' &&
          typeof item.product.categoryId === 'string',
      )
    })
  } catch {
    return []
  }
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(() => readCartFromStorage())
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  )

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart],
  )

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const changeQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const clearCart = () => {
    setCart([])
  }

  return {
    cart,
    cartCount,
    cartTotal,
    isCartOpen,
    addToCart,
    changeQuantity,
    clearCart,
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
  }
}

import { formatPrice } from '../../entities/catalog/lib/formatPrice'
import type { CartItem } from '../../features/cart/model/types'

type CartDrawerProps = {
  cart: CartItem[]
  cartTotal: number
  isOpen: boolean
  onClose: () => void
  onChangeQuantity: (productId: string, delta: number) => void
  onClearCart: () => void
}

export function CartDrawer({
  cart,
  cartTotal,
  isOpen,
  onClose,
  onChangeQuantity,
  onClearCart,
}: CartDrawerProps) {
  return (
    <>
      <div
        className={isOpen ? 'cart-overlay open' : 'cart-overlay'}
        onClick={onClose}
      />
      <aside className={isOpen ? 'cart-panel open' : 'cart-panel'}>
        <div className="cart-header">
          <h2>Корзина</h2>
          <button
            type="button"
            className="icon-button"
            aria-label="Закрыть корзину"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="cart-empty">Ваша корзина пуста. Добавьте блюда из меню.</div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.product.id} className="cart-item">
                  <div className="cart-item-main">
                    <div className="cart-item-title">{item.product.name}</div>
                    <div className="cart-item-meta">
                      {item.product.weight} · {formatPrice(item.product.price)}
                    </div>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      type="button"
                      className="qty-button"
                      onClick={() => onChangeQuantity(item.product.id, -1)}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      type="button"
                      className="qty-button"
                      onClick={() => onChangeQuantity(item.product.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="cart-row">
                <span>Итого</span>
                <span className="cart-total">{formatPrice(cartTotal)}</span>
              </div>
              <button type="button" className="primary-button">
                Оформить заказ
              </button>
              <button
                type="button"
                className="link-button secondary"
                onClick={onClearCart}
              >
                Очистить корзину
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

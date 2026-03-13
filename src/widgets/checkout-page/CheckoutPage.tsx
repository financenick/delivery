import { useState } from 'react'
import { formatPrice } from '../../entities/catalog/lib/formatPrice'
import type { CartItem } from '../../features/cart/model/types'

type CheckoutPageProps = {
  cart: CartItem[]
  cartTotal: number
  onHomeClick: () => void
  onChangeQuantity: (productId: string, delta: number) => void
}

function formatRussianPhone(value: string) {
  const digits = value.replace(/\D/g, '')
  if (!digits) return ''

  const normalized =
    digits[0] === '8'
      ? `7${digits.slice(1)}`
      : digits[0] === '7'
        ? digits
        : `7${digits}`

  const trimmed = normalized.slice(0, 11)
  const country = '+7'
  const part1 = trimmed.slice(1, 4)
  const part2 = trimmed.slice(4, 7)
  const part3 = trimmed.slice(7, 9)
  const part4 = trimmed.slice(9, 11)

  let formatted = country

  if (part1) {
    formatted += ` (${part1}`
  }
  if (part1.length === 3) {
    formatted += ')'
  }
  if (part2) {
    formatted += ` ${part2}`
  }
  if (part3) {
    formatted += `-${part3}`
  }
  if (part4) {
    formatted += `-${part4}`
  }

  return formatted
}

function hasValidRussianPhone(value: string) {
  return value.replace(/\D/g, '').length === 11
}

export function CheckoutPage({
  cart,
  cartTotal,
  onHomeClick,
  onChangeQuantity,
}: CheckoutPageProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [comment, setComment] = useState('')
  const [payment, setPayment] = useState<'cash' | 'card'>('card')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const isPhoneValid = hasValidRussianPhone(phone)

  if (cart.length === 0) {
    return (
      <main className="checkout-empty">
        <div className="checkout-empty-icon">🛍</div>
        <h1 className="checkout-empty-title">Корзина пуста</h1>
        <p className="checkout-empty-text">
          Добавьте товары в корзину, чтобы оформить заказ.
        </p>
        <button type="button" className="primary-button" onClick={onHomeClick}>
          Перейти в меню
        </button>
      </main>
    )
  }

  if (isSubmitted) {
    return (
      <main className="checkout-empty">
        <div className="checkout-empty-icon success">✓</div>
        <h1 className="checkout-empty-title">Заказ подтверждён</h1>
        <p className="checkout-empty-text">
          Спасибо, {name || 'гость'}. Мы приняли заказ и скоро свяжемся с вами для
          подтверждения. Примерное время доставки: 45-60 минут.
        </p>
        <button type="button" className="primary-button" onClick={onHomeClick}>
          Вернуться в меню
        </button>
      </main>
    )
  }

  return (
    <main className="page-section">
      <section className="page-hero">
        <div className="page-breadcrumbs">
          <button className="link-button" type="button" onClick={onHomeClick}>
            Главная
          </button>
          <span>/</span>
          <span className="page-breadcrumb-current">Оформление заказа</span>
        </div>
        <h1 className="page-title">Оформление заказа</h1>
        <p className="page-lead">
          Заполните контакты и адрес доставки. Оплата и итог заказа будут
          подтверждены сразу на этой странице.
        </p>
      </section>

      <section className="checkout-layout">
        <form
          className="checkout-form-card"
          onSubmit={(event) => {
            event.preventDefault()
            setIsSubmitted(true)
          }}
        >
          <div className="checkout-section">
            <h2 className="checkout-section-title">Контактные данные</h2>
            <label className="checkout-field">
              <span className="checkout-label">Имя *</span>
              <input
                className="checkout-input"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Как к вам обращаться"
                required
              />
            </label>
            <label className="checkout-field">
              <span className="checkout-label">Телефон *</span>
              <input
                className="checkout-input"
                value={phone}
                onChange={(event) => setPhone(formatRussianPhone(event.target.value))}
                placeholder="+7 (999) 123-45-67"
                inputMode="tel"
                autoComplete="tel"
                pattern="\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}"
                required
              />
            </label>
            <label className="checkout-field">
              <span className="checkout-label">Адрес доставки *</span>
              <input
                className="checkout-input"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Улица, дом, квартира"
                required
              />
            </label>
            <label className="checkout-field">
              <span className="checkout-label">Комментарий к заказу</span>
              <textarea
                className="checkout-input checkout-textarea"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Например: код домофона, этаж, пожелания"
              />
            </label>
          </div>

          <div className="checkout-section">
            <h2 className="checkout-section-title">Способ оплаты</h2>
            <label className="checkout-radio">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={payment === 'card'}
                onChange={() => setPayment('card')}
              />
              <span>Картой курьеру</span>
            </label>
            <label className="checkout-radio">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={payment === 'cash'}
                onChange={() => setPayment('cash')}
              />
              <span>Наличными курьеру</span>
            </label>
          </div>

          <button
            type="submit"
            className="primary-button checkout-submit"
            disabled={!isPhoneValid}
          >
            Подтвердить заказ
          </button>
        </form>

        <aside className="checkout-summary-card">
          <div className="checkout-summary-header">
            <h2 className="checkout-section-title">Ваш заказ</h2>
            <span className="checkout-summary-count">{cart.length} поз.</span>
          </div>

          <div className="checkout-summary-items">
            {cart.map((item) => (
              <div key={item.product.id} className="checkout-item">
                <div className="checkout-item-main">
                  <div className="checkout-item-title">{item.product.name}</div>
                  <div className="checkout-item-meta">
                    {item.product.weight} · {formatPrice(item.product.price)}
                  </div>
                </div>
                <div className="checkout-item-controls">
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

          <div className="checkout-summary-footer">
            <div className="checkout-row">
              <span>Доставка</span>
              <span>{cartTotal >= 1000 ? 'Бесплатно' : '150 ₽'}</span>
            </div>
            <div className="checkout-row total">
              <span>Итого</span>
              <span>{formatPrice(cartTotal + (cartTotal >= 1000 ? 0 : 150))}</span>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}

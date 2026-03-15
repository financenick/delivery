import { useEffect } from 'react'
import { formatPrice } from '../../entities/catalog/lib/formatPrice'
import type { Product } from '../../entities/catalog/model/types'

type ProductModalProps = {
  product: Product | null
  isAdded?: boolean
  onClose: () => void
  onAddToCart: (product: Product) => void
}

export function ProductModal({
  product,
  isAdded = false,
  onClose,
  onAddToCart,
}: ProductModalProps) {
  useEffect(() => {
    if (!product) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, product])

  if (!product) return null

  return (
    <>
      <div className="product-modal-overlay" onClick={onClose} />
      <aside
        className="product-modal"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        role="dialog"
      >
        <button
          type="button"
          className="product-modal-close"
          aria-label="Закрыть карточку товара"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="product-modal-media" aria-hidden="true">
          <div className="product-modal-image-placeholder">Картинка блюда</div>
        </div>
        <div className="product-modal-content">
          {product.badge && <div className="product-modal-badge">{product.badge}</div>}
          <h2 id="product-modal-title" className="product-modal-title">
            {product.name}
          </h2>
          <div className="product-modal-meta">{product.weight}</div>
          {product.description && (
            <p className="product-modal-description">{product.description}</p>
          )}
          {product.details && <p className="product-modal-details">{product.details}</p>}
        </div>
        <div className="product-modal-footer">
          <div className="product-modal-price">{formatPrice(product.price)}</div>
          <button
            type="button"
            className={isAdded ? 'primary-button added' : 'primary-button'}
            onClick={() => onAddToCart(product)}
          >
            {isAdded ? 'Добавлено в корзину' : 'Добавить в корзину'}
          </button>
        </div>
      </aside>
    </>
  )
}

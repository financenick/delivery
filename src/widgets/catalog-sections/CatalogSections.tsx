import { useEffect, useRef, useState } from 'react'
import { formatPrice } from '../../entities/catalog/lib/formatPrice'
import type { Category, Product } from '../../entities/catalog/model/types'

type CatalogSectionsProps = {
  categories: Category[]
  productsByCategory: Record<string, Product[]>
  onAddToCart: (product: Product) => void
  onSectionRef: (categoryId: string, element: HTMLElement | null) => void
}

export function CatalogSections({
  categories,
  productsByCategory,
  onAddToCart,
  onSectionRef,
}: CatalogSectionsProps) {
  const [addedProductIds, setAddedProductIds] = useState<Record<string, boolean>>({})
  const timersRef = useRef<Record<string, number>>({})

  useEffect(() => {
    return () => {
      for (const timer of Object.values(timersRef.current)) {
        window.clearTimeout(timer)
      }
    }
  }, [])

  const handleAddToCartClick = (product: Product) => {
    onAddToCart(product)

    if (timersRef.current[product.id]) {
      window.clearTimeout(timersRef.current[product.id])
    }

    setAddedProductIds((prev) => ({ ...prev, [product.id]: true }))

    timersRef.current[product.id] = window.setTimeout(() => {
      setAddedProductIds((prev) => {
        const next = { ...prev }
        delete next[product.id]
        return next
      })
      delete timersRef.current[product.id]
    }, 1400)
  }

  return (
    <main className="main">
      <div className="content">
        {categories.map((category) => {
          const products = productsByCategory[category.id] ?? []

          return (
            <section
              key={category.id}
              id={`cat-${category.id}`}
              className="category-section"
              ref={(element) => onSectionRef(category.id, element)}
            >
              <div className="product-section">
                <div className="section-header">
                  <div className="section-title-block">
                    <h1 className="section-title">{category.name}</h1>
                    {category.id === 'sets' && (
                      <div className="section-subtitle">
                        <span className="badge badge-accent">
                          Лучшая цена без скидок
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="section-results">
                    Найдено <strong>{products.length}</strong> позиций
                  </div>
                </div>

                <div className="product-grid">
                  {products.map((product) => (
                    <article key={product.id} className="product-card">
                      <div className="product-image-placeholder" aria-hidden="true">
                        <span>Картинка-заглушка</span>
                      </div>
                      <div className="product-content">
                        {product.badge && (
                          <div className="product-badge">{product.badge}</div>
                        )}
                        <h2 className="product-name">{product.name}</h2>
                        <div className="product-weight">{product.weight}</div>
                        {product.description && (
                          <p className="product-description">{product.description}</p>
                        )}
                        {product.details && (
                          <p className="product-details">{product.details}</p>
                        )}
                      </div>
                      <div className="product-footer">
                        <div className="product-price">{formatPrice(product.price)}</div>
                        <button
                          type="button"
                          className={
                            addedProductIds[product.id]
                              ? 'add-to-cart-button added'
                              : 'add-to-cart-button'
                          }
                          onClick={() => handleAddToCartClick(product)}
                        >
                          {addedProductIds[product.id] ? 'Добавлено' : 'В корзину'}
                        </button>
                      </div>
                    </article>
                  ))}
                  {products.length === 0 && (
                    <div className="empty-state">По вашему запросу ничего не найдено.</div>
                  )}
                </div>
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}

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
                          className="add-to-cart-button"
                          onClick={() => onAddToCart(product)}
                        >
                          В корзину
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

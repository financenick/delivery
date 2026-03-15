import { forwardRef, useEffect, useRef } from 'react'
import type { Category } from '../../entities/catalog/model/types'

type CategoryNavProps = {
  categories: Category[]
  activeCategoryId: string
  cartCount?: number
  isCompact?: boolean
  onCategoryClick: (categoryId: string) => void
  onCartClick?: () => void
}

export const CategoryNav = forwardRef<HTMLElement, CategoryNavProps>(
  (
    {
      categories,
      activeCategoryId,
      cartCount = 0,
      isCompact = false,
      onCategoryClick,
      onCartClick,
    },
    ref,
  ) => {
    const categoryButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({})

    useEffect(() => {
      const activeButton = categoryButtonRefs.current[activeCategoryId]
      if (!activeButton) return

      activeButton.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      })
    }, [activeCategoryId])

    return (
      <nav
        ref={ref}
        className={isCompact ? 'nav-categories compact' : 'nav-categories'}
        aria-label="Категории меню"
      >
        <div className="nav-categories-list">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              ref={(element) => {
                categoryButtonRefs.current[category.id] = element
              }}
              className={
                category.id === activeCategoryId
                  ? 'nav-category active'
                  : 'nav-category'
              }
              onClick={() => onCategoryClick(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        {isCompact && onCartClick && (
          <button
            type="button"
            className="nav-cart-button"
            onClick={onCartClick}
          >
            <span>Корзина</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        )}
      </nav>
    )
  },
)

CategoryNav.displayName = 'CategoryNav'

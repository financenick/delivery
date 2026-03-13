import { forwardRef } from 'react'
import type { Category } from '../../entities/catalog/model/types'

type CategoryNavProps = {
  categories: Category[]
  activeCategoryId: string
  onCategoryClick: (categoryId: string) => void
}

export const CategoryNav = forwardRef<HTMLElement, CategoryNavProps>(
  ({ categories, activeCategoryId, onCategoryClick }, ref) => {
    return (
      <nav ref={ref} className="nav-categories" aria-label="Категории меню">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
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
      </nav>
    )
  },
)

CategoryNav.displayName = 'CategoryNav'

import type { Category } from '../../entities/catalog/model/types'

type CategoryNavProps = {
  categories: Category[]
  activeCategoryId: string
  onCategoryClick: (categoryId: string) => void
}

export function CategoryNav({
  categories,
  activeCategoryId,
  onCategoryClick,
}: CategoryNavProps) {
  return (
    <nav className="nav-categories" aria-label="Категории меню">
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
}

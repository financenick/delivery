import type { Category, Product } from '../model/types'
import type { CategoryDto, ProductDto } from './contracts'

export function mapCategoryDtoToCategory(category: CategoryDto): Category {
  return {
    id: category.id,
    slug: category.slug,
    name: category.name,
    sortOrder: category.sortOrder,
    isActive: category.isActive,
  }
}

export function mapProductDtoToProduct(product: ProductDto): Product {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description ?? undefined,
    details: product.details ?? undefined,
    weight: product.weight,
    price: product.price,
    badge: product.badge ?? undefined,
    imageUrl: product.imageUrl ?? undefined,
    categoryId: product.categoryId,
    sortOrder: product.sortOrder,
    isActive: product.isActive,
  }
}

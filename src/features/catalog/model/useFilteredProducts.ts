import { useMemo } from 'react'
import type { Category, Product } from '../../../entities/catalog/model/types'

export function useFilteredProducts(
  categories: Category[],
  products: Product[],
  search: string,
) {
  const productsByCategory = useMemo(() => {
    return products.reduce<Record<string, Product[]>>((acc, product) => {
      if (!acc[product.categoryId]) {
        acc[product.categoryId] = []
      }
      acc[product.categoryId].push(product)
      return acc
    }, {})
  }, [products])

  return useMemo(() => {
    const query = search.trim().toLowerCase()

    return categories.reduce<Record<string, Product[]>>((acc, category) => {
      const categoryProducts = productsByCategory[category.id] ?? []
      acc[category.id] = categoryProducts.filter((product) => {
        if (!query) return true
        const haystack = [
          product.name,
          product.description ?? '',
          product.details ?? '',
        ]
          .join(' ')
          .toLowerCase()

        return haystack.includes(query)
      })
      return acc
    }, {})
  }, [categories, productsByCategory, search])
}

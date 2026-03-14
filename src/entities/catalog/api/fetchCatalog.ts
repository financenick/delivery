import { CATEGORIES, PRODUCTS } from '../model/data'
import type { Category, Product } from '../model/types'
import type { CategoryDto, ProductDto } from './contracts'
import {
  mapCategoryDtoToCategory,
  mapProductDtoToProduct,
} from './mappers'

export type CatalogResponse = {
  categories: Category[]
  products: Product[]
  source: 'api' | 'mock'
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '')

async function requestJson<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function fetchCatalog(): Promise<CatalogResponse> {
  if (!API_BASE_URL) {
    return {
      categories: CATEGORIES,
      products: PRODUCTS,
      source: 'mock',
    }
  }

  try {
    const [categoryDtos, productDtos] = await Promise.all([
      requestJson<CategoryDto[]>(`${API_BASE_URL}/categories`),
      requestJson<ProductDto[]>(`${API_BASE_URL}/products`),
    ])

    return {
      categories: categoryDtos.map(mapCategoryDtoToCategory),
      products: productDtos.map(mapProductDtoToProduct),
      source: 'api',
    }
  } catch (error) {
    console.warn('Catalog API is unavailable, falling back to mock data.', error)

    return {
      categories: CATEGORIES,
      products: PRODUCTS,
      source: 'mock',
    }
  }
}

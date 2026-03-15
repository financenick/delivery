import { useEffect, useState } from 'react'
import {
  fetchCatalog,
  type CatalogResponse,
} from '../../../entities/catalog/api/fetchCatalog'

type UseCatalogResult = CatalogResponse & {
  isLoading: boolean
}

export function useCatalog(): UseCatalogResult {
  const [state, setState] = useState<UseCatalogResult>({
    categories: [],
    products: [],
    source: 'mock',
    isLoading: true,
  })

  useEffect(() => {
    let isMounted = true

    fetchCatalog().then((catalog) => {
      if (!isMounted) return

      setState({
        ...catalog,
        isLoading: false,
      })
    })

    return () => {
      isMounted = false
    }
  }, [])

  return state
}

import { useEffect, useRef, useState } from 'react'
import type { Category } from '../../../entities/catalog/model/types'

export function useCategoryNavigation(
  categories: Category[],
  isEnabled: boolean,
) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    categories[0]?.id ?? '',
  )
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    if (!categories.length) {
      setActiveCategoryId('')
      return
    }

    const hasActiveCategory = categories.some(
      (category) => category.id === activeCategoryId,
    )

    if (!hasActiveCategory) {
      setActiveCategoryId(categories[0].id)
    }
  }, [activeCategoryId, categories])

  useEffect(() => {
    if (!isEnabled) return

    const elements = categories
      .map((category) => sectionRefs.current[category.id])
      .filter(
        (element): element is HTMLElement =>
          element !== null && element.isConnected,
      )

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        const topVisible = visibleEntries[0]?.target
        if (!topVisible?.id) return

        const categoryId = topVisible.id.replace('cat-', '')
        if (categoryId) {
          setActiveCategoryId(categoryId)
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: '-140px 0px -60% 0px',
      },
    )

    for (const element of elements) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [categories, isEnabled])

  const setSectionRef = (categoryId: string, element: HTMLElement | null) => {
    sectionRefs.current[categoryId] = element
  }

  const scrollToCategory = (categoryId: string) => {
    const element = sectionRefs.current[categoryId]
    if (!element) return

    setActiveCategoryId(categoryId)
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return {
    activeCategoryId,
    scrollToCategory,
    setSectionRef,
  }
}

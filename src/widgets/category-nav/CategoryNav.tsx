import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
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
    const listRef = useRef<HTMLDivElement | null>(null)
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
    const dragStateRef = useRef({
      pointerId: -1,
      startX: 0,
      scrollLeft: 0,
    })
    const suppressClickRef = useRef(false)
    const [isDragging, setIsDragging] = useState(false)
    const [indicatorStyle, setIndicatorStyle] = useState({
      width: 0,
      left: 0,
      opacity: 0,
    })

    useEffect(() => {
      const activeButton = buttonRefs.current[activeCategoryId]
      const listElement = listRef.current
      if (!activeButton || !listElement) return

      setIndicatorStyle({
        width: activeButton.offsetWidth,
        left: activeButton.offsetLeft,
        opacity: 1,
      })

      activeButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    }, [activeCategoryId, categories])

    useEffect(() => {
      const listElement = listRef.current
      if (!listElement) return

      const updateIndicator = () => {
        const activeButton = buttonRefs.current[activeCategoryId]
        if (!activeButton) return

        setIndicatorStyle({
          width: activeButton.offsetWidth,
          left: activeButton.offsetLeft,
          opacity: 1,
        })
      }

      updateIndicator()

      const resizeObserver = new ResizeObserver(updateIndicator)
      resizeObserver.observe(listElement)

      const activeButton = buttonRefs.current[activeCategoryId]
      if (activeButton) {
        resizeObserver.observe(activeButton)
      }

      window.addEventListener('resize', updateIndicator)

      return () => {
        resizeObserver.disconnect()
        window.removeEventListener('resize', updateIndicator)
      }
    }, [activeCategoryId])

    const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return

      dragStateRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        scrollLeft: event.currentTarget.scrollLeft,
      }
      suppressClickRef.current = false
      setIsDragging(true)
      event.currentTarget.setPointerCapture(event.pointerId)
    }

    const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
      if (dragStateRef.current.pointerId !== event.pointerId) return

      const deltaX = event.clientX - dragStateRef.current.startX
      if (Math.abs(deltaX) > 6) {
        suppressClickRef.current = true
      }

      event.currentTarget.scrollLeft = dragStateRef.current.scrollLeft - deltaX
    }

    const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
      if (dragStateRef.current.pointerId !== event.pointerId) return

      dragStateRef.current.pointerId = -1
      setIsDragging(false)
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    const setNavElement = (element: HTMLElement | null) => {
      if (typeof ref === 'function') {
        ref(element)
        return
      }

      if (ref) {
        ref.current = element
      }
    }

    return (
      <nav
        ref={setNavElement}
        className={isCompact ? 'nav-categories compact' : 'nav-categories'}
        aria-label="Категории меню"
      >
        <div
          ref={listRef}
          className={isDragging ? 'nav-categories-list dragging' : 'nav-categories-list'}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onClickCapture={(event) => {
            if (!suppressClickRef.current) return

            event.preventDefault()
            event.stopPropagation()
            suppressClickRef.current = false
          }}
        >
          <div
            className="nav-category-indicator"
            aria-hidden="true"
            style={{
              width: `${indicatorStyle.width}px`,
              transform: `translateX(${indicatorStyle.left}px)`,
              opacity: indicatorStyle.opacity,
            }}
          />
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={
                category.id === activeCategoryId
                  ? 'nav-category active'
                  : 'nav-category'
              }
              ref={(element) => {
                buttonRefs.current[category.id] = element
              }}
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

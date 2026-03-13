import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { CATEGORIES, PRODUCTS } from './entities/catalog/model/data'
import { useCart } from './features/cart/model/useCart'
import { useCategoryNavigation } from './features/catalog/model/useCategoryNavigation'
import { useFilteredProducts } from './features/catalog/model/useFilteredProducts'
import { AboutPage } from './widgets/about-page/AboutPage'
import { CartDrawer } from './widgets/cart-drawer/CartDrawer'
import { CatalogSections } from './widgets/catalog-sections/CatalogSections'
import { CategoryNav } from './widgets/category-nav/CategoryNav'
import { CheckoutPage } from './widgets/checkout-page/CheckoutPage'
import { DeliveryPage } from './widgets/delivery-page/DeliveryPage'
import { Footer } from './widgets/footer/Footer'
import { Header } from './widgets/header/Header'
import { PromoSlider } from './widgets/promo-slider/PromoSlider'

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname || '/')
  const [search, setSearch] = useState<string>('')
  const [address, setAddress] = useState('Выберите адрес доставки или ресторана')
  const [headerHeight, setHeaderHeight] = useState(88)
  const [navHeight, setNavHeight] = useState(56)
  const [isCompactSticky, setIsCompactSticky] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const navRef = useRef<HTMLElement | null>(null)
  const filteredProductsByCategory = useFilteredProducts(CATEGORIES, PRODUCTS, search)
  const {
    cart,
    cartCount,
    cartTotal,
    isCartOpen,
    addToCart,
    changeQuantity,
    clearCart,
    openCart,
    closeCart,
  } = useCart()
  const { activeCategoryId, scrollToCategory, setSectionRef } =
    useCategoryNavigation(CATEGORIES)

  useEffect(() => {
    const headerElement = headerRef.current
    const navElement = navRef.current

    if (!headerElement || !navElement) return

    const updateStickyHeights = () => {
      setHeaderHeight(headerElement.getBoundingClientRect().height)
      setNavHeight(navElement.getBoundingClientRect().height)
    }

    updateStickyHeights()

    const resizeObserver = new ResizeObserver(updateStickyHeights)
    resizeObserver.observe(headerElement)
    resizeObserver.observe(navElement)
    window.addEventListener('resize', updateStickyHeights)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateStickyHeights)
    }
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname || '/')
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  useEffect(() => {
    if (pathname !== '/') {
      setIsCompactSticky(false)
      return
    }

    const handleScroll = () => {
      setIsCompactSticky(window.scrollY > 180)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const pageStyle = {
    '--header-height': `${headerHeight}px`,
    '--nav-height': `${navHeight}px`,
  } as CSSProperties

  const navigateTo = (nextPath: string) => {
    if (window.location.pathname === nextPath) return

    window.history.pushState({}, '', nextPath)
    setPathname(nextPath)
  }

  const isCatalogPage = pathname === '/'

  return (
    <div
      className={isCatalogPage && isCompactSticky ? 'page compact-sticky' : 'page'}
      style={pageStyle}
    >
      <Header
        ref={headerRef}
        address={address}
        search={search}
        cartCount={cartCount}
        onAddressClick={() => setAddress('Ижевск, улица 10 лет Октября, 57')}
        onHomeClick={() => navigateTo('/')}
        onSearchChange={setSearch}
        onCartClick={openCart}
      />
      {pathname === '/delivery' ? (
        <DeliveryPage onHomeClick={() => navigateTo('/')} />
      ) : pathname === '/about' ? (
        <AboutPage onHomeClick={() => navigateTo('/')} />
      ) : pathname === '/checkout' ? (
        <CheckoutPage
          cart={cart}
          cartTotal={cartTotal}
          onHomeClick={() => navigateTo('/')}
          onChangeQuantity={changeQuantity}
        />
      ) : (
        <>
          <PromoSlider onCatalogClick={() => scrollToCategory('sets')} />
          <CategoryNav
            ref={navRef}
            categories={CATEGORIES}
            activeCategoryId={activeCategoryId}
            cartCount={cartCount}
            isCompact={isCompactSticky}
            onCategoryClick={scrollToCategory}
            onCartClick={openCart}
          />
          <CatalogSections
            categories={CATEGORIES}
            productsByCategory={filteredProductsByCategory}
            onAddToCart={addToCart}
            onSectionRef={setSectionRef}
          />
        </>
      )}
      <Footer
        onHomeClick={() => navigateTo('/')}
        onAboutClick={() => navigateTo('/about')}
        onDeliveryClick={() => navigateTo('/delivery')}
      />
      <CartDrawer
        cart={cart}
        cartTotal={cartTotal}
        isOpen={isCartOpen}
        onClose={closeCart}
        onChangeQuantity={changeQuantity}
        onClearCart={clearCart}
        onCheckoutClick={() => {
          closeCart()
          navigateTo('/checkout')
        }}
        onContinueShoppingClick={() => {
          closeCart()
          navigateTo('/')
        }}
      />
    </div>
  )
}

export default App

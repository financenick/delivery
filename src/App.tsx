import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { CATEGORIES, PRODUCTS } from './entities/catalog/model/data'
import { useCart } from './features/cart/model/useCart'
import { useCategoryNavigation } from './features/catalog/model/useCategoryNavigation'
import { useFilteredProducts } from './features/catalog/model/useFilteredProducts'
import { CartDrawer } from './widgets/cart-drawer/CartDrawer'
import { CatalogSections } from './widgets/catalog-sections/CatalogSections'
import { CategoryNav } from './widgets/category-nav/CategoryNav'
import { Footer } from './widgets/footer/Footer'
import { Header } from './widgets/header/Header'
import { PromoSlider } from './widgets/promo-slider/PromoSlider'

function App() {
  const [search, setSearch] = useState<string>('')
  const [address, setAddress] = useState('Выберите адрес доставки или ресторана')
  const [headerHeight, setHeaderHeight] = useState(88)
  const [navHeight, setNavHeight] = useState(56)
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

  const pageStyle = {
    '--header-height': `${headerHeight}px`,
    '--nav-height': `${navHeight}px`,
  } as CSSProperties

  return (
    <div className="page" style={pageStyle}>
      <Header
        ref={headerRef}
        address={address}
        search={search}
        cartCount={cartCount}
        onAddressClick={() => setAddress('Ижевск, улица 10 лет Октября, 57')}
        onSearchChange={setSearch}
        onCartClick={openCart}
      />
      <PromoSlider onCatalogClick={() => scrollToCategory('sets')} />
      <CategoryNav
        ref={navRef}
        categories={CATEGORIES}
        activeCategoryId={activeCategoryId}
        onCategoryClick={scrollToCategory}
      />
      <CatalogSections
        categories={CATEGORIES}
        productsByCategory={filteredProductsByCategory}
        onAddToCart={addToCart}
        onSectionRef={setSectionRef}
      />
      <Footer />
      <CartDrawer
        cart={cart}
        cartTotal={cartTotal}
        isOpen={isCartOpen}
        onClose={closeCart}
        onChangeQuantity={changeQuantity}
        onClearCart={clearCart}
      />
    </div>
  )
}

export default App

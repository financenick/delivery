import { useState } from 'react'
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

  return (
    <div className="page">
      <Header
        address={address}
        search={search}
        cartCount={cartCount}
        onAddressClick={() => setAddress('Ижевск, улица 10 лет Октября, 57')}
        onSearchChange={setSearch}
        onCartClick={openCart}
      />
      <PromoSlider onCatalogClick={() => scrollToCategory('sets')} />
      <CategoryNav
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

import { useEffect, useMemo, useRef, useState } from 'react'
import './index.css'

type Product = {
  id: string
  name: string
  description?: string
  details?: string
  weight: string
  price: number
  badge?: string
  categoryId: string
}

type Category = {
  id: string
  name: string
}

type CartItem = {
  product: Product
  quantity: number
}

const CATEGORIES: Category[] = [
  { id: 'sets', name: 'Наборы' },
  { id: 'rolls', name: 'Роллы и суши' },
  { id: 'onigiri', name: 'Ёнигири' },
  { id: 'tempura', name: 'Темпура' },
  { id: 'baked', name: 'Запечённые' },
  { id: 'premium', name: 'Премиум' },
  { id: 'hot', name: 'Горячее и салаты' },
  { id: 'drinks', name: 'Напитки и десерты' },
  { id: 'sauces', name: 'Соусы' },
  { id: 'spices', name: 'Специи' },
]

const PRODUCTS: Product[] = [
  // Наборы (подборка, можно расширить)
  {
    id: 'set-himitsu',
    categoryId: 'sets',
    name: 'Химицу',
    weight: '1 220 г',
    price: 1349,
    description: 'Сет роллов с мидиями, крабом, лососем и том ям.',
    details:
      'Мидия сальса запечённая, Краб темпура, Лосось чили-майо темпура, Том ям с креветкой, Лосось чили-майо с кунжутом.',
    badge: 'Лучшая цена без скидок',
  },
  {
    id: 'set-ma-sik',
    categoryId: 'sets',
    name: 'Ма Сик',
    weight: '1 480 г',
    price: 1699,
    description:
      'Большой сет из 6 видов роллов с морепродуктами, рыбой и курицей.',
    details:
      'Калифорния с огурцом, Лава темпура, Спейшл NEW, Запечённая филадельфия с лососем и крабом, Цезарь BIG, Цезарь.',
  },
  {
    id: 'set-hikoki',
    categoryId: 'sets',
    name: 'Хикоки',
    weight: '2 870 г',
    price: 2999,
    description:
      'Огромный сет с крабом, курицей, беконом и лососем для компании.',
    details:
      'Краб сладкий чили, Лава краб спайси, Запечённый с курицей, Тортилья с беконом, Калифорния с огурцом и другие.',
  },
  {
    id: 'set-premium-for-two',
    categoryId: 'sets',
    name: 'Премиум для двоих',
    weight: '575 г',
    price: 2399,
    description: 'Стартовый набор успешного свидания.',
    details: 'Филадельфия "Роял", Нью-Йорк, Сяке, Эби.',
  },
  {
    id: 'set-premium',
    categoryId: 'sets',
    name: 'Премиум',
    weight: '1 045 г',
    price: 2899,
    description: 'Набор роллов с лососем, морепродуктами и икрой.',
    details: 'Филадельфия "Роял", Флорида, Манхэттен, Калифорния эби.',
  },
  // Роллы и суши (подборка)
  {
    id: 'roll-philadelphia-cucumber',
    categoryId: 'rolls',
    name: 'Филадельфия с огурцом',
    weight: '295 г',
    price: 799,
    description: 'Больше лосося — меньше стресса.',
    details: 'Лосось, сыр сливочный, огурец, рис, нори.',
  },
  {
    id: 'roll-california',
    categoryId: 'rolls',
    name: 'Калифорния',
    weight: '215 г',
    price: 369,
    description: 'Классический ролл с крабом и авокадо в тобико.',
    details: 'Рис, нори, майонез, авокадо, снежный краб, тобико.',
  },
  {
    id: 'roll-dragon',
    categoryId: 'rolls',
    name: 'Дракон',
    weight: '215 г',
    price: 669,
    description: 'Ролл с угрём, крабом и авокадо.',
    details: 'Крабовое мясо, угорь, авокадо, тобико, соус унаги.',
  },
  {
    id: 'roll-lava-syake',
    categoryId: 'rolls',
    name: 'Лава сяке',
    weight: '235 г',
    price: 409,
    description: 'Лосось под соусом лава с креветкой.',
    details: 'Лосось, огурец, сыр сливочный, соус лава.',
  },
  {
    id: 'roll-caesar',
    categoryId: 'rolls',
    name: 'Цезарь',
    weight: '210 г',
    price: 249,
    description: 'Ролл по мотивам салата «Цезарь» с курицей.',
  },
  // Ёнигири
  {
    id: 'onigiri-salmon-teriyaki',
    categoryId: 'onigiri',
    name: 'Ёнигири лосось терияки',
    weight: '140 г',
    price: 509,
    description: 'Лосось терияки, сыр и рис.',
  },
  {
    id: 'onigiri-crab',
    categoryId: 'onigiri',
    name: 'Ёнигири с крабом',
    weight: '140 г',
    price: 179,
    description: 'Нежный краб и икра масаго в рисовом треугольнике.',
  },
  // Темпура
  {
    id: 'tempura-philadelphia',
    categoryId: 'tempura',
    name: 'Филадельфия темпура',
    weight: '205 г',
    price: 349,
    description: 'Горячий ролл Филадельфия в хрустящей панировке.',
  },
  {
    id: 'tempura-ebi',
    categoryId: 'tempura',
    name: 'Эби темпура',
    weight: '185 г',
    price: 299,
    description: 'Креветка темпура с сыром и пикантным соусом.',
  },
  // Запечённые
  {
    id: 'baked-salmon-spicy',
    categoryId: 'baked',
    name: 'Запечённый с лососем спайси',
    weight: '235 г',
    price: 369,
    description: 'Запечённый ролл с лососем и соусом спайс.',
  },
  {
    id: 'baked-crab',
    categoryId: 'baked',
    name: 'Запечённый с крабом',
    weight: '245 г',
    price: 279,
    description: 'Запечённый ролл с крабом и сыром гауда.',
  },
  // Премиум (роллы)
  {
    id: 'premium-florida',
    categoryId: 'premium',
    name: 'Флорида',
    weight: '265 г',
    price: 699,
    description: 'Креветка, огурец и икра тобико.',
  },
  {
    id: 'premium-philadelphia-royal',
    categoryId: 'premium',
    name: 'Филадельфия "Роял"',
    weight: '310 г',
    price: 899,
    description: 'Лосось, икра и краб для ужина по‑королевски.',
  },
  // Горячее и салаты
  {
    id: 'hot-poke-salmon',
    categoryId: 'hot',
    name: 'Поке с лососем + 1 соус',
    weight: '260 г',
    price: 585,
    description: 'Поке с лососем, овощами и рисом.',
  },
  {
    id: 'hot-tom-yam',
    categoryId: 'hot',
    name: 'Том Ям',
    weight: '335 г',
    price: 689,
    description: 'Классический суп том ям с креветкой и кокосовым молоком.',
  },
  // Напитки и десерты
  {
    id: 'drink-yobidoyobi-cola',
    categoryId: 'drinks',
    name: 'Сливочная кола Ёбидоёби',
    weight: '330 мл',
    price: 129,
  },
  {
    id: 'dessert-mochi-mango',
    categoryId: 'drinks',
    name: 'Моти манго-маракуйя',
    weight: '40 г',
    price: 275,
  },
  {
    id: 'dessert-cheesecake-ny',
    categoryId: 'drinks',
    name: 'Чизкейк New York',
    weight: '100 г',
    price: 329,
  },
  // Соусы
  {
    id: 'sauce-lava',
    categoryId: 'sauces',
    name: 'Соус Лава',
    weight: '30 г',
    price: 89,
  },
  {
    id: 'sauce-spice',
    categoryId: 'sauces',
    name: 'Соус Спайс',
    weight: '30 г',
    price: 79,
  },
  {
    id: 'sauce-unagi',
    categoryId: 'sauces',
    name: 'Соус Унаги',
    weight: '30 г',
    price: 79,
  },
  // Специи
  {
    id: 'spice-ginger',
    categoryId: 'spices',
    name: 'Имбирь',
    weight: '25 г',
    price: 39,
  },
  {
    id: 'spice-wasabi',
    categoryId: 'spices',
    name: 'Васаби',
    weight: '10 г',
    price: 30,
  },
  {
    id: 'spice-set',
    categoryId: 'spices',
    name: 'Васаби, имбирь, соевый соус',
    weight: '75 г',
    price: 99,
  },
]

function formatPrice(value: number) {
  return value.toLocaleString('ru-RU') + ' ₽'
}

function App() {
  const [search, setSearch] = useState<string>('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [address, setAddress] = useState('Выберите адрес доставки или ресторана')
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    CATEGORIES[0]?.id ?? 'sets',
  )

  const [slideIndex, setSlideIndex] = useState(0)
  const sliderTimerRef = useRef<number | null>(null)

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const filteredProductsByCategory = useMemo(() => {
    const query = search.trim().toLowerCase()
    return CATEGORIES.reduce<Record<string, Product[]>>((acc, category) => {
      const list = PRODUCTS.filter((p) => p.categoryId === category.id).filter((p) => {
        if (!query) return true
        const haystack = (p.name +
          ' ' +
          (p.description ?? '') +
          ' ' +
          (p.details ?? '')).toLowerCase()
        return haystack.includes(query)
      })
      acc[category.id] = list
      return acc
    }, {})
  }, [search])

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  )

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart],
  )

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const handleChangeQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const handleClearCart = () => {
    setCart([])
  }

  const SLIDES = useMemo(
    () => [
      { id: 'slide-1', title: 'Сеты недели', subtitle: 'Большие наборы — для компании' },
      { id: 'slide-2', title: 'Темпура хит', subtitle: 'Горячие роллы с хрустящей корочкой' },
      { id: 'slide-3', title: 'Премиум', subtitle: 'Лосось, морепродукты и икра' },
    ],
    [],
  )

  const goToSlide = (nextIndex: number) => {
    const normalized = ((nextIndex % SLIDES.length) + SLIDES.length) % SLIDES.length
    setSlideIndex(normalized)
  }

  useEffect(() => {
    if (sliderTimerRef.current) window.clearInterval(sliderTimerRef.current)
    sliderTimerRef.current = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SLIDES.length)
    }, 5000)
    return () => {
      if (sliderTimerRef.current) window.clearInterval(sliderTimerRef.current)
      sliderTimerRef.current = null
    }
  }, [SLIDES.length])

  useEffect(() => {
    const elements = CATEGORIES.map((c) => sectionRefs.current[c.id]).filter(
      (el): el is HTMLElement => Boolean(el),
    )
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))
        const top = visible[0]?.target
        if (top?.id) {
          const id = top.id.replace('cat-', '')
          if (id) setActiveCategoryId(id)
        }
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: '-140px 0px -60% 0px',
      },
    )

    for (const el of elements) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scrollToCategory = (categoryId: string) => {
    const el = sectionRefs.current[categoryId]
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="page">
      <header className="header">
        <div className="header-left">
          <div className="logo">Ёбидоёби</div>
          <button
            className="address-button"
            type="button"
            onClick={() =>
              setAddress('Ижевск, улица 10 лет Октября, 57')
            }
          >
            <span className="address-label">Адрес доставки</span>
            <span className="address-value">{address}</span>
          </button>
        </div>
        <div className="header-center">
          <input
            className="search-input"
            placeholder="Искать блюда"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="header-right">
          <div className="header-phone">
            <span className="phone-number">+7 (800) 333-33-23</span>
            <span className="phone-caption">Звонок бесплатный</span>
          </div>
          <button
            className="cart-button"
            type="button"
            onClick={() => setIsCartOpen(true)}
          >
            <span className="cart-label">Корзина</span>
            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </button>
        </div>
      </header>

      <section className="slider" aria-label="Акции">
        <div className="slider-inner">
          <button
            type="button"
            className="slider-arrow"
            aria-label="Предыдущий слайд"
            onClick={() => goToSlide(slideIndex - 1)}
          >
            ‹
          </button>
          <div
            className="slider-track"
            style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          >
            {SLIDES.map((slide) => (
              <div key={slide.id} className="slide">
                <div className="slide-content">
                  <div className="slide-kicker">Скидки и акции</div>
                  <div className="slide-title">{slide.title}</div>
                  <div className="slide-subtitle">{slide.subtitle}</div>
                  <button
                    type="button"
                    className="slide-cta"
                    onClick={() => scrollToCategory('sets')}
                  >
                    Смотреть меню
                  </button>
                </div>
                <div className="slide-image-placeholder" aria-hidden="true">
                  <div className="slide-image-tag">Картинка‑заглушка</div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="slider-arrow"
            aria-label="Следующий слайд"
            onClick={() => goToSlide(slideIndex + 1)}
          >
            ›
          </button>
        </div>
        <div className="slider-dots" role="tablist" aria-label="Переключение слайдов">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={idx === slideIndex ? 'slider-dot active' : 'slider-dot'}
              aria-label={`Слайд ${idx + 1}`}
              aria-current={idx === slideIndex}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
      </section>

      <nav className="nav-categories" aria-label="Категории меню">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            className={
              category.id === activeCategoryId
                ? 'nav-category active'
                : 'nav-category'
            }
            onClick={() => scrollToCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </nav>

      <main className="main">
        <div className="content">
          {CATEGORIES.map((category) => {
            const list = filteredProductsByCategory[category.id] ?? []
            return (
              <section
                key={category.id}
                id={`cat-${category.id}`}
                className="category-section"
                ref={(el) => {
                  sectionRefs.current[category.id] = el
                }}
              >
                <div className="product-section">
                  <div className="section-header">
                    <div className="section-title-block">
                      <h1 className="section-title">{category.name}</h1>
                      {category.id === 'sets' && (
                        <div className="section-subtitle">
                          <span className="badge badge-accent">
                            Лучшая цена без скидок
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="section-results">
                      Найдено <strong>{list.length}</strong> позиций
                    </div>
                  </div>

                  <div className="product-grid">
                    {list.map((product) => (
                      <article key={product.id} className="product-card">
                        <div className="product-image-placeholder" aria-hidden="true">
                          <span>Картинка‑заглушка</span>
                        </div>
                        <div className="product-content">
                          {product.badge && (
                            <div className="product-badge">{product.badge}</div>
                          )}
                          <h2 className="product-name">{product.name}</h2>
                          <div className="product-weight">{product.weight}</div>
                          {product.description && (
                            <p className="product-description">{product.description}</p>
                          )}
                          {product.details && (
                            <p className="product-details">{product.details}</p>
                          )}
                        </div>
                        <div className="product-footer">
                          <div className="product-price">
                            {formatPrice(product.price)}
                          </div>
                          <button
                            type="button"
                            className="add-to-cart-button"
                            onClick={() => handleAddToCart(product)}
                          >
                            В корзину
                          </button>
                        </div>
                      </article>
                    ))}
                    {list.length === 0 && (
                      <div className="empty-state">
                        По вашему запросу ничего не найдено.
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )
          })}
        </div>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-logo">Ёбидоёби</div>
          <div className="footer-contacts">
            <div className="footer-phone-block">
              <span className="phone-number">+7 (800) 333-33-23</span>
              <span className="phone-caption">
                Ежедневно с 10:00 до 23:00
              </span>
            </div>
            <div className="footer-address">
              Удмуртия, Ижевск, улица 10 лет Октября, 57
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-links">
            <button className="link-button" type="button">
              Доставка и оплата
            </button>
            <button className="link-button" type="button">
              О компании
            </button>
            <button className="link-button" type="button">
              Аллергены в наших блюдах
            </button>
          </div>
          <div className="footer-copy">
            Ёбидоёби, 2026. Информация на сайте носит справочный
            характер.
          </div>
        </div>
      </footer>

      <div
        className={
          isCartOpen ? 'cart-overlay open' : 'cart-overlay'
        }
        onClick={() => setIsCartOpen(false)}
      />
      <aside
        className={
          isCartOpen ? 'cart-panel open' : 'cart-panel'
        }
      >
        <div className="cart-header">
          <h2>Корзина</h2>
          <button
            type="button"
            className="icon-button"
            aria-label="Закрыть корзину"
            onClick={() => setIsCartOpen(false)}
          >
            ✕
          </button>
        </div>
        {cart.length === 0 ? (
          <div className="cart-empty">
            Ваша корзина пуста. Добавьте блюда из меню.
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="cart-item"
                >
                  <div className="cart-item-main">
                    <div className="cart-item-title">
                      {item.product.name}
                    </div>
                    <div className="cart-item-meta">
                      {item.product.weight} ·{' '}
                      {formatPrice(item.product.price)}
                    </div>
                  </div>
                  <div className="cart-item-controls">
                    <button
                      type="button"
                      className="qty-button"
                      onClick={() =>
                        handleChangeQuantity(
                          item.product.id,
                          -1,
                        )
                      }
                    >
                      −
                    </button>
                    <span className="qty-value">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="qty-button"
                      onClick={() =>
                        handleChangeQuantity(
                          item.product.id,
                          1,
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="cart-row">
                <span>Итого</span>
                <span className="cart-total">
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <button
                type="button"
                className="primary-button"
              >
                Оформить заказ
              </button>
              <button
                type="button"
                className="link-button secondary"
                onClick={handleClearCart}
              >
                Очистить корзину
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

export default App

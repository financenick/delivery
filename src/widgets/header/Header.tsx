import { forwardRef } from 'react'

type HeaderProps = {
  address: string
  search: string
  cartCount: number
  onAddressClick: () => void
  onHomeClick: () => void
  onSearchChange: (value: string) => void
  onCartClick: () => void
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    {
      address,
      search,
      cartCount,
      onAddressClick,
      onHomeClick,
      onSearchChange,
      onCartClick,
    },
    ref,
  ) => {
    return (
      <header ref={ref} className="header">
        <div className="header-left">
          <button className="logo-button" type="button" onClick={onHomeClick}>
            <div className="logo">Ёбидоёби</div>
          </button>
          <button className="address-button" type="button" onClick={onAddressClick}>
            <span className="address-label">Адрес доставки</span>
            <span className="address-value">{address}</span>
          </button>
        </div>
        <div className="header-center">
          <input
            className="search-input"
            placeholder="Искать блюда"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
        <div className="header-right">
          <div className="header-phone">
            <a className="phone-number" href="tel:+78003333323">
              +7 (800) 333-33-23
            </a>
            <span className="phone-caption">Звонок бесплатный</span>
          </div>
          <button className="cart-button" type="button" onClick={onCartClick}>
            <span className="cart-label">Корзина</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
        </div>
      </header>
    )
  },
)

Header.displayName = 'Header'

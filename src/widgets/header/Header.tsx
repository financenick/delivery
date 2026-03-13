type HeaderProps = {
  address: string
  search: string
  cartCount: number
  onAddressClick: () => void
  onSearchChange: (value: string) => void
  onCartClick: () => void
}

export function Header({
  address,
  search,
  cartCount,
  onAddressClick,
  onSearchChange,
  onCartClick,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">Ёбидоёби</div>
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
          <span className="phone-number">+7 (800) 333-33-23</span>
          <span className="phone-caption">Звонок бесплатный</span>
        </div>
        <button className="cart-button" type="button" onClick={onCartClick}>
          <span className="cart-label">Корзина</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </button>
      </div>
    </header>
  )
}

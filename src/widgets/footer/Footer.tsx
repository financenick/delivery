type FooterProps = {
  onHomeClick: () => void
  onDeliveryClick: () => void
}

export function Footer({ onHomeClick, onDeliveryClick }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-top">
        <button className="footer-logo-button" type="button" onClick={onHomeClick}>
          <div className="footer-logo">Ёбидоёби</div>
        </button>
        <div className="footer-contacts">
          <div className="footer-phone-block">
            <a className="phone-number" href="tel:+78003333323">
              +7 (800) 333-33-23
            </a>
            <span className="phone-caption">Ежедневно с 10:00 до 23:00</span>
          </div>
          <div className="footer-address">
            Удмуртия, Ижевск, улица 10 лет Октября, 57
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-links">
          <button className="link-button" type="button" onClick={onDeliveryClick}>
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
          Ёбидоёби, 2026. Информация на сайте носит справочный характер.
        </div>
      </div>
    </footer>
  )
}

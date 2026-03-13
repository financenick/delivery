export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">Ёбидоёби</div>
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
          Ёбидоёби, 2026. Информация на сайте носит справочный характер.
        </div>
      </div>
    </footer>
  )
}

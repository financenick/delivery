type DeliveryInfoProps = {
  isNested?: boolean
}

export function DeliveryInfo({ isNested = true }: DeliveryInfoProps) {
  return (
    <section
      id="delivery-info"
      className={isNested ? 'delivery-info' : 'delivery-info delivery-info-flat'}
    >
      {isNested && (
        <div className="delivery-info-heading">
          <div className="delivery-info-kicker">Доставка и оплата</div>
          <h2 className="delivery-info-title">Доставка и оплата</h2>
          <p className="delivery-info-lead">
            Здесь собраны все условия доставки, зоны обслуживания и доступные
            способы оплаты, чтобы вы точно знали, как и когда получите свой заказ.
          </p>
        </div>
      )}

      <div className="delivery-info-grid">
        <article className="delivery-card">
          <div className="delivery-card-icon">Д</div>
          <h3 className="delivery-card-title">Бесплатная доставка</h3>
          <p className="delivery-card-text">
            При заказе от 1000 ₽ доставка бесплатно в пределах города.
          </p>
        </article>
        <article className="delivery-card">
          <div className="delivery-card-icon">45</div>
          <h3 className="delivery-card-title">Быстрая доставка</h3>
          <p className="delivery-card-text">
            Среднее время доставки 45-60 минут после подтверждения заказа.
          </p>
        </article>
        <article className="delivery-card">
          <div className="delivery-card-icon">₽</div>
          <h3 className="delivery-card-title">Удобная оплата</h3>
          <p className="delivery-card-text">
            Наличными или картой курьеру при получении заказа.
          </p>
        </article>
        <article className="delivery-card">
          <div className="delivery-card-icon">24</div>
          <h3 className="delivery-card-title">Зона доставки</h3>
          <p className="delivery-card-text">
            Доставляем по всему городу и ближайшим пригородам.
          </p>
        </article>
      </div>

      <div className={isNested ? 'delivery-details' : 'delivery-details delivery-details-flat'}>
        <div className="delivery-details-column">
          <h3 className="delivery-details-title">Условия доставки</h3>
          <ul className="delivery-details-list">
            <li>Минимальная сумма заказа: 500 ₽</li>
            <li>Бесплатная доставка при заказе от 1000 ₽</li>
            <li>Стоимость доставки при заказе до 1000 ₽: 150 ₽</li>
            <li>Время работы доставки: 10:00 - 22:30</li>
          </ul>
        </div>
        <div className="delivery-details-column">
          <h3 className="delivery-details-title">Способы оплаты</h3>
          <ul className="delivery-details-list">
            <li>Наличными курьеру при получении</li>
            <li>Банковской картой курьеру: Visa, Mastercard, МИР</li>
            <li>Сдача с любой суммы</li>
          </ul>
        </div>
      </div>
    </section>
  )
}

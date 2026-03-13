type AboutPageProps = {
  onHomeClick: () => void
}

export function AboutPage({ onHomeClick }: AboutPageProps) {
  return (
    <main className="page-section">
      <section className="page-hero about-page">
        <div className="page-breadcrumbs">
          <button className="link-button" type="button" onClick={onHomeClick}>
            Главная
          </button>
          <span>/</span>
          <span className="page-breadcrumb-current">О нас</span>
        </div>
        <h1 className="page-title">О нас</h1>
        <div className="about-copy">
          <p>
            Мы делаем сервис доставки суши и роллов, в котором главное - понятное
            меню, аккуратная подача и быстрый путь от выбора блюда до оформления
            заказа.
          </p>
          <p>
            Для нас важны свежие ингредиенты, предсказуемое качество и удобный
            пользовательский опыт без лишней перегрузки интерфейса.
          </p>
          <p>
            Если у вас есть вопросы или предложения по сотрудничеству, напишите нам:
            <a className="about-link" href="mailto:hello@sushi-delivery.example">
              {' '}
              hello@sushi-delivery.example
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}

import { DeliveryInfo } from '../delivery-info/DeliveryInfo'

type DeliveryPageProps = {
  onHomeClick: () => void
}

export function DeliveryPage({ onHomeClick }: DeliveryPageProps) {
  return (
    <main className="page-section">
      <section className="page-hero">
        <div className="page-breadcrumbs">
          <button className="link-button" type="button" onClick={onHomeClick}>
            Главная
          </button>
          <span>/</span>
          <span className="page-breadcrumb-current">Доставка и оплата</span>
        </div>
        <h1 className="page-title">Доставка и оплата</h1>
        <DeliveryInfo isNested={false} />
      </section>
    </main>
  )
}

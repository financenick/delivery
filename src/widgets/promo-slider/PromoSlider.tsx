import { useEffect, useMemo, useRef, useState } from 'react'

type PromoSliderProps = {
  onCatalogClick: () => void
}

export function PromoSlider({ onCatalogClick }: PromoSliderProps) {
  const slides = useMemo(
    () => [
      {
        id: 'slide-1',
        title: 'Сеты недели',
        subtitle: 'Большие наборы - для компании',
      },
      {
        id: 'slide-2',
        title: 'Темпура хит',
        subtitle: 'Горячие роллы с хрустящей корочкой',
      },
      {
        id: 'slide-3',
        title: 'Премиум',
        subtitle: 'Лосось, морепродукты и икра',
      },
    ],
    [],
  )

  const [slideIndex, setSlideIndex] = useState(0)
  const sliderTimerRef = useRef<number | null>(null)

  const goToSlide = (nextIndex: number) => {
    const normalized = ((nextIndex % slides.length) + slides.length) % slides.length
    setSlideIndex(normalized)
  }

  useEffect(() => {
    if (sliderTimerRef.current) {
      window.clearInterval(sliderTimerRef.current)
    }

    sliderTimerRef.current = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => {
      if (sliderTimerRef.current) {
        window.clearInterval(sliderTimerRef.current)
      }
      sliderTimerRef.current = null
    }
  }, [slides.length])

  return (
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
          {slides.map((slide) => (
            <div key={slide.id} className="slide">
              <div className="slide-content">
                <div className="slide-kicker">Скидки и акции</div>
                <div className="slide-title">{slide.title}</div>
                <div className="slide-subtitle">{slide.subtitle}</div>
                <button
                  type="button"
                  className="slide-cta"
                  onClick={onCatalogClick}
                >
                  Смотреть меню
                </button>
              </div>
              <div className="slide-image-placeholder" aria-hidden="true">
                <div className="slide-image-tag">Картинка-заглушка</div>
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
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            className={index === slideIndex ? 'slider-dot active' : 'slider-dot'}
            aria-label={`Слайд ${index + 1}`}
            aria-current={index === slideIndex}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}

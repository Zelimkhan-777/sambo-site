import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

function HeroSlider({ slides, children }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const activeSlide = slides[activeIndex]

  useEffect(() => {
    if (isPaused || shouldReduceMotion || slides.length < 2) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length)
    }, 6500)

    return () => window.clearInterval(timer)
  }, [isPaused, shouldReduceMotion, slides.length])

  if (!activeSlide) return null

  return (
    <div
      className="relative min-h-[540px] overflow-hidden border border-[color:var(--border)] bg-[color:var(--background)]"
      aria-label="Фотографии спортсменов Федерации самбо Чеченской Республики"
      aria-roledescription="карусель"
      role="region"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
      }}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={activeSlide.id}
          alt={activeSlide.alt}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority={activeIndex === 0 ? 'high' : undefined}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.7, ease: 'easeOut' }}
          decoding="async"
          sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) calc(100vw - 48px), 1216px"
          src={activeSlide.src}
          srcSet={activeSlide.srcSet}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/10" />
      <div className="relative flex min-h-[540px] flex-col justify-between p-6 text-white sm:p-10 lg:p-14">
        <div className="text-[11px] uppercase tracking-[0.2em] text-white/75">
          <span>Федерация самбо Чеченской Республики</span>
        </div>

        {children}

        <p className="max-w-md pt-8 text-xs uppercase tracking-[0.16em] text-white/70">
          {activeSlide.caption}
        </p>

        <div className="absolute bottom-5 left-6 flex gap-2 sm:left-10 lg:left-14" role="tablist" aria-label="Выбор фотографии">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`h-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${index === activeIndex ? 'w-10 bg-white' : 'w-5 bg-white/45 hover:bg-white/75'}`}
              aria-label={`Фотография ${index + 1}`}
              aria-selected={index === activeIndex}
              role="tab"
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroSlider

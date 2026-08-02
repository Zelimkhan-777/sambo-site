import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function LazyVideoPreview({ src }) {
  const containerRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const element = containerRef.current

    if (!element || !('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="aspect-video shrink-0 bg-neutral-950">
      {shouldLoad && (
        <video
          aria-hidden="true"
          className="pointer-events-none h-full w-full object-cover"
          muted
          playsInline
          preload="metadata"
          src={`${src}#t=0.001`}
          tabIndex={-1}
        />
      )}
    </div>
  )
}

function MediaCard({ item }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      className="group h-full border border-[color:var(--border)] bg-[color:var(--surface)] transition-colors duration-200 hover:border-[color:var(--border-strong)]"
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Link
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
        to={`/media/${item.slug}`}
      >
        {item.videoUrl ? (
          <LazyVideoPreview src={item.videoUrl} />
        ) : (
          <div className="flex aspect-video shrink-0 items-center justify-center border-b border-[color:var(--border)] bg-[color:var(--surface-strong)] px-5 text-center text-sm text-[color:var(--muted-foreground)]">
            Видео не опубликовано
          </div>
        )}

        <div className="flex min-h-20 flex-1 items-center p-4">
          <h2 className="line-clamp-2 text-lg font-semibold leading-6 tracking-[-0.025em] text-[color:var(--foreground)] transition-colors group-hover:text-[color:var(--accent-blue)]">
            {item.title}
          </h2>
        </div>
      </Link>
    </motion.article>
  )
}

export default MediaCard

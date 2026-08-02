import { motion, useReducedMotion } from 'framer-motion'
import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'

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
          <div className="flex aspect-video shrink-0 items-center justify-center border-b border-[color:var(--border)] bg-neutral-950 text-white">
            <span className="flex size-12 items-center justify-center rounded-full border border-white/30 bg-white/10 transition-colors group-hover:bg-white/20">
              <Play aria-hidden="true" className="ml-0.5 size-5" fill="currentColor" />
            </span>
            <span className="sr-only">Открыть видео</span>
          </div>
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

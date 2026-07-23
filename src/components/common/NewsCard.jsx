import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { formatNewsDate } from '../../utils/news'
import MediaPlaceholder from './MediaPlaceholder'

function NewsCard({ item }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.article
      className="group flex h-full flex-col border border-[color:var(--border)] bg-[color:var(--surface)] transition-colors duration-200 ease-out hover:border-[color:var(--border-strong)]"
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <Link
        to={`/news/${item.slug}`}
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
      >
        {item.coverImage ? (
          <div className="relative aspect-[16/10] border-b border-[color:var(--border)] bg-[color:var(--surface-strong)]">
            <img
              alt={item.imageAlt || item.title}
              className="h-full w-full object-cover"
              loading="lazy"
              src={item.coverImage}
            />
            {item.isTemporary ? (
              <span className="absolute left-3 top-3 border border-white/50 bg-black/60 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-white">
                Иллюстративное фото
              </span>
            ) : null}
          </div>
        ) : (
          <MediaPlaceholder
            className="aspect-[16/10] border-0 border-b"
            compact
            label={item.isTemporary ? 'Иллюстративное фото' : 'Фотография готовится к публикации'}
          />
        )}

        <div className="flex flex-1 flex-col px-5 py-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
            <span>{item.category}</span>
            <span className="h-1 w-1 rounded-full bg-[color:var(--border-strong)]" />
            <time dateTime={item.publishedAt}>{formatNewsDate(item.publishedAt)}</time>
          </div>

          <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)] transition-colors duration-200 group-hover:text-[color:var(--accent-blue)]">
            {item.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-7 text-[color:var(--muted-foreground)]">
            {item.shortDescription}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--foreground)]">
            <span>Открыть материал</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

export default NewsCard

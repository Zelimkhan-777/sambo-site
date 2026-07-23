import { Link } from 'react-router-dom'

function NewsCard({ item }) {
  return (
    <article className="group flex h-full flex-col border border-[color:var(--border)] bg-[color:var(--surface)] transition-colors duration-200 ease-out hover:border-[color:var(--border-strong)]">
      <Link
        to={`/news/${item.slug}`}
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
      >
        <div className="aspect-[16/10] border-b border-[color:var(--border)] bg-[color:var(--surface-strong)] p-5">
          <div className="flex h-full flex-col justify-between">
            <span className="inline-flex w-fit border border-[color:var(--border-strong)] px-2 py-1 text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
              {item.isTemporary ? 'Временный материал' : 'Материал'}
            </span>
            <div className="max-w-[12rem]">
              <div className="h-px w-12 bg-[color:var(--accent-red)]" />
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted-foreground)]">
                Изображение будет добавлено после проверки и подготовки материалов.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-5 py-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
            <span>{item.category}</span>
            <span className="h-1 w-1 rounded-full bg-[color:var(--border-strong)]" />
            <time dateTime={item.date}>{item.date}</time>
          </div>

          <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)] transition-colors duration-200 group-hover:text-[color:var(--accent-blue)]">
            {item.title}
          </h3>

          <p className="mt-3 flex-1 text-sm leading-7 text-[color:var(--muted-foreground)]">
            {item.excerpt}
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--foreground)]">
            <span>Открыть материал</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default NewsCard

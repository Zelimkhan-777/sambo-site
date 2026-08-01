import { ChevronLeft, ChevronRight } from 'lucide-react'

function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages = [1]

  if (currentPage > 3) pages.push('start-ellipsis')

  const rangeStart = Math.max(2, currentPage - 1)
  const rangeEnd = Math.min(totalPages - 1, currentPage + 1)

  for (let page = rangeStart; page <= rangeEnd; page += 1) {
    pages.push(page)
  }

  if (currentPage < totalPages - 2) pages.push('end-ellipsis')
  pages.push(totalPages)

  return pages
}

function Pagination({ ariaLabel, currentPage, onPageChange, totalPages }) {
  if (totalPages <= 1) return null

  return (
    <nav
      aria-label={ariaLabel}
      className="mt-10 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        aria-label="Предыдущая страница"
        className="inline-flex h-11 min-w-11 items-center justify-center border border-[color:var(--border-strong)] px-3 text-[color:var(--foreground)] transition-colors hover:bg-[color:var(--surface)] disabled:cursor-not-allowed disabled:opacity-40"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft aria-hidden="true" size={18} />
      </button>

      {getVisiblePages(currentPage, totalPages).map((page) =>
        typeof page === 'number' ? (
          <button
            key={page}
            type="button"
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Страница ${page}`}
            className={[
              'inline-flex h-11 min-w-11 items-center justify-center border px-3 text-sm font-medium transition-colors',
              page === currentPage
                ? 'border-[color:var(--foreground)] bg-[color:var(--foreground)] text-[color:var(--background)]'
                : 'border-[color:var(--border-strong)] text-[color:var(--foreground)] hover:bg-[color:var(--surface)]',
            ].join(' ')}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span
            key={page}
            aria-hidden="true"
            className="inline-flex h-11 min-w-8 items-center justify-center text-[color:var(--muted-foreground)]"
          >
            …
          </span>
        ),
      )}

      <button
        type="button"
        aria-label="Следующая страница"
        className="inline-flex h-11 min-w-11 items-center justify-center border border-[color:var(--border-strong)] px-3 text-[color:var(--foreground)] transition-colors hover:bg-[color:var(--surface)] disabled:cursor-not-allowed disabled:opacity-40"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight aria-hidden="true" size={18} />
      </button>
    </nav>
  )
}

export default Pagination

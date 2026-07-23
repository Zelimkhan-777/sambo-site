import { Link } from 'react-router-dom'

function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Хлебные крошки">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[color:var(--muted-foreground)]">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {isCurrent || !item.to ? (
                <span aria-current={isCurrent ? 'page' : undefined}>{item.label}</span>
              ) : (
                <Link
                  className="transition-colors hover:text-[color:var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)]"
                  to={item.to}
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumbs

import { Link } from 'react-router-dom'
import { navigationItems } from './navigation'
import Container from '../ui/Container'

function Footer({ className = '' }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contacts" className={`mt-auto border-t border-[color:var(--border)] bg-[color:var(--surface)] ${className}`}>
      <Container className="py-7 sm:py-8">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-8">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
              Федерация самбо
            </p>
            <h2 className="max-w-xl text-lg font-semibold leading-snug tracking-[-0.03em] text-[color:var(--foreground)]">
              Региональная физкультурно-спортивная общественная организация
              «Федерация самбо Чеченской Республики»
            </h2>
            <p className="max-w-xl text-xs leading-6 text-[color:var(--muted-foreground)]">
              Материалы сайта подготовлены на основании информации из открытых и
              официальных источников.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--foreground)]">
              Разделы
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-[color:var(--muted-foreground)]">
              {navigationItems.map((item) => (
                <li key={item.to}>
                  {item.isAnchor ? (
                    <a href={item.to} className="transition-colors duration-200 hover:text-[color:var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface)]">
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.to}
                      className="transition-colors duration-200 hover:text-[color:var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface)]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 text-sm leading-6 text-[color:var(--muted-foreground)]">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--foreground)]">
              Контакты
            </h2>
            <p>364051, г. Грозный, ул. Мира, 53 «А».</p>
            <p>
              <a
                href="tel:+79637037550"
                className="transition-colors duration-200 hover:text-[color:var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface)]"
              >
                +7 963 703-75-50
              </a>
            </p>
            <p>
              <a
                href="mailto:Sambo-chechen@mail.ru"
                className="transition-colors duration-200 hover:text-[color:var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface)]"
              >
                Sambo-chechen@mail.ru
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-[color:var(--border)] pt-3 text-xs text-[color:var(--muted-foreground)]">
          {currentYear}
        </div>
      </Container>
    </footer>
  )
}

export default Footer

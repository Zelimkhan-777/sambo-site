import { Link } from 'react-router-dom'
import { navigationItems } from './navigation'
import Container from '../ui/Container'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--surface)]">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.8fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
              Федерация самбо
            </p>
            <h2 className="max-w-xl text-xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
              Региональная физкультурно-спортивная общественная организация
              «Федерация самбо Чеченской Республики»
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[color:var(--muted-foreground)]">
              Материалы сайта подготовлены на основании информации из открытых и
              официальных источников.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--foreground)]">
              Разделы
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-[color:var(--muted-foreground)]">
              {navigationItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="transition-colors duration-200 hover:text-[color:var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 text-sm leading-7 text-[color:var(--muted-foreground)]">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--foreground)]">
              Контакты и источники
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
            <div className="flex flex-wrap gap-4 text-sm">
              <a
                href="https://www.sambo.ru/federation/regions/8/75/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-200 hover:text-[color:var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface)]"
              >
                Всероссийская федерация самбо
              </a>
              <a
                href="http://www.fsk-shali.ru/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-200 hover:text-[color:var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface)]"
              >
                ФСК «Шали»
              </a>
              <a
                href="https://www.instagram.com/fsk_shali/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-200 hover:text-[color:var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface)]"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[color:var(--border)] pt-4 text-sm text-[color:var(--muted-foreground)]">
          {currentYear}
        </div>
      </Container>
    </footer>
  )
}

export default Footer

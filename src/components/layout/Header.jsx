import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import { navigationItems } from './navigation'
import Button from '../ui/Button'
import Container from '../ui/Container'
import ThemeToggle from '../ui/ThemeToggle'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuButtonRef = useRef(null)

  const closeMobileMenu = (shouldReturnFocus = true) => {
    setIsMobileMenuOpen(false)

    if (shouldReturnFocus) {
      requestAnimationFrame(() => {
        mobileMenuButtonRef.current?.focus()
      })
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:rgb(from_var(--background)_r_g_b_/_0.94)] backdrop-blur-sm">
        <Container className="py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-sm font-semibold tracking-[0.2em] text-[color:var(--foreground)]">
                СБ
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
                  Федерация самбо
                </p>
                <p className="truncate text-sm font-semibold tracking-[-0.02em] text-[color:var(--foreground)] sm:text-base">
                  Чеченской Республики
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <nav aria-label="Основная навигация">
                <ul className="flex flex-wrap items-center gap-2 text-sm">
                  {navigationItems.map(({ to, label, end }) => (
                    <li key={to}>
                      <NavLink
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                          [
                            'inline-flex min-h-11 items-center border px-4 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]',
                            isActive
                              ? 'border-[color:var(--foreground)] bg-[color:var(--foreground)] text-[color:var(--background)]'
                              : 'border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--foreground)] hover:border-[color:var(--border-strong)] hover:bg-[color:var(--surface-strong)]',
                          ].join(' ')
                        }
                      >
                        {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <ThemeToggle />
              <Button href="mailto:Sambo-chechen@mail.ru" variant="secondary">
                Контакты
              </Button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                ref={mobileMenuButtonRef}
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[color:var(--foreground)] transition-colors duration-200 ease-out hover:bg-[color:var(--surface-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
                aria-label="Открыть меню"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  ≡
                </span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      <div id="mobile-menu">
        <MobileMenu
          navigationItems={navigationItems}
          onClose={closeMobileMenu}
          open={isMobileMenuOpen}
          triggerRef={mobileMenuButtonRef}
        />
      </div>
    </>
  )
}

export default Header

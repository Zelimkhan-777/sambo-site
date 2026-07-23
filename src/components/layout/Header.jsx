import { Menu } from 'lucide-react'
import { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import { navigationItems } from './navigation'
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
      <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:var(--background)]">
        <Container className="py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0 flex items-center gap-3">
              <div className="flex h-11 w-14 shrink-0 items-center justify-center gap-1 border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-sm font-semibold tracking-[0.16em] text-[color:var(--foreground)]">
                <span aria-hidden="true" className="h-6 w-1 bg-[color:var(--accent-red)]" />
                <span aria-hidden="true" className="h-6 w-1 bg-[color:var(--accent-blue)]" />
                <span>СБ</span>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
                  Федерация самбо
                </p>
                <p className="max-w-[13rem] text-sm font-semibold leading-tight tracking-[-0.02em] text-[color:var(--foreground)] sm:max-w-none sm:text-base">
                  Чеченской Республики
                </p>
              </div>
            </div>

            <div className="hidden items-center gap-3 lg:flex">
              <nav aria-label="Основная навигация">
                <ul className="flex flex-wrap items-center gap-2 text-sm">
                  {navigationItems.map(({ to, label, end, isAnchor }) => (
                    <li key={to}>
                      {isAnchor ? (
                        <a
                          href={to}
                          className="inline-flex min-h-11 items-center border-b-2 border-transparent px-3 text-[color:var(--muted-foreground)] transition-colors duration-200 ease-out hover:border-b-[color:var(--border-strong)] hover:text-[color:var(--foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
                        >
                          {label}
                        </a>
                      ) : (
                        <NavLink
                          to={to}
                          end={end}
                          className={({ isActive }) =>
                            [
                              'inline-flex min-h-11 items-center border-b-2 border-transparent px-3 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]',
                              isActive
                                ? 'border-b-[color:var(--accent-red)] text-[color:var(--foreground)]'
                                : 'text-[color:var(--muted-foreground)] hover:border-b-[color:var(--border-strong)] hover:text-[color:var(--foreground)]',
                            ].join(' ')
                          }
                        >
                          {label}
                        </NavLink>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="ml-5 flex items-center gap-3 border-l border-[color:var(--border)] pl-5">
                <ThemeToggle />
              </div>
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
                <Menu aria-hidden="true" size={20} strokeWidth={1.7} />
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

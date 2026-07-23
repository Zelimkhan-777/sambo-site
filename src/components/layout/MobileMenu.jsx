import { useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Button from '../ui/Button'
import Container from '../ui/Container'
import ThemeToggle from '../ui/ThemeToggle'

function MobileMenu({ navigationItems, onClose, open, triggerRef }) {
  const closeButtonRef = useRef(null)
  const wasOpenRef = useRef(false)
  const { pathname } = useLocation()

  useEffect(() => {
    if (!open) {
      if (wasOpenRef.current) {
        document.body.style.overflow = ''
        triggerRef?.current?.focus()
      }

      wasOpenRef.current = false
      return undefined
    }

    wasOpenRef.current = true
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, open, triggerRef])

  useEffect(() => {
    if (open) {
      onClose(false)
    }
  }, [open, pathname, onClose])

  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-[color:rgb(10_10_10_/_0.55)] md:hidden motion-safe:transition-opacity motion-safe:duration-200"
      onClick={() => onClose()}
    >
      <div
        className="ml-auto flex h-full w-full max-w-sm flex-col border-l border-[color:var(--border)] bg-[color:var(--background)]"
        role="dialog"
        aria-modal="true"
        aria-label="Мобильное меню"
        onClick={(event) => event.stopPropagation()}
      >
        <Container className="flex h-full flex-col px-5 py-5">
          <div className="flex items-start justify-between gap-4 border-b border-[color:var(--border)] pb-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                Навигация
              </p>
              <p className="max-w-[12rem] text-sm leading-6 text-[color:var(--foreground)]">
                Федерация самбо Чеченской Республики
              </p>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => onClose()}
              className="inline-flex h-11 w-11 items-center justify-center border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[color:var(--foreground)] transition-colors duration-200 ease-out hover:bg-[color:var(--surface-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
              aria-label="Закрыть меню"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                ×
              </span>
            </button>
          </div>

          <nav className="flex-1 py-6" aria-label="Мобильная навигация">
            <ul className="space-y-2">
              {navigationItems.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      [
                        'flex min-h-12 items-center border px-4 text-base transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]',
                        isActive
                          ? 'border-[color:var(--foreground)] bg-[color:var(--foreground)] text-[color:var(--background)]'
                          : 'border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--foreground)]',
                      ].join(' ')
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4 border-t border-[color:var(--border)] pt-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-[color:var(--muted-foreground)]">
                Тема интерфейса
              </span>
              <ThemeToggle />
            </div>

            <Button href="mailto:Sambo-chechen@mail.ru" variant="secondary">
              Контакты
            </Button>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default MobileMenu

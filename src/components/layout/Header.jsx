import { NavLink } from 'react-router-dom'

const navigationItems = [
  { to: '/', label: 'Главная', end: true },
  { to: '/about', label: 'О Федерации' },
  { to: '/documents', label: 'Документы' },
  { to: '/grants', label: 'Гранты' },
  { to: '/news', label: 'Новости' },
  { to: '/coaches', label: 'Тренеры' },
]

function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-neutral-500">
            Федерация самбо
          </p>
          <div>
            <span className="block text-lg font-semibold tracking-tight text-neutral-950">
              Чеченской Республики
            </span>
          </div>
        </div>

        <nav aria-label="Основная навигация">
          <ul className="flex flex-wrap gap-2 text-sm">
            {navigationItems.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    [
                      'inline-flex min-h-10 items-center border px-3 py-2 transition-colors',
                      isActive
                        ? 'border-neutral-950 bg-neutral-950 text-white'
                        : 'border-neutral-300 text-neutral-700 hover:border-neutral-950 hover:text-neutral-950',
                    ].join(' ')
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

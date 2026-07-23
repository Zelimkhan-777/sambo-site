import { Moon, Sun } from 'lucide-react'
import useTheme from '../../hooks/useTheme'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[color:var(--foreground)] transition-colors duration-200 ease-out hover:border-[color:var(--accent-red)] hover:bg-[color:var(--surface-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]"
      aria-label={
        theme === 'dark'
          ? 'Переключить на светлую тему'
          : 'Переключить на тёмную тему'
      }
      title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
      aria-pressed={theme === 'dark'}
    >
      {theme === 'dark' ? <Sun aria-hidden="true" size={19} strokeWidth={1.7} /> : <Moon aria-hidden="true" size={19} strokeWidth={1.7} />}
    </button>
  )
}

export default ThemeToggle

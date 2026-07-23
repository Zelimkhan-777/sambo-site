import { createContext, useEffect, useMemo, useState } from 'react'

const THEME_STORAGE_KEY = 'sambo-theme'
const ThemeContext = createContext(null)

function getPreferredTheme() {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyTheme(theme) {
  const rootElement = document.documentElement

  rootElement.dataset.theme = theme
  rootElement.classList.toggle('dark', theme === 'dark')
  rootElement.style.colorScheme = theme
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') {
      return 'light'
    }

    return document.documentElement.dataset.theme || getPreferredTheme()
  })

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () =>
        setTheme((currentTheme) =>
          currentTheme === 'dark' ? 'light' : 'dark',
        ),
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export { THEME_STORAGE_KEY, ThemeContext }

import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import ScrollToTop from './ScrollToTop'
import RouteSeo from './RouteSeo'

function Layout() {
  return (
    <>
      <ScrollToTop />
      <RouteSeo />
      <div className="flex min-h-screen min-h-dvh flex-col bg-[color:var(--background)] text-[color:var(--foreground)] transition-colors duration-200 ease-out motion-reduce:transition-none">
        <Header />
        <main className="flex-1 py-8 sm:py-10">
          <Suspense
            fallback={(
              <div
                className="mx-auto w-full max-w-7xl px-4 py-12 text-sm text-[color:var(--muted-foreground)] sm:px-6"
                role="status"
              >
                Загрузка страницы...
              </div>
            )}
          >
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout

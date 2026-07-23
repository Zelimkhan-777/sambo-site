import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import ScrollToTop from './ScrollToTop'

function Layout() {
  return (
    <>
      <ScrollToTop />
      <div className="flex min-h-screen min-h-dvh flex-col bg-[color:var(--background)] text-[color:var(--foreground)] transition-colors duration-200 ease-out motion-reduce:transition-none">
        <Header />
        <main className="flex-1 py-8 sm:py-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout

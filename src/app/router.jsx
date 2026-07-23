import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import AboutPage from '../pages/AboutPage'
import CoachesPage from '../pages/CoachesPage'
import DocumentsPage from '../pages/DocumentsPage'
import GrantsPage from '../pages/GrantsPage'
import HomePage from '../pages/HomePage'
import NewsDetailsPage from '../pages/NewsDetailsPage'
import NewsPage from '../pages/NewsPage'
import NotFoundPage from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'documents', element: <DocumentsPage /> },
      { path: 'grants', element: <GrantsPage /> },
      { path: 'news', element: <NewsPage /> },
      { path: 'news/:slug', element: <NewsDetailsPage /> },
      { path: 'coaches', element: <CoachesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

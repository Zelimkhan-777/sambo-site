import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import {
  AboutPage,
  CoachesPage,
  DocumentsPage,
  GrantsPage,
  HomePage,
  MediaDetailsPage,
  MediaPage,
  NewsDetailsPage,
  NewsPage,
  NotFoundPage,
} from './lazyPages'

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
      { path: 'media', element: <MediaPage /> },
      { path: 'media/:slug', element: <MediaDetailsPage /> },
      { path: 'coaches', element: <CoachesPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getNewsPage } from '../api/newsApi'
import EmptyState from '../components/common/EmptyState'
import NewsCard from '../components/common/NewsCard'
import Pagination from '../components/common/Pagination'
import Section from '../components/common/Section'
import SectionHeading from '../components/common/SectionHeading'

const PAGE_SIZE = 6

function NewsPage() {
  const shouldReduceMotion = useReducedMotion()
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = Number.parseInt(searchParams.get('page') || '1', 10)
  const currentPage = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1
  const [result, setResult] = useState({
    page: 1,
    news: [],
    status: 'loading',
    total: 0,
  })

  const status = result.page === currentPage ? result.status : 'loading'
  const news = status === 'success' ? result.news : []
  const totalPages = Math.max(1, Math.ceil(result.total / PAGE_SIZE))

  useEffect(() => {
    const controller = new AbortController()

    async function loadNews() {
      try {
        const response = await getNewsPage({
          page: currentPage,
          limit: PAGE_SIZE,
          signal: controller.signal,
        })
        const availablePages = Math.max(1, Math.ceil(response.total / PAGE_SIZE))

        if (currentPage > availablePages) {
          setSearchParams(
            availablePages === 1 ? {} : { page: String(availablePages) },
            { replace: true },
          )
          return
        }

        setResult({
          page: currentPage,
          news: response.items,
          status: 'success',
          total: response.total,
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setResult({ page: currentPage, news: [], status: 'error', total: 0 })
        }
      }
    }

    loadNews()
    return () => controller.abort()
  }, [currentPage, setSearchParams])

  function handlePageChange(page) {
    if (page === currentPage) return
    setSearchParams(page === 1 ? {} : { page: String(page) })
  }

  return (
    <Section className="pt-2 sm:pt-4">
      <SectionHeading
        as="h1"
        eyebrow="Новости федерации"
        title="Новости"
        description="Публикации, официальные материалы и обновления раздела. Новые записи добавляются из единого источника данных после проверки содержания."
      />

      {status === 'loading' ? (
        <EmptyState
          className="mt-8"
          title="Загружаем новости"
          description="Материалы появятся через несколько секунд."
        />
      ) : null}

      {status === 'error' ? (
        <EmptyState
          className="mt-8"
          title="Новости временно недоступны"
          description="Не удалось получить материалы из системы публикации. Попробуйте обновить страницу позже."
        />
      ) : null}

      {status === 'success' && news.length ? (
        <motion.div
          key={currentPage}
          className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </motion.div>
      ) : null}

      {status === 'success' && !news.length ? (
        <EmptyState
          className="mt-8"
          title="Новостей пока нет"
          description="Подтверждённые материалы появятся здесь после подготовки к публикации."
        />
      ) : null}

      {status === 'success' && news.length ? (
        <Pagination
          ariaLabel="Навигация по страницам новостей"
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      ) : null}
    </Section>
  )
}

export default NewsPage

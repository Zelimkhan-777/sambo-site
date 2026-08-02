import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getMediaPage } from '../api/mediaApi'
import EmptyState from '../components/common/EmptyState'
import { CardGridSkeleton } from '../components/common/LoadingSkeleton'
import MediaCard from '../components/common/MediaCard'
import Pagination from '../components/common/Pagination'
import Section from '../components/common/Section'
import SectionHeading from '../components/common/SectionHeading'

const PAGE_SIZE = 6

function MediaPage() {
  const shouldReduceMotion = useReducedMotion()
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = Number.parseInt(searchParams.get('page') || '1', 10)
  const currentPage = Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1
  const [result, setResult] = useState({
    page: 1,
    media: [],
    status: 'loading',
    total: 0,
  })

  const status = result.page === currentPage ? result.status : 'loading'
  const media = status === 'success' ? result.media : []
  const totalPages = Math.max(1, Math.ceil(result.total / PAGE_SIZE))

  useEffect(() => {
    const controller = new AbortController()

    async function loadMedia() {
      try {
        const response = await getMediaPage({
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
          media: response.items,
          status: 'success',
          total: response.total,
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setResult({ page: currentPage, media: [], status: 'error', total: 0 })
        }
      }
    }

    loadMedia()
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
        eyebrow="Видео Федерации"
        title="Медиа"
        description="Видеоматериалы о тренировках, соревнованиях и работе Федерации."
      />

      {status === 'loading' ? (
        <CardGridSkeleton className="mt-8" count={6} />
      ) : null}

      {status === 'error' ? (
        <EmptyState
          className="mt-8"
          title="Медиа временно недоступны"
          description="Не удалось загрузить видеоматериалы. Попробуйте обновить страницу позже."
        />
      ) : null}

      {status === 'success' && media.length ? (
        <motion.div
          key={currentPage}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {media.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </motion.div>
      ) : null}

      {status === 'success' && !media.length ? (
        <EmptyState
          className="mt-8"
          title="Видеоматериалы пока не опубликованы"
          description="Новые видео появятся здесь после публикации."
        />
      ) : null}

      {status === 'success' && media.length ? (
        <Pagination
          ariaLabel="Навигация по страницам видеоматериалов"
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalPages={totalPages}
        />
      ) : null}
    </Section>
  )
}

export default MediaPage

import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { getNews } from '../api/newsApi'
import EmptyState from '../components/common/EmptyState'
import NewsCard from '../components/common/NewsCard'
import Section from '../components/common/Section'
import SectionHeading from '../components/common/SectionHeading'

function NewsPage() {
  const shouldReduceMotion = useReducedMotion()
  const [news, setNews] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function loadNews() {
      try {
        const items = await getNews({ signal: controller.signal })
        setNews(items)
        setStatus('success')
      } catch (error) {
        if (error.name !== 'AbortError') setStatus('error')
      }
    }

    loadNews()
    return () => controller.abort()
  }, [])

  return (
    <Section className="pt-2 sm:pt-4">
      <SectionHeading
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
    </Section>
  )
}

export default NewsPage

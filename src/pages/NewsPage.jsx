import { motion, useReducedMotion } from 'framer-motion'
import EmptyState from '../components/common/EmptyState'
import NewsCard from '../components/common/NewsCard'
import Section from '../components/common/Section'
import SectionHeading from '../components/common/SectionHeading'
import { news } from '../data/news'
import { sortNewsByDate } from '../utils/news'

function NewsPage() {
  const shouldReduceMotion = useReducedMotion()
  const sortedNews = sortNewsByDate(news)

  return (
    <Section className="pt-2 sm:pt-4">
      <SectionHeading
        eyebrow="Новости федерации"
        title="Новости"
        description="Публикации, официальные материалы и обновления раздела. Новые записи добавляются из единого источника данных после проверки содержания."
      />

      {sortedNews.length ? (
        <motion.div
          className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {sortedNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </motion.div>
      ) : (
        <EmptyState
          className="mt-8"
          title="Новостей пока нет"
          description="Подтверждённые материалы появятся здесь после подготовки к публикации."
        />
      )}
    </Section>
  )
}

export default NewsPage

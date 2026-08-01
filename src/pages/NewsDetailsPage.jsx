import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getNews, getNewsBySlug } from '../api/newsApi'
import Breadcrumbs from '../components/common/Breadcrumbs'
import EmptyState from '../components/common/EmptyState'
import MediaPlaceholder from '../components/common/MediaPlaceholder'
import NewsCard from '../components/common/NewsCard'
import Section from '../components/common/Section'
import SectionHeading from '../components/common/SectionHeading'
import Button from '../components/ui/Button'
import { formatNewsDate } from '../utils/news'
import NotFoundPage from './NotFoundPage'

function NewsCover({ item }) {
  if (item.coverImage) {
    return (
      <img
        alt={item.imageAlt || item.title}
        className="aspect-[16/8] w-full border border-[color:var(--border)] object-cover"
        src={item.coverImage}
      />
    )
  }

  return (
    <MediaPlaceholder
      className="aspect-[16/8] min-h-56"
      label="Фотография готовится к публикации"
    />
  )
}

function NewsDetailsPage() {
  const { slug } = useParams()
  const [item, setItem] = useState(null)
  const [otherNews, setOtherNews] = useState([])
  const [status, setStatus] = useState('loading')
  const [shareStatus, setShareStatus] = useState({ slug: null, message: '' })

  useEffect(() => {
    const controller = new AbortController()

    async function loadNewsItem() {
      try {
        const newsItem = await getNewsBySlug(slug, {
          signal: controller.signal,
        })

        if (!newsItem) {
          setStatus('not-found')
          return
        }

        setItem(newsItem)
        setStatus('success')

        try {
          const items = await getNews({ limit: 4, signal: controller.signal })
          setOtherNews(
            items.filter((otherItem) => otherItem.slug !== newsItem.slug).slice(0, 3),
          )
        } catch (error) {
          if (error.name === 'AbortError') throw error
          setOtherNews([])
        }
      } catch (error) {
        if (error.name !== 'AbortError') setStatus('error')
      }
    }

    loadNewsItem()
    return () => controller.abort()
  }, [slug])

  async function handleShare() {
    const shareData = { title: item.title, url: window.location.href }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setShareStatus({ slug, message: 'Ссылка отправлена' })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setShareStatus({ slug, message: 'Ссылка скопирована' })
      }
    } catch {
      setShareStatus({ slug, message: 'Не удалось поделиться ссылкой' })
    }
  }

  const pageStatus = status === 'success' && item?.slug !== slug ? 'loading' : status

  if (pageStatus === 'not-found') return <NotFoundPage />

  if (pageStatus === 'loading') {
    return (
      <Section className="pt-2 sm:pt-4">
        <EmptyState
          title="Загружаем материал"
          description="Полная версия новости появится через несколько секунд."
        />
      </Section>
    )
  }

  if (pageStatus === 'error') {
    return (
      <Section className="pt-2 sm:pt-4">
        <EmptyState
          title="Материал временно недоступен"
          description="Не удалось получить новость из системы публикации. Попробуйте обновить страницу позже."
        />
      </Section>
    )
  }

  return (
    <>
      <Section className="pt-2 sm:pt-4">
        <Breadcrumbs
          items={[
            { label: 'Главная', to: '/' },
            { label: 'Новости', to: '/news' },
            { label: item.title },
          ]}
        />

        <article className="mx-auto mt-8 max-w-4xl">
          {item.publishedAt ? (
            <time
              className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]"
              dateTime={item.publishedAt}
            >
              {formatNewsDate(item.publishedAt)}
            </time>
          ) : null}
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-5xl sm:leading-[1.05]">
            {item.title}
          </h1>
          {item.shortDescription ? (
            <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--muted-foreground)] sm:text-lg">
              {item.shortDescription}
            </p>
          ) : null}

          <div className="mt-8">
            <NewsCover item={item} />
          </div>

          {item.content.length ? (
            <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-[color:var(--foreground)]">
              {item.content.map((paragraph, index) => (
                <p key={`${item.id}-${index}`}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-8"
              title="Полный текст готовится"
              description="Материал будет дополнен в системе публикации."
            />
          )}

          <div className="mt-8 flex flex-col gap-3 border-t border-[color:var(--border)] pt-6 sm:flex-row sm:items-center">
            <Button to="/news" variant="secondary">
              Все новости
            </Button>
            <Button onClick={handleShare} variant="text">
              Поделиться ссылкой
            </Button>
            {shareStatus.slug === slug && shareStatus.message ? (
              <span
                className="text-sm text-[color:var(--muted-foreground)]"
                role="status"
              >
                {shareStatus.message}
              </span>
            ) : null}
          </div>
        </article>
      </Section>

      {otherNews.length ? (
        <Section className="pb-16 pt-16 sm:pb-20 sm:pt-20">
          <SectionHeading title="Другие новости" />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {otherNews.map((otherItem) => (
              <NewsCard key={otherItem.id} item={otherItem} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  )
}

export default NewsDetailsPage

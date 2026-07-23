import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumbs from '../components/common/Breadcrumbs'
import MediaPlaceholder from '../components/common/MediaPlaceholder'
import NewsCard from '../components/common/NewsCard'
import Section from '../components/common/Section'
import SectionHeading from '../components/common/SectionHeading'
import Button from '../components/ui/Button'
import { news } from '../data/news'
import NotFoundPage from './NotFoundPage'
import { formatNewsDate, sortNewsByDate } from '../utils/news'

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
    <MediaPlaceholder className="aspect-[16/8] min-h-56" label="Фотография готовится к публикации" />
  )
}

function NewsDetailsPage() {
  const { slug } = useParams()
  const [shareStatus, setShareStatus] = useState('')
  const item = news.find((newsItem) => newsItem.slug === slug)

  if (!item) {
    return <NotFoundPage />
  }

  const otherNews = sortNewsByDate(news)
    .filter((newsItem) => newsItem.slug !== item.slug)
    .slice(0, 3)

  async function handleShare() {
    const shareData = { title: item.title, url: window.location.href }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setShareStatus('Ссылка отправлена')
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setShareStatus('Ссылка скопирована')
      }
    } catch {
      setShareStatus('Не удалось поделиться ссылкой')
    }
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
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
            <span>{item.category}</span>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[color:var(--border-strong)]" />
            <time dateTime={item.publishedAt}>{formatNewsDate(item.publishedAt)}</time>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-5xl sm:leading-[1.05]">
            {item.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--muted-foreground)] sm:text-lg">
            {item.shortDescription}
          </p>

          <div className="mt-8">
            <NewsCover item={item} />
          </div>

          <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-[color:var(--foreground)]">
            {item.content.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[color:var(--border)] pt-6 sm:flex-row sm:items-center">
            <Button to="/news" variant="secondary">
              Все новости
            </Button>
            <Button onClick={handleShare} variant="text">
              Поделиться ссылкой
            </Button>
            {shareStatus ? <span className="text-sm text-[color:var(--muted-foreground)]" role="status">{shareStatus}</span> : null}
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

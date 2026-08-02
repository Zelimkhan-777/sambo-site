import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMediaBySlug } from '../api/mediaApi'
import Breadcrumbs from '../components/common/Breadcrumbs'
import EmptyState from '../components/common/EmptyState'
import Section from '../components/common/Section'
import Button from '../components/ui/Button'
import NotFoundPage from './NotFoundPage'
import Seo from '../components/common/Seo'
import { getCanonicalUrl, SITE_NAME } from '../utils/seo'

function MediaDetailsPage() {
  const { slug } = useParams()
  const [result, setResult] = useState({ item: null, slug: null, status: 'loading' })
  const status = result.slug === slug ? result.status : 'loading'

  useEffect(() => {
    const controller = new AbortController()

    async function loadMediaItem() {
      try {
        const item = await getMediaBySlug(slug, { signal: controller.signal })
        setResult({
          item,
          slug,
          status: item ? 'success' : 'not-found',
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          setResult({ item: null, slug, status: 'error' })
        }
      }
    }

    loadMediaItem()
    return () => controller.abort()
  }, [slug])

  if (status === 'not-found') return <NotFoundPage />

  if (status === 'loading') {
    return (
      <Section className="pt-2 sm:pt-4">
        <EmptyState
          title="Загружаем видеоматериал"
          description="Пожалуйста, подождите немного."
        />
      </Section>
    )
  }

  if (status === 'error') {
    return (
      <Section className="pt-2 sm:pt-4">
        <EmptyState
          title="Видеоматериал временно недоступен"
          description="Не удалось загрузить видеоматериал. Попробуйте обновить страницу позже."
        />
      </Section>
    )
  }

  const item = result.item

  return (
    <>
      <Seo
        title={`${item.title} | ${SITE_NAME}`}
        description={item.description[0] || `Видеоматериал Федерации самбо Чеченской Республики: ${item.title}.`}
        path={`/media/${item.slug}`}
        type="video.other"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'VideoObject',
          name: item.title,
          description: item.description[0] || item.title,
          contentUrl: item.videoUrl || undefined,
          mainEntityOfPage: getCanonicalUrl(`/media/${item.slug}`),
          publisher: {
            '@type': 'Organization',
            '@id': `${getCanonicalUrl('/')}#organization`,
            name: SITE_NAME,
          },
        }}
      />
      <Section className="pt-2 sm:pt-4">
        <Breadcrumbs
          items={[
            { label: 'Главная', to: '/' },
            { label: 'Медиа', to: '/media' },
            { label: item.title },
          ]}
        />

        <article className="mx-auto mt-8 max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl sm:leading-[1.1]">
          {item.title}
        </h1>

        {item.videoUrl ? (
          <video
            aria-label={item.title}
            className="mt-8 aspect-video w-full border border-[color:var(--border)] bg-neutral-950 object-contain"
            controls
            playsInline
            preload="metadata"
            src={item.videoUrl}
          >
            Ваш браузер не поддерживает воспроизведение видео.
          </video>
        ) : (
          <EmptyState
            className="mt-8"
            title="Видео не опубликовано"
            description="Файл видеоматериала пока недоступен."
          />
        )}

        {item.description.length > 0 && (
          <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-[color:var(--foreground)]">
            {item.description.map((paragraph, index) => (
              <p key={`${item.id}-${index}`}>{paragraph}</p>
            ))}
          </div>
        )}

        <div className="mt-8 border-t border-[color:var(--border)] pt-6">
          <Button to="/media" variant="secondary">
            Все видеоматериалы
          </Button>
        </div>
        </article>
      </Section>
    </>
  )
}

export default MediaDetailsPage

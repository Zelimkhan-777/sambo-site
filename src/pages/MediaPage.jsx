import { useEffect, useState } from 'react'
import { getMedia } from '../api/mediaApi'
import EmptyState from '../components/common/EmptyState'
import Section from '../components/common/Section'
import SectionHeading from '../components/common/SectionHeading'
import { formatNewsDate } from '../utils/news'

function MediaPage() {
  const [media, setMedia] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function loadMedia() {
      try {
        const items = await getMedia({ signal: controller.signal })
        setMedia(items)
        setStatus('success')
      } catch (error) {
        if (error.name !== 'AbortError') setStatus('error')
      }
    }

    loadMedia()
    return () => controller.abort()
  }, [])

  return (
    <Section className="pt-2 sm:pt-4">
      <SectionHeading
        eyebrow="Видео Федерации"
        title="Медиа"
        description="Видеоматериалы о тренировках, соревнованиях и работе Федерации."
      />

      {status === 'loading' ? (
        <EmptyState
          className="mt-8"
          title="Загружаем видеоматериалы"
          description="Видео появятся через несколько секунд."
        />
      ) : null}

      {status === 'error' ? (
        <EmptyState
          className="mt-8"
          title="Медиа временно недоступны"
          description="Не удалось получить видеоматериалы из системы публикации. Попробуйте обновить страницу позже."
        />
      ) : null}

      {status === 'success' && media.length ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {media.map((item) => (
            <article
              key={item.id}
              className="border border-[color:var(--border)] bg-[color:var(--surface)]"
            >
              {item.videoUrl ? (
                <video
                  aria-label={item.title}
                  className="aspect-video w-full bg-neutral-950 object-contain"
                  controls
                  preload="metadata"
                  src={item.videoUrl}
                >
                  Ваш браузер не поддерживает воспроизведение видео.
                </video>
              ) : (
                <div className="flex aspect-video items-center justify-center border-b border-[color:var(--border)] bg-[color:var(--surface-strong)] px-5 text-center text-sm text-[color:var(--muted-foreground)]">
                  Видео будет добавлено
                </div>
              )}

              <div className="p-5">
                {item.publishedAt ? (
                  <time
                    className="text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]"
                    dateTime={item.publishedAt}
                  >
                    {formatNewsDate(item.publishedAt)}
                  </time>
                ) : null}
                <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                  {item.title}
                </h2>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {status === 'success' && !media.length ? (
        <EmptyState
          className="mt-8"
          title="Видеоматериалы пока не опубликованы"
          description="Новые видео появятся здесь после публикации."
        />
      ) : null}
    </Section>
  )
}

export default MediaPage

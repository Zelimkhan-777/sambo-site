import { Download, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getDocuments } from '../api/documentsApi'
import EmptyState from '../components/common/EmptyState'
import Section from '../components/common/Section'
import SectionHeading from '../components/common/SectionHeading'
import { formatNewsDate } from '../utils/news'

function formatFileSize(value) {
  if (!value) return ''
  if (value < 1024 * 1024) return `${Math.ceil(value / 1024)} КБ`
  return `${(value / (1024 * 1024)).toFixed(1)} МБ`
}

function DocumentsPage() {
  const [documents, setDocuments] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function loadDocuments() {
      try {
        const items = await getDocuments({ signal: controller.signal })
        setDocuments(items)
        setStatus('success')
      } catch (error) {
        if (error.name !== 'AbortError') setStatus('error')
      }
    }

    loadDocuments()
    return () => controller.abort()
  }, [])

  return (
    <Section className="pt-2 sm:pt-4">
      <SectionHeading
        as="h1"
        eyebrow="Официальные материалы"
        title="Документы"
        description="Положения, регламенты и другие официальные документы Федерации."
      />

      {status === 'loading' ? (
        <EmptyState
          className="mt-8"
          title="Загружаем документы"
          description="Пожалуйста, подождите немного."
        />
      ) : null}

      {status === 'error' ? (
        <EmptyState
          className="mt-8"
          title="Документы временно недоступны"
          description="Не удалось загрузить каталог. Попробуйте обновить страницу позже."
        />
      ) : null}

      {status === 'success' && documents.length ? (
        <ul className="mt-8 divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
          {documents.map((document) => {
            const metadata = [
              document.category,
              formatNewsDate(document.publishedAt),
              document.fileType,
              formatFileSize(document.fileSize),
            ].filter(Boolean)

            return (
              <li
                key={document.id}
                className="flex flex-col gap-5 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[color:var(--border)] bg-[color:var(--surface)] text-[color:var(--accent-red)]">
                    <FileText aria-hidden="true" size={20} strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold leading-7 text-[color:var(--foreground)]">
                      {document.title}
                    </h2>
                    {metadata.length ? (
                      <p className="mt-1 text-xs leading-6 text-[color:var(--muted-foreground)]">
                        {metadata.join(' · ')}
                      </p>
                    ) : null}
                  </div>
                </div>

                {document.isAvailable && document.fileUrl ? (
                  <a
                    className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 border border-[color:var(--border-strong)] px-4 text-sm font-medium text-[color:var(--foreground)] transition-colors hover:bg-[color:var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)]"
                    download={document.fileName || true}
                    href={document.fileUrl}
                  >
                    <Download aria-hidden="true" size={17} />
                    Скачать
                  </a>
                ) : (
                  <span className="text-sm text-[color:var(--muted-foreground)]">
                    Файл не опубликован
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      ) : null}

      {status === 'success' && !documents.length ? (
        <EmptyState
          className="mt-8"
          title="Документы пока не опубликованы"
          description="Новые материалы появятся в этом разделе."
        />
      ) : null}
    </Section>
  )
}

export default DocumentsPage

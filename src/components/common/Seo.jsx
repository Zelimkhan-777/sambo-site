import { useEffect } from 'react'
import { DEFAULT_DESCRIPTION, getCanonicalUrl, SITE_NAME } from '../../utils/seo'

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
}

function Seo({
  title = SITE_NAME,
  description = DEFAULT_DESCRIPTION,
  path,
  image,
  type = 'website',
  noIndex = false,
  publishedAt,
  structuredData,
}) {
  useEffect(() => {
    const canonicalUrl = getCanonicalUrl(path || window.location.pathname)
    const absoluteImage = image ? new URL(image, canonicalUrl).toString() : null
    let canonical = document.head.querySelector('link[rel="canonical"]')

    document.title = title
    document.documentElement.lang = 'ru'
    setMeta('meta[name="description"]', { name: 'description', content: description })
    setMeta('meta[name="robots"]', {
      name: 'robots',
      content: noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    })
    setMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'ru_RU' })
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    setMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: absoluteImage ? 'summary_large_image' : 'summary',
    })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })

    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    const optionalMeta = [
      ['meta[property="og:image"]', 'property', 'og:image', absoluteImage],
      ['meta[name="twitter:image"]', 'name', 'twitter:image', absoluteImage],
      ['meta[property="article:published_time"]', 'property', 'article:published_time', publishedAt],
    ]

    optionalMeta.forEach(([selector, attribute, name, value]) => {
      const existing = document.head.querySelector(selector)
      if (value) setMeta(selector, { [attribute]: name, content: value })
      else existing?.remove()
    })

    let schema = document.head.querySelector('script[data-site-schema]')
    if (structuredData) {
      if (!schema) {
        schema = document.createElement('script')
        schema.type = 'application/ld+json'
        schema.dataset.siteSchema = 'true'
        document.head.appendChild(schema)
      }
      schema.textContent = JSON.stringify(structuredData)
    } else {
      schema?.remove()
    }
  }, [description, image, noIndex, path, publishedAt, structuredData, title, type])

  return null
}

export default Seo

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { loadEnv } from 'vite'

const root = process.cwd()
const dist = path.join(root, 'dist')
const env = loadEnv('production', root, '')
const siteUrl = env.VITE_SITE_URL?.trim().replace(/\/+$/, '') || ''
const directusUrl = env.VITE_DIRECTUS_URL?.trim().replace(/\/+$/, '') || ''
const siteName = 'Федерация самбо Чеченской Республики'
const defaultDescription =
  'Официальный сайт Федерации самбо Чеченской Республики: новости, документы, тренеры, соревнования и развитие самбо в регионе.'

const staticPages = [
  {
    route: '/',
    title: siteName,
    description: defaultDescription,
    priority: '1.0',
    schema: siteUrl ? {
      '@context': 'https://schema.org',
      '@type': 'SportsOrganization',
      '@id': `${siteUrl}/#organization`,
      name: 'Региональная физкультурно-спортивная общественная организация «Федерация самбо Чеченской Республики»',
      alternateName: siteName,
      url: `${siteUrl}/`,
      email: 'Sambo-chechen@mail.ru',
      telephone: '+7 963 703-75-50',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ул. Мира, 53 «А»',
        addressLocality: 'Грозный',
        postalCode: '364051',
        addressRegion: 'Чеченская Республика',
        addressCountry: 'RU',
      },
      sport: 'Самбо',
    } : undefined,
  },
  { route: '/about', title: `О Федерации | ${siteName}`, description: 'Официальная информация о Федерации самбо Чеченской Республики, направлениях работы, руководстве и контактах.', priority: '0.8' },
  { route: '/news', title: `Новости | ${siteName}`, description: 'Новости, официальные материалы и события Федерации самбо Чеченской Республики.', priority: '0.9' },
  { route: '/media', title: `Медиа | ${siteName}`, description: 'Видеоматериалы о тренировках, соревнованиях и работе Федерации самбо Чеченской Республики.', priority: '0.7' },
  { route: '/coaches', title: `Тренеры | ${siteName}`, description: 'Тренерский состав Федерации самбо Чеченской Республики.', priority: '0.7' },
  { route: '/documents', title: `Документы | ${siteName}`, description: 'Положения, регламенты и другие официальные документы Федерации самбо Чеченской Республики.', priority: '0.7' },
  { route: '/grants', title: `Гранты и программы поддержки | ${siteName}`, description: 'Проверенная информация о грантах и программах поддержки Федерации самбо Чеченской Республики.', priority: '0.6' },
]

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function absoluteUrl(route) {
  return encodeURI(`${siteUrl}${route === '/' ? '/' : route}`)
}

function renderHtml(template, page) {
  const canonical = siteUrl ? absoluteUrl(page.route) : ''
  const image = page.image || ''
  let html = template
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(page.title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/s, `<meta name="description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/s, `<meta property="og:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/s, `<meta property="og:description" content="${escapeHtml(page.description)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/s, `<meta name="twitter:title" content="${escapeHtml(page.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/s, `<meta name="twitter:description" content="${escapeHtml(page.description)}" />`)

  const additions = []
  if (canonical) {
    additions.push(`<link rel="canonical" href="${escapeHtml(canonical)}" />`)
    additions.push(`<meta property="og:url" content="${escapeHtml(canonical)}" />`)
  }
  if (image) {
    additions.push(`<meta property="og:image" content="${escapeHtml(image)}" />`)
    additions.push('<meta name="twitter:card" content="summary_large_image" />')
    additions.push(`<meta name="twitter:image" content="${escapeHtml(image)}" />`)
  }
  if (page.type === 'article') {
    additions.push('<meta property="og:type" content="article" />')
    if (page.lastmod) additions.push(`<meta property="article:published_time" content="${escapeHtml(page.lastmod)}" />`)
  }
  if (page.schema) {
    additions.push(`<script type="application/ld+json">${JSON.stringify(page.schema).replaceAll('<', '\\u003c')}</script>`)
  }

  return html.replace('</head>', `    ${additions.join('\n    ')}\n  </head>`)
}

async function fetchCollection(collection, fields) {
  if (!directusUrl) return []
  const url = new URL(`${directusUrl}/items/${collection}`)
  url.searchParams.set('fields', fields)
  url.searchParams.set('filter[status][_eq]', 'published')
  url.searchParams.set('limit', '-1')

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(5000) })
    if (!response.ok) return []
    const payload = await response.json()
    return Array.isArray(payload.data) ? payload.data : []
  } catch {
    return []
  }
}

async function getDynamicPages() {
  const [news, media] = await Promise.all([
    fetchCollection('news', 'slug,title,short_description,date_created,cover_image'),
    fetchCollection('media', 'slug,title,description'),
  ])

  return [
    ...news.filter((item) => item.slug && item.title).map((item) => {
      const route = `/news/${item.slug}`
      const image = item.cover_image && directusUrl
        ? `${directusUrl}/assets/${encodeURIComponent(typeof item.cover_image === 'object' ? item.cover_image.id : item.cover_image)}`
        : undefined
      return {
        route,
        title: `${item.title} | ${siteName}`,
        description: item.short_description || `Новость Федерации самбо Чеченской Республики: ${item.title}.`,
        image,
        lastmod: item.date_created,
        priority: '0.8',
        type: 'article',
        schema: siteUrl ? {
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          headline: item.title,
          description: item.short_description || undefined,
          image,
          datePublished: item.date_created || undefined,
          mainEntityOfPage: absoluteUrl(route),
          publisher: { '@type': 'Organization', name: siteName },
        } : undefined,
      }
    }),
    ...media.filter((item) => item.slug && item.title).map((item) => ({
      route: `/media/${item.slug}`,
      title: `${item.title} | ${siteName}`,
      description: typeof item.description === 'string' && item.description.trim()
        ? item.description.trim().slice(0, 160)
        : `Видеоматериал Федерации самбо Чеченской Республики: ${item.title}.`,
      priority: '0.6',
    })),
  ]
}

const template = await readFile(path.join(dist, 'index.html'), 'utf8')
const dynamicPages = await getDynamicPages()
const pages = [...staticPages, ...dynamicPages]

for (const page of pages) {
  const output = page.route === '/' ? path.join(dist, 'index.html') : path.join(dist, page.route.slice(1), 'index.html')
  await mkdir(path.dirname(output), { recursive: true })
  await writeFile(output, renderHtml(template, page), 'utf8')
}

const notFoundHtml = renderHtml(template, {
  route: '/404',
  title: `Страница не найдена | ${siteName}`,
  description: 'Запрошенная страница не найдена.',
}).replace('content="index, follow, max-image-preview:large"', 'content="noindex, nofollow"')
await writeFile(path.join(dist, '404.html'), notFoundHtml, 'utf8')

const robots = ['User-agent: *', 'Allow: /']
if (siteUrl) {
  robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((page) => `  <url>\n    <loc>${escapeHtml(absoluteUrl(page.route))}</loc>${page.lastmod ? `\n    <lastmod>${escapeHtml(page.lastmod)}</lastmod>` : ''}\n    <changefreq>${page.route === '/news' ? 'daily' : 'weekly'}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`).join('\n')}\n</urlset>\n`
  await writeFile(path.join(dist, 'sitemap.xml'), sitemap, 'utf8')
} else {
  console.warn('VITE_SITE_URL не задан: canonical и sitemap будут сформированы после настройки домена.')
}
await writeFile(path.join(dist, 'robots.txt'), `${robots.join('\n')}\n`, 'utf8')

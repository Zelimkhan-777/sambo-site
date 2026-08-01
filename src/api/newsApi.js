import { apiRequest, getAssetUrl } from './client'

const listFields = [
  'id',
  'slug',
  'title',
  'date',
  'short_description',
  'cover_image.id',
  'cover_image.title',
  'cover_image.description',
].join(',')

const detailFields = `${listFields},content`

function normalizeContent(content) {
  if (Array.isArray(content)) {
    return content.filter((paragraph) => typeof paragraph === 'string' && paragraph.trim())
  }

  if (typeof content !== 'string') return []

  return content
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

function normalizeNewsItem(item, { includeContent = false } = {}) {
  const normalizedItem = {
    id: item.id,
    slug: item.slug,
    title: item.title,
    coverImage: getAssetUrl(item.cover_image),
    imageAlt:
      item.cover_image?.description || item.cover_image?.title || item.title,
    publishedAt: item.date,
    shortDescription: item.short_description || '',
  }

  if (includeContent) {
    normalizedItem.content = normalizeContent(item.content)
  }

  return normalizedItem
}

export async function getNews({ limit, signal } = {}) {
  const items = await apiRequest('/items/news', {
    signal,
    query: {
      fields: listFields,
      'filter[status][_eq]': 'published',
      sort: '-date',
      limit,
    },
  })

  return Array.isArray(items) ? items.map((item) => normalizeNewsItem(item)) : []
}

export async function getNewsBySlug(slug, { signal } = {}) {
  const items = await apiRequest('/items/news', {
    signal,
    query: {
      fields: detailFields,
      'filter[status][_eq]': 'published',
      'filter[slug][_eq]': slug,
      limit: 1,
    },
  })

  const item = Array.isArray(items) ? items[0] : null
  return item ? normalizeNewsItem(item, { includeContent: true }) : null
}

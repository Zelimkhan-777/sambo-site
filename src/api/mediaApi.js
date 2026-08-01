import { apiRequest, getAssetUrl } from './client'

const listFields = 'id,title,slug,video'
const detailFields = `${listFields},description`

function normalizeDescription(description) {
  if (Array.isArray(description)) {
    return description.filter(
      (paragraph) => typeof paragraph === 'string' && paragraph.trim(),
    )
  }

  if (typeof description !== 'string') return []

  return description
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

function normalizeMediaItem(item, { includeDescription = false } = {}) {
  const normalizedItem = {
    id: item.id,
    slug: item.slug,
    title: item.title,
    videoUrl: getAssetUrl(item.video),
  }

  if (includeDescription) {
    normalizedItem.description = normalizeDescription(item.description)
  }

  return normalizedItem
}

export async function getMedia({ signal } = {}) {
  const items = await apiRequest('/items/media', {
    signal,
    query: {
      fields: listFields,
      'filter[status][_eq]': 'published',
      sort: '-date_created',
    },
  })

  return Array.isArray(items) ? items.map(normalizeMediaItem) : []
}

export async function getMediaPage({ page = 1, limit = 6, signal } = {}) {
  const publishedFilter = { 'filter[status][_eq]': 'published' }

  const [items, aggregate] = await Promise.all([
    apiRequest('/items/media', {
      signal,
      query: {
        fields: listFields,
        ...publishedFilter,
        sort: '-date_created',
        page,
        limit,
      },
    }),
    apiRequest('/items/media', {
      signal,
      query: {
        'aggregate[count]': 'id',
        ...publishedFilter,
      },
    }),
  ])

  return {
    items: Array.isArray(items) ? items.map(normalizeMediaItem) : [],
    total: Number(aggregate?.[0]?.count?.id) || 0,
  }
}

export async function getMediaBySlug(slug, { signal } = {}) {
  const items = await apiRequest('/items/media', {
    signal,
    query: {
      fields: detailFields,
      'filter[status][_eq]': 'published',
      'filter[slug][_eq]': slug,
      limit: 1,
    },
  })

  const item = Array.isArray(items) ? items[0] : null
  return item ? normalizeMediaItem(item, { includeDescription: true }) : null
}

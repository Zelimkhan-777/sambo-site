import { apiRequest, getAssetUrl } from './client'

function normalizeMediaItem(item) {
  return {
    id: item.id,
    title: item.title,
    videoUrl: getAssetUrl(item.video),
    publishedAt: item.date || null,
  }
}

export async function getMedia({ signal } = {}) {
  const items = await apiRequest('/items/media', {
    signal,
    query: {
      fields: 'id,title,date,video',
      'filter[status][_eq]': 'published',
      sort: '-date',
    },
  })

  return Array.isArray(items) ? items.map(normalizeMediaItem) : []
}

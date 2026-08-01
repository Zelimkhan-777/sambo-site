import { apiRequest, getAssetUrl } from './client'

function normalizeDocument(item) {
  const publishedAt = item.date || null

  return {
    id: item.id,
    title: item.title,
    category: item.category || '',
    publishedAt,
    year: publishedAt ? new Date(publishedAt).getFullYear() : null,
    fileUrl: getAssetUrl(item.file, { download: true }),
    fileName: item.file?.filename_download || null,
    fileType: item.file?.type || null,
    fileSize: item.file?.filesize ? Number(item.file.filesize) : null,
    isAvailable: Boolean(item.file),
  }
}

export async function getDocuments({ signal } = {}) {
  const items = await apiRequest('/items/documents', {
    signal,
    query: {
      fields:
        'id,title,date,category,file.id,file.filename_download,file.type,file.filesize',
      'filter[status][_eq]': 'published',
      sort: '-date',
    },
  })

  return Array.isArray(items) ? items.map(normalizeDocument) : []
}

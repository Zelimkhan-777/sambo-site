const directusUrl = import.meta.env.VITE_DIRECTUS_URL?.trim().replace(/\/+$/, '')

export class ApiError extends Error {
  constructor(message, { status = null, cause = null } = {}) {
    super(message, { cause })
    this.name = 'ApiError'
    this.status = status
  }
}

function createUrl(path, query = {}) {
  if (!directusUrl) {
    throw new ApiError('Не задан адрес Directus в VITE_DIRECTUS_URL.')
  }

  const url = new URL(`${directusUrl}${path.startsWith('/') ? path : `/${path}`}`)

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })

  return url
}

export async function apiRequest(path, { query, signal } = {}) {
  let response

  try {
    response = await fetch(createUrl(path, query), {
      headers: { Accept: 'application/json' },
      signal,
    })
  } catch (error) {
    if (error.name === 'AbortError' || error instanceof ApiError) {
      throw error
    }

    throw new ApiError('Не удалось подключиться к Directus.', { cause: error })
  }

  if (!response.ok) {
    throw new ApiError('Directus вернул ошибку при загрузке данных.', {
      status: response.status,
    })
  }

  try {
    const payload = await response.json()
    return payload.data
  } catch (error) {
    throw new ApiError('Directus вернул некорректный ответ.', {
      status: response.status,
      cause: error,
    })
  }
}

function getFileId(file) {
  if (!file) return null
  if (typeof file === 'object') return file.id || null
  return file
}

export function getAssetUrl(file, { download = false } = {}) {
  const fileId = getFileId(file)

  if (!fileId) return null
  if (/^https?:\/\//i.test(fileId)) return fileId
  if (!directusUrl) return null

  const url = new URL(`${directusUrl}/assets/${encodeURIComponent(fileId)}`)
  if (download) url.searchParams.set('download', '')

  return url.toString()
}

export function sortNewsByDate(items) {
  return [...items].sort(
    (firstItem, secondItem) =>
      (new Date(secondItem.publishedAt).getTime() || 0) -
      (new Date(firstItem.publishedAt).getTime() || 0),
  )
}

export function formatNewsDate(value) {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function sortNewsByDate(items) {
  return [...items].sort(
    (firstItem, secondItem) =>
      new Date(secondItem.publishedAt) - new Date(firstItem.publishedAt),
  )
}

export function formatNewsDate(value) {
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

import { useParams } from 'react-router-dom'
import PageStub from '../components/common/PageStub'

function NewsDetailsPage() {
  const { slug } = useParams()

  return (
    <PageStub
      eyebrow="Новость"
      title="Страница новости"
      description={`Маршрут для отдельной новости работает. Текущий slug: "${slug}". Полноценное содержимое будет добавлено на отдельном этапе.`}
    />
  )
}

export default NewsDetailsPage

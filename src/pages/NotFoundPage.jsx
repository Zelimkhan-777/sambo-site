import PageStub from '../components/common/PageStub'
import Seo from '../components/common/Seo'
import { SITE_NAME } from '../utils/seo'

function NotFoundPage() {
  return (
    <>
      <Seo
        title={`Страница не найдена | ${SITE_NAME}`}
        description="Запрошенная страница не найдена."
        noIndex
      />
      <PageStub
        eyebrow="404"
        title="Страница не найдена"
        description="Запрошенный раздел отсутствует или был указан с ошибкой. Используйте навигацию сайта для перехода к доступным страницам."
      />
    </>
  )
}

export default NotFoundPage

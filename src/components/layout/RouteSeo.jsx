import { useLocation } from 'react-router-dom'
import Seo from '../common/Seo'
import { getOrganizationSchema, SITE_NAME, staticSeo } from '../../utils/seo'

function RouteSeo() {
  const { pathname, search } = useLocation()
  const config = staticSeo[pathname]
  const isDynamicRoute = pathname.startsWith('/news/') || pathname.startsWith('/media/')

  if (config) {
    const canonicalPath = search ? `${pathname}${search}` : pathname
    return (
      <Seo
        {...config}
        path={canonicalPath}
        structuredData={pathname === '/' ? getOrganizationSchema() : undefined}
      />
    )
  }

  return (
    <Seo
      title={`${isDynamicRoute ? 'Материал загружается' : 'Страница не найдена'} | ${SITE_NAME}`}
      description={isDynamicRoute ? 'Загрузка материала Федерации самбо Чеченской Республики.' : 'Запрошенная страница не найдена.'}
      path={pathname}
      noIndex
    />
  )
}

export default RouteSeo

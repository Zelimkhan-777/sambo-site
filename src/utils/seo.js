import { federationInfo } from '../data/federation'

export const SITE_NAME = federationInfo.shortName
export const DEFAULT_DESCRIPTION =
  'Официальный сайт Федерации самбо Чеченской Республики: новости, документы, тренеры, соревнования и развитие самбо в регионе.'

export const staticSeo = {
  '/': {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
  },
  '/about': {
    title: `О Федерации | ${SITE_NAME}`,
    description:
      'Официальная информация о Федерации самбо Чеченской Республики, направлениях работы, руководстве и контактах.',
  },
  '/documents': {
    title: `Документы | ${SITE_NAME}`,
    description:
      'Положения, регламенты и другие официальные документы Федерации самбо Чеченской Республики.',
  },
  '/grants': {
    title: `Гранты и программы поддержки | ${SITE_NAME}`,
    description:
      'Гранты, социальные проекты и программы поддержки Федерации самбо Чеченской Республики.',
  },
  '/news': {
    title: `Новости | ${SITE_NAME}`,
    description:
      'Новости, официальные материалы и события Федерации самбо Чеченской Республики.',
  },
  '/media': {
    title: `Медиа | ${SITE_NAME}`,
    description:
      'Видеоматериалы о тренировках, соревнованиях и работе Федерации самбо Чеченской Республики.',
  },
  '/coaches': {
    title: `Тренеры | ${SITE_NAME}`,
    description:
      'Тренерский состав Федерации самбо Чеченской Республики: наставники спортивного, боевого и юниорского самбо.',
  },
}

export function getSiteUrl() {
  const configuredUrl = import.meta.env.VITE_SITE_URL?.trim().replace(/\/+$/, '')
  if (configuredUrl) return configuredUrl
  return typeof window === 'undefined' ? '' : window.location.origin
}

export function getCanonicalUrl(path = '/') {
  const siteUrl = getSiteUrl()
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return siteUrl ? `${siteUrl}${normalizedPath === '/' ? '/' : normalizedPath}` : normalizedPath
}

export function getOrganizationSchema() {
  const siteUrl = getSiteUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    '@id': `${siteUrl}/#organization`,
    name: federationInfo.fullName.replace(/\.$/, ''),
    alternateName: federationInfo.shortName,
    url: siteUrl || undefined,
    email: federationInfo.email,
    telephone: federationInfo.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Мира, 53 «А»',
      addressLocality: 'Грозный',
      postalCode: '364051',
      addressRegion: 'Чеченская Республика',
      addressCountry: 'RU',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Чеченская Республика',
    },
    sport: 'Самбо',
  }
}

import { newsMedia } from './media'

export const news = [
  {
    id: 1,
    slug: 'federation-news-feed-preparation',
    title: 'Лента новостей готовится к наполнению',
    shortDescription:
      'На сайте подготовлена структура для публикации новостей, официальных материалов и результатов мероприятий.',
    content: [
      'Раздел новостей подготовлен для публикации материалов Федерации самбо Чеченской Республики.',
      'Публикации будут добавляться после проверки источников и согласования содержания.',
    ],
    category: 'Обновление раздела',
    publishedAt: '2026-07-20',
    coverImage: newsMedia[0].src,
    imageAlt: newsMedia[0].alt,
    isVerified: false,
    sourceName: newsMedia[0].sourceName,
    sourceUrl: newsMedia[0].sourceUrl,
    isTemporary: true,
  },
  {
    id: 2,
    slug: 'materials-verification-in-progress',
    title: 'Проверка материалов для публикации продолжается',
    shortDescription:
      'Раздел новостей будет дополнен подтверждёнными публикациями после проверки источников и актуализации данных.',
    content: [
      'Команда проекта проверяет материалы, которые могут быть опубликованы в новостном разделе.',
      'До завершения проверки запись носит временный информационный характер.',
    ],
    category: 'Подготовка контента',
    publishedAt: '2026-07-18',
    coverImage: newsMedia[1].src,
    imageAlt: newsMedia[1].alt,
    isVerified: false,
    sourceName: newsMedia[1].sourceName,
    sourceUrl: newsMedia[1].sourceUrl,
    isTemporary: true,
  },
  {
    id: 3,
    slug: 'homepage-news-preview-enabled',
    title: 'На главной странице подключён блок последних новостей',
    shortDescription:
      'Секция предназначена для будущего вывода подтверждённых новостей федерации и сейчас содержит временные демонстрационные записи.',
    content: [
      'На главной странице работает блок последних материалов, связанный с единым источником новостей.',
      'После появления подтверждённых публикаций временные записи будут заменены актуальными материалами.',
    ],
    category: 'Развитие сайта',
    publishedAt: '2026-07-15',
    coverImage: newsMedia[2].src,
    imageAlt: newsMedia[2].alt,
    isVerified: false,
    sourceName: newsMedia[2].sourceName,
    sourceUrl: newsMedia[2].sourceUrl,
    isTemporary: true,
  },
]

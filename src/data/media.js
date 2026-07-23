import heroImage from '../assets/images/optimized/hero/sambo-hero.jpg'
import rustamKagermanovImage from '../assets/images/optimized/leadership/rustam-kagermanov.jpg'
import turpalAliIbragimovImage from '../assets/images/optimized/leadership/turpal-ali-ibragimov.jpg'
import newsImage01 from '../assets/images/optimized/news/grozny-skfo-01.jpg'
import newsImage02 from '../assets/images/optimized/news/grozny-skfo-02.jpg'
import newsImage03 from '../assets/images/optimized/news/grozny-skfo-03.jpg'
import shaliTrainingImage from '../assets/images/optimized/hero/shali-training-01.jpg'

const samboArchiveUrl = 'https://www.sambo.ru/photo/2026/4696/'
const samboSourceName = 'Фотоархив Всероссийской федерации самбо'
const regionalNewsUrl = 'https://sambo.ru/press/news/2022/9762/'
const regionalNewsSourceName = 'Всероссийская федерация самбо: новость о Первенстве СКФО'

export const heroMedia = {
  id: 'sambo-hero-01',
  src: heroImage,
  alt: 'Спортсмены во время поединка по самбо',
  sourceName: samboSourceName,
  sourceUrl: samboArchiveUrl,
  category: 'hero',
  usageStatus: 'requires-approval',
  isVerified: true,
}

export const heroSlides = [
  {
    ...heroMedia,
    caption: 'Сила и характер в каждом поединке',
  },
  {
    id: 'grozny-skfo-action',
    src: newsImage01,
    alt: 'Спортсмены во время соревнований по самбо в Грозном',
    caption: 'Соревновательный характер спортсменов региона',
    sourceName: regionalNewsSourceName,
    sourceUrl: regionalNewsUrl,
    category: 'hero',
    usageStatus: 'requires-approval',
    isVerified: true,
  },
  {
    id: 'grozny-skfo-award',
    src: newsImage03,
    alt: 'Награждение спортсмена на соревнованиях по самбо в Грозном',
    caption: 'Результат дисциплины и ежедневной работы',
    sourceName: regionalNewsSourceName,
    sourceUrl: regionalNewsUrl,
    category: 'hero',
    usageStatus: 'requires-approval',
    isVerified: true,
  },
  {
    id: 'shali-sambo-training',
    src: shaliTrainingImage,
    alt: 'Юные самбисты на тренировочном сборе в Шали',
    caption: 'Новое поколение самбо Чеченской Республики',
    sourceName: 'Всероссийская федерация самбо: сборы по самбо в Шали',
    sourceUrl: 'https://sambo.ru/press/news/2024/11003/',
    category: 'hero',
    usageStatus: 'requires-approval',
    isVerified: true,
  },
]

export const newsMedia = [
  {
    id: 'sambo-news-01',
    src: newsImage01,
    alt: 'Церемония награждения на соревнованиях по самбо',
    sourceName: regionalNewsSourceName,
    sourceUrl: regionalNewsUrl,
    category: 'news',
    usageStatus: 'requires-approval',
    isVerified: true,
  },
  {
    id: 'sambo-news-02',
    src: newsImage02,
    alt: 'Спортсмен во время соревнований по самбо',
    sourceName: regionalNewsSourceName,
    sourceUrl: regionalNewsUrl,
    category: 'news',
    usageStatus: 'requires-approval',
    isVerified: true,
  },
  {
    id: 'sambo-news-03',
    src: newsImage03,
    alt: 'Спортсмены во время поединка по самбо',
    sourceName: regionalNewsSourceName,
    sourceUrl: regionalNewsUrl,
    category: 'news',
    usageStatus: 'requires-approval',
    isVerified: true,
  },
]

export const activityMedia = {
  'sport-sambo': {
    src: newsImage01,
    alt: 'Поединок спортсменов на соревнованиях по самбо в Грозном',
  },
  'combat-sambo': {
    src: heroImage,
    alt: 'Спортсмены во время поединка по самбо',
  },
  'youth-sport': {
    src: shaliTrainingImage,
    alt: 'Юные самбисты на сборе в Шали',
  },
  reserve: {
    src: shaliTrainingImage,
    alt: 'Спортсмены на тренировочном сборе по самбо',
  },
  events: {
    src: newsImage02,
    alt: 'Участники соревнований по самбо в Грозном',
  },
  judging: {
    src: newsImage03,
    alt: 'Церемония награждения на соревнованиях по самбо',
  },
}

export const leadershipMedia = {
  'ibragimov-turpal-ali': {
    src: turpalAliIbragimovImage,
    alt: 'Турпал-Али Ибрагимов',
    sourceName: 'Официальный профиль на сайте Чеченского регионального отделения «Единой России»',
    sourceUrl: 'https://chechen.er.ru/person/820f4313-88a7-4c81-a6cb-d9e451e8ba2e',
    category: 'leadership',
    usageStatus: 'requires-approval',
    isVerified: true,
  },
  'kagermanov-rustam': {
    src: rustamKagermanovImage,
    alt: 'Рустам Кагерманов во время рабочей поездки',
    sourceName: 'Публикация Всероссийской федерации самбо «Самбо в школу»',
    sourceUrl: 'https://www.sambo.ru/press/news/2022/9382/',
    category: 'leadership',
    usageStatus: 'requires-approval',
    isVerified: true,
  },
}

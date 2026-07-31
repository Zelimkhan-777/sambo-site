import heroImage from "../assets/images/optimized/hero/sambo-hero.jpg";
import hasmagomedDikievImage from "../assets/images/optimized/champions-hasmagomed-dikiev.jpg";
import adlanBisultanovImage from "../assets/images/optimized/champions-adlan-bisultanov.jpg";
import magomedEmiSaidulkhanovImage from "../assets/images/optimized/champions-magomed-emi-saidulkhanov.jpg";
import sheikhMansurImage from "../assets/images/optimized/champions-sheikh-mansur.jpg";
import rustamKagermanovImage from "../assets/images/optimized/leadership/rustam-kagermanov.jpg";
import turpalAliIbragimovImage from "../assets/images/optimized/leadership/turpal-ali-ibragimov.jpg";
import newsImage01 from "../assets/images/optimized/news/grozny-skfo-01.jpg";
import newsImage02 from "../assets/images/optimized/news/grozny-skfo-02.jpg";
import newsImage03 from "../assets/images/optimized/news/grozny-skfo-03.jpg";
import sambokids from "../assets/images/optimized/hero/sambokids.jpg";
import sambo01 from "../assets/images/optimized/hero/sambo01.jpg";
import sambo02 from "../assets/images/optimized/hero/sambo02.jpg";
import sambo03 from "../assets/images/optimized/hero/sambo03.jpg";
import shaliTrainingImage from "../assets/images/optimized/hero/shali-training-01.jpg";
import shaliCampOfficialImage from "../assets/images/optimized/hero/shali-camp-official.jpg";

const samboArchiveUrl = "https://www.sambo.ru/photo/2026/4696/";
const samboSourceName = "Фотоархив Всероссийской федерации самбо";
const regionalNewsUrl = "https://sambo.ru/press/news/2022/9762/";
const regionalNewsSourceName =
  "Всероссийская федерация самбо: новость о Первенстве СКФО";

export const heroMedia = {
  id: "sambokids",
  src: sambokids,
  alt: "Спортсмены во время поединка по самбо",
  sourceName: samboSourceName,
  sourceUrl: samboArchiveUrl,
  category: "hero",
  usageStatus: "requires-approval",
  isVerified: true,
};

export const heroSlides = [
  {
    ...heroMedia,
    caption: "Растим подрастающее поколение спортсменов",
  },

  {
    id: "sambo03",
    src: sambo03,
    alt: "Чемпионы мирового уровня",
    caption: "Чемпионы мирового уровня",
    sourceName: "Всероссийская федерация самбо: сборы по самбо в Шали",
    sourceUrl: "https://sambo.ru/press/news/2024/11003/",
    category: "hero",
    usageStatus: "requires-approval",
    isVerified: true,
  },

  {
    id: "grozny-skfo-action",
    src: sambo01,
    alt: "Спортсмены во время соревнований по самбо в Шали",
    caption: "Результат упорной работы",
    sourceName: regionalNewsSourceName,
    sourceUrl: regionalNewsUrl,
    category: "hero",
    usageStatus: "requires-approval",
    isVerified: true,
  },
  {
    id: "grozny-skfo-award",
    src: newsImage03,
    alt: "Награждение спортсмена на соревнованиях по самбо в Грозном",
    caption: "Лучший момент для каждого спорстмена",
    sourceName: regionalNewsSourceName,
    sourceUrl: regionalNewsUrl,
    category: "hero",
    usageStatus: "requires-approval",
    isVerified: true,
  },
];

export const newsMedia = [
  {
    id: "sambo-news-01",
    src: newsImage01,
    alt: "Церемония награждения на соревнованиях по самбо",
    sourceName: regionalNewsSourceName,
    sourceUrl: regionalNewsUrl,
    category: "news",
    usageStatus: "requires-approval",
    isVerified: true,
  },
  {
    id: "sambo-news-02",
    src: newsImage02,
    alt: "Спортсмен во время соревнований по самбо",
    sourceName: regionalNewsSourceName,
    sourceUrl: regionalNewsUrl,
    category: "news",
    usageStatus: "requires-approval",
    isVerified: true,
  },
  {
    id: "sambo-news-03",
    src: newsImage03,
    alt: "Спортсмены во время поединка по самбо",
    sourceName: regionalNewsSourceName,
    sourceUrl: regionalNewsUrl,
    category: "news",
    usageStatus: "requires-approval",
    isVerified: true,
  },
];

export const activityMedia = {
  "sport-sambo": {
    src: newsImage01,
    alt: "Поединок спортсменов на соревнованиях по самбо в Грозном",
  },
  "combat-sambo": {
    src: heroImage,
    alt: "Спортсмены во время поединка по самбо",
  },
  "youth-sport": {
    src: shaliCampOfficialImage,
    alt: "Юные самбисты на сборе в Шали",
    sourceName: "Всероссийская федерация самбо",
    sourceUrl: "https://sambo.ru/press/news/2024/11003/",
  },
  reserve: {
    src: shaliTrainingImage,
    alt: "Спортсмены на тренировочном сборе по самбо",
  },
  events: {
    src: newsImage02,
    alt: "Участники соревнований по самбо в Грозном",
  },
  judging: {
    src: newsImage03,
    alt: "Церемония награждения на соревнованиях по самбо",
  },
};

export const leadershipMedia = {
  "ibragimov-turpal-ali": {
    src: turpalAliIbragimovImage,
    alt: "Турпал-Али Ибрагимов",
    sourceName:
      "Официальный профиль на сайте Чеченского регионального отделения «Единой России»",
    sourceUrl:
      "https://chechen.er.ru/person/820f4313-88a7-4c81-a6cb-d9e451e8ba2e",
    category: "leadership",
    usageStatus: "requires-approval",
    isVerified: true,
  },
  "kagermanov-rustam": {
    src: rustamKagermanovImage,
    alt: "Рустам Кагерманов во время рабочей поездки",
    sourceName: "Публикация Всероссийской федерации самбо «Самбо в школу»",
    sourceUrl: "https://www.sambo.ru/press/news/2022/9382/",
    category: "leadership",
    usageStatus: "requires-approval",
    isVerified: true,
  },
};

export const championsMedia = {
  "dikiev-hasmagomed": {
    src: hasmagomedDikievImage,
    alt: "Хасмагомед Дикиев — чемпион мира по самбо",
    sourceName: "NewArgun, фото из биографического материала",
    sourceUrl:
      "https://checheninfo.ru/291074-chechnja-dikiev-hasmagomed-magomedovich.html",
    category: "champions",
    usageStatus: "requires-approval",
    isVerified: true,
  },
  "khabibulaev-sheikh-mansur": {
    src: sheikhMansurImage,
    alt: "Шейх-Мансур Хабибулаев с золотой медалью",
    sourceName: "Международная федерация самбо, ФИАС",
    sourceUrl:
      "https://sambo.sport/ru/news/sheykh-mansur-khabibulaev-bez-uvazheniya-v-sporte-nikuda/",
    category: "champions",
    usageStatus: "requires-approval",
    isVerified: true,
  },
  "saidulkhanov-magomed-emi": {
    src: magomedEmiSaidulkhanovImage,
    alt: "Магомед-Эми Сайдулханов в форме самбо с медалью",
    sourceName: "Грозный-информ",
    sourceUrl: "https://www.grozny-inform.ru/news/health/123353/",
    category: "champions",
    usageStatus: "requires-approval",
    isVerified: true,
  },
  "bisultanov-adlan": {
    src: adlanBisultanovImage,
    alt: "Адлан Бисултанов на соревнованиях по самбо",
    sourceName: "Московский союз ветеранов дзюдо и самбо",
    sourceUrl:
      "https://roo-msvds.ru/personalities/bisultanov-adlan-delimbekovich/",
    category: "champions",
    usageStatus: "requires-approval",
    isVerified: true,
  },
};

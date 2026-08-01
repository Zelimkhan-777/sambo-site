import hasmagomedDikievAltImage from "../assets/images/optimized/champions-hasmagomed-dikiev-alt.png";
import adlanBisultanovImage from "../assets/images/optimized/champions-adlan-bisultanov.jpg";
import samboChampsImage from "../assets/images/optimized/samboChamps.webp";
import sheikhMansurImage from "../assets/images/optimized/champions-sheikh-mansur.jpg";
import rustamKagermanovImage from "../assets/images/raw/leadership/rustam-kagermanov-01.jpeg";
import turpalAliIbragimovImage from "../assets/images/raw/leadership/turpal-ali-ibragimov.jpg";
import newsImage03 from "../assets/images/optimized/news/grozny-skfo-03.jpg";
import activitySportImage from "../assets/images/optimized/activity/sport-sambo-2026.jpg";
import activityCombatImage from "../assets/images/optimized/activity/combat-sambo-2025.jpg";
import activityYouthImage from "../assets/images/optimized/activity/youth-sambo-2026.jpg";
import activityReserveImage from "../assets/images/optimized/activity/reserve-sambo-2026.jpg";
import activityEventsImage from "../assets/images/optimized/activity/events-sambo-2026.jpg";
import activityJudgingImage from "../assets/images/optimized/activity/judging-sambo-2024.jpg";
import sambokids from "../assets/images/optimized/hero/sambokids.jpg";
import sambo01 from "../assets/images/optimized/hero/sambo01.jpg";
import sambo03 from "../assets/images/optimized/hero/sambo03.jpg";

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

export const activityMedia = {
  "sport-sambo": {
    src: activitySportImage,
    alt: "Команды участников соревнований по спортивному самбо",
    sourceName: "Всероссийская федерация самбо",
    sourceUrl: "https://www.sambo.ru/press/news/2026/12081/",
  },
  "combat-sambo": {
    src: activityCombatImage,
    alt: "Спортсменки на чемпионате России по боевому самбо",
    sourceName: "Всероссийская федерация самбо",
    sourceUrl: "https://www.sambo.ru/photo/2025/4404/",
  },
  "youth-sport": {
    src: activityYouthImage,
    alt: "Юные спортсмены на командном турнире по боевому самбо",
    sourceName: "Всероссийская федерация самбо",
    sourceUrl: "https://www.sambo.ru/press/news/2026/12020/",
  },
  reserve: {
    src: activityReserveImage,
    alt: "Спортсмены на тренировочном сборе по самбо",
    sourceName: "Всероссийская федерация самбо",
    sourceUrl: "https://www.sambo.ru/press/news/2026/11944/",
  },
  events: {
    src: activityEventsImage,
    alt: "Арена во время крупного соревнования по самбо",
    sourceName: "Всероссийская федерация самбо",
    sourceUrl: "https://www.sambo.ru/press/news/2026/12073/",
  },
  judging: {
    src: activityJudgingImage,
    alt: "Судьи на семинаре по самбо",
    sourceName: "Всероссийская федерация самбо",
    sourceUrl: "https://sambo.ru/press/news/2024/10831/",
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
    src: hasmagomedDikievAltImage,
    alt: "Хасмагомед Дикиев — чемпион мира по самбо",
    sourceName: "NewArgun, фото из биографического материала",
    sourceUrl:
      "https://checheninfo.ru/306447-chechnja-pervyj-chechenec-stavshij-chempionom-mira-po-sambo-hasmagomed-dikiev.html",
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
    src: samboChampsImage,
    alt: "Магомед-Эми Сайдулханов в форме самбо с медалью",
    sourceName: "Грозный-информ",
    sourceUrl:
      "https://checheninfo.ru/265991-chechnja-magomed-jemi-sajdulhanov-stal-chempionom-mira-po-sambo.html",
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

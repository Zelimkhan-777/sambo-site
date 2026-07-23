import Button from '../components/ui/Button'
import EmptyState from '../components/common/EmptyState'
import HeroSlider from '../components/common/HeroSlider'
import MediaPlaceholder, { Users } from '../components/common/MediaPlaceholder'
import NewsCard from '../components/common/NewsCard'
import Section from '../components/common/Section'
import SectionHeading from '../components/common/SectionHeading'
import { federationInfo, federationPreview } from '../data/federation'
import { coaches, leadership } from '../data/coaches'
import { heroSlides, leadershipMedia } from '../data/media'
import { news } from '../data/news'
import { sortNewsByDate } from '../utils/news'

function HeroSection() {
  return (
    <Section className="pt-2">
      <HeroSlider slides={heroSlides}>
          <div className="max-w-2xl">
            <h1 className="max-w-xl text-5xl font-semibold leading-[0.92] tracking-[-0.02em] sm:text-6xl lg:text-7xl">
              Сила. Дисциплина. Традиции.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/80 sm:text-lg">
              Федерация развивает спортивное и боевое самбо в Чеченской
              Республике, поддерживает подготовку спортсменов и объединяет
              работу тренеров, судей и профильных спортивных инициатив.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/about">О Федерации</Button>
              <Button to="/news" variant="secondary" className="border-white/50 bg-white/10 text-white hover:border-white hover:bg-white/20">
                Последние новости
              </Button>
            </div>
          </div>
      </HeroSlider>
    </Section>
  )
}

function AboutPreview() {
  return (
    <Section className="pt-16 sm:pt-20">
      <SectionHeading
        eyebrow={federationPreview.eyebrow}
        title={federationPreview.title}
        description={federationPreview.description}
        action={
          <Button to="/about" variant="text">
            Подробнее
          </Button>
        }
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6">
          <p className="text-sm leading-8 text-[color:var(--muted-foreground)]">
            {federationInfo.fullName}
          </p>
          <p className="mt-6 text-sm leading-8 text-[color:var(--muted-foreground)]">
            Регион работы: {federationInfo.region}.
          </p>
        </div>

        <ul className="grid gap-3">
          {federationPreview.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-4 border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-5"
            >
              <span
                aria-hidden="true"
                className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[color:var(--accent-red)]"
              />
              <span className="text-sm leading-7 text-[color:var(--foreground)]">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

function LatestNews() {
  const latestNews = sortNewsByDate(news).slice(0, 3)

  return (
    <Section className="pt-16 sm:pt-20">
      <SectionHeading
        eyebrow="Новости"
        title="Последние материалы"
        description="Секция подготовлена для публикации подтверждённых новостей федерации. Пока в ней отображаются временные демонстрационные записи с явной пометкой."
        action={
          <Button to="/news" variant="text">
            Все новости
          </Button>
        }
      />

      {latestNews.length ? (
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {latestNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-8"
          title="Материалы готовятся к публикации"
          description="После проверки и подготовки официальных публикаций в этом разделе появятся последние новости федерации."
        />
      )}
    </Section>
  )
}

function LeadershipPreview() {
  const people = [...leadership, ...coaches].slice(0, 4)

  return (
    <Section className="pt-16 sm:pt-20">
      <SectionHeading
        eyebrow="Руководство и тренеры"
        title="Подтверждённые представители федерации"
        description="На главной странице показаны только базовые сведения: имя и должность без расширенных биографий и неподтверждённых достижений."
        action={
          <Button to="/coaches" variant="text">
            Весь состав
          </Button>
        }
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {people.map((person) => (
          <article
            key={person.id}
            className="border-l-2 border-[color:var(--border-strong)] bg-[color:var(--surface)] p-5 transition-colors duration-200 hover:border-[color:var(--accent-red)]"
          >
            {leadershipMedia[person.id] ? (
              <img
                alt={leadershipMedia[person.id].alt}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                src={leadershipMedia[person.id].src}
              />
            ) : (
              <MediaPlaceholder compact icon={Users} label="Фотография представителя готовится" />
            )}
            <h3 className="mt-5 text-lg font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
              {person.name}
            </h3>
            <p className="mt-2 text-sm leading-7 text-[color:var(--muted-foreground)]">
              {person.role}
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}

function ContactCTA() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
              Контакты
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
              Для спортсменов, родителей, тренеров и партнёров
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-[color:var(--muted-foreground)]">
              Федерация открыта для рабочих обращений, уточнения информации и
              взаимодействия по вопросам развития самбо в регионе.
            </p>
          </div>

          <div className="grid gap-4">
            <a
              href={`tel:${federationInfo.phone.replace(/\D/g, '')}`}
              className="border border-[color:var(--border)] bg-[color:var(--background)] px-5 py-4 text-sm transition-colors duration-200 hover:border-[color:var(--border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface)]"
            >
              <span className="block text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                Телефон
              </span>
              <span className="mt-2 block text-base font-medium text-[color:var(--foreground)]">
                {federationInfo.phone}
              </span>
            </a>

            <a
              href={`mailto:${federationInfo.email}`}
              className="border border-[color:var(--border)] bg-[color:var(--background)] px-5 py-4 text-sm transition-colors duration-200 hover:border-[color:var(--border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface)]"
            >
              <span className="block text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
                Email
              </span>
              <span className="mt-2 block break-all text-base font-medium text-[color:var(--foreground)]">
                {federationInfo.email}
              </span>
            </a>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={`mailto:${federationInfo.email}`}>Связаться</Button>
              <Button to="/about" variant="secondary">
                Подробнее о федерации
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <LatestNews />
      <LeadershipPreview />
      <ContactCTA />
    </>
  )
}

export default HomePage

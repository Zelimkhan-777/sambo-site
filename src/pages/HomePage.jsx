import Button from '../components/ui/Button'
import EmptyState from '../components/common/EmptyState'
import NewsCard from '../components/common/NewsCard'
import Section from '../components/common/Section'
import SectionHeading from '../components/common/SectionHeading'
import { activityDirections, federationInfo, federationPreview } from '../data/federation'
import { coaches, leadership } from '../data/coaches'
import { news } from '../data/news'

function HeroSection() {
  return (
    <Section className="pt-2">
      <div className="grid gap-6 border border-[color:var(--border)] bg-[color:var(--surface)] p-6 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:p-10">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
              Федерация самбо Чеченской Республики
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.02]">
              Сила. Дисциплина. Традиции.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--muted-foreground)] sm:text-lg">
              Федерация развивает спортивное и боевое самбо в Чеченской
              Республике, поддерживает подготовку спортсменов и объединяет
              работу тренеров, судей и профильных спортивных инициатив.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/about">О Федерации</Button>
            <Button to="/news" variant="secondary">
              Последние новости
            </Button>
          </div>
        </div>

        <div className="relative min-h-[320px] overflow-hidden border border-[color:var(--border)] bg-[color:var(--background)] p-5">
          <div className="flex h-full flex-col justify-between">
            <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
              <span>Hero Placeholder</span>
              <span>Image Pending</span>
            </div>

            <div className="grid gap-3">
              <div className="h-24 border border-[color:var(--border)] bg-[color:var(--surface)]" />
              <div className="grid grid-cols-[1.15fr_0.85fr] gap-3">
                <div className="h-32 border border-[color:var(--border)] bg-[color:var(--surface)]" />
                <div className="h-32 border border-[color:var(--border)] bg-[color:var(--surface-strong)]" />
              </div>
            </div>

            <div className="max-w-sm border-t border-[color:var(--border)] pt-4">
              <p className="text-sm leading-7 text-[color:var(--muted-foreground)]">
                Подходящее изображение для hero будет добавлено после проверки
                источника и подготовки локального материала.
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute right-5 top-5 h-14 w-14 border border-[color:var(--accent-red)]" />
        </div>
      </div>
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

function ActivityDirections() {
  return (
    <Section className="pt-16 sm:pt-20">
      <SectionHeading
        eyebrow="Направления"
        title="Ключевые направления деятельности"
        description="Главная страница показывает основные области работы федерации без подмены их статистикой или неподтверждёнными достижениями."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {activityDirections.map((direction) => (
          <article
            key={direction.id}
            className="border border-[color:var(--border)] bg-[color:var(--background)] p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-[color:var(--accent-blue)]">
                {direction.number}
              </span>
              <div className="h-px flex-1 bg-[color:var(--border)]" />
            </div>
            <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
              {direction.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
              {direction.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}

function LatestNews() {
  const latestNews = [...news]
    .sort((firstItem, secondItem) => {
      return new Date(secondItem.date) - new Date(firstItem.date)
    })
    .slice(0, 3)

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
            className="border border-[color:var(--border)] bg-[color:var(--surface)] p-5"
          >
            <div className="flex h-14 w-14 items-center justify-center border border-[color:var(--border-strong)] bg-[color:var(--background)] text-sm font-semibold tracking-[0.14em] text-[color:var(--foreground)]">
              {person.initials}
            </div>
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
      <ActivityDirections />
      <LatestNews />
      <LeadershipPreview />
      <ContactCTA />
    </>
  )
}

export default HomePage

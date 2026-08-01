import Button from "../components/ui/Button";
import EmptyState from "../components/common/EmptyState";
import HeroSlider from "../components/common/HeroSlider";
import MediaPlaceholder from "../components/common/MediaPlaceholder";
import NewsCard from "../components/common/NewsCard";
import Section from "../components/common/Section";
import SectionHeading from "../components/common/SectionHeading";
import { federationInfo, federationPreview } from "../data/federation";
import { champions } from "../data/champions";
import { grantProjects } from "../data/grants";
import { activityMedia, championsMedia, heroSlides } from "../data/media";
import { news } from "../data/news";
import { sortNewsByDate } from "../utils/news";
import { Award, ShieldCheck, Trophy, UsersRound } from "lucide-react";

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
            Республике, поддерживает подготовку спортсменов и объединяет работу
            тренеров, судей и профильных спортивных инициатив.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/about">О Федерации</Button>
            <Button
              to="/news"
              variant="secondary"
              className="border-white/50 bg-white/10 text-white hover:border-white hover:bg-white/20"
            >
              Последние новости
            </Button>
          </div>
        </div>
      </HeroSlider>
    </Section>
  );
}

function AboutPreview() {
  const pointIcons = [ShieldCheck, UsersRound, Trophy]

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

      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="relative min-h-[360px] overflow-hidden bg-[color:var(--foreground)] p-6 text-white sm:p-8">
          <img
            src={activityMedia['youth-sport'].src}
            alt={activityMedia['youth-sport'].alt}
            className="absolute inset-0 h-full w-full object-cover opacity-75"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
          <div className="relative flex min-h-[312px] flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <span className="border border-white/40 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/80">
                Федерация / 01
              </span>
              <ShieldCheck aria-hidden="true" className="text-white/80" size={25} strokeWidth={1.4} />
            </div>
            <div className="max-w-md">
              <p className="text-xs uppercase tracking-[0.18em] text-white/65">Система развития</p>
              <p className="mt-3 text-2xl font-medium leading-tight text-white sm:text-3xl">
                От первых тренировок до большой спортивной сцены.
              </p>
            </div>
          </div>
          <div className="relative hidden">
          <p className="text-sm leading-8 text-[color:var(--muted-foreground)]">
            {federationInfo.fullName}
          </p>
          <p className="mt-6 text-sm leading-8 text-[color:var(--muted-foreground)]">
            Регион работы: {federationInfo.region}.
          </p>
        </div>

        </div>

        <ul className="grid gap-5 lg:content-center">
          {federationPreview.points.map((point, index) => {
            const Icon = pointIcons[index]

            return (
            <li
              key={point}
              className="group flex items-start gap-4 border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-6 transition-colors duration-200 hover:border-[color:var(--border-strong)]"
            >
              <Icon aria-hidden="true" className="mt-0.5 shrink-0 text-[color:var(--accent-red)] transition-transform duration-200 group-hover:scale-110" size={22} strokeWidth={1.5} />
              <span className="text-sm leading-7 text-[color:var(--foreground)]">{point}</span>
            </li>
            )
          })}
        </ul>
      </div>
    </Section>
  );
}

function LatestNews() {
  const latestNews = sortNewsByDate(news).slice(0, 3);

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
  );
}

function ChampionsPreview() {
  return (
    <Section className="pt-16 sm:pt-20">
      <SectionHeading
        eyebrow="Наши чемпионы"
        title="Имена, которыми гордится Чеченская Республика"
        description="Выдающиеся представители чеченского самбо, чьи чемпионские титулы подтверждены профильными источниками."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {champions.map((champion) => (
          <article
            key={champion.id}
            className="grid gap-5 border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] sm:p-6"
          >
            {championsMedia[champion.id] ? (
              <img
                alt={championsMedia[champion.id].alt}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                src={championsMedia[champion.id].src}
              />
            ) : (
              <MediaPlaceholder
                compact
                icon={Award}
                label="Фотография чемпиона готовится"
              />
            )}
            <div>
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                {champion.name}
              </h3>
              <p className="mt-4 text-sm font-medium leading-7 text-[color:var(--foreground)]">
                {champion.titles}
              </p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
                {champion.distinction}
              </p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function GrantsProjectsPreview() {
  return (
    <Section id="grants" className="scroll-mt-28 pt-16 sm:pt-20">
      <SectionHeading
        eyebrow="Поддержка и развитие"
        title="Гранты и социальные проекты"
        description="Развиваем самбо, поддерживаем молодёжь и создаём возможности для спортивного роста"
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {grantProjects.map((project) => (
          <article
            key={project.id}
            className="flex h-full flex-col border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6"
          >
            <div className="flex min-h-40 items-center justify-center border border-[color:var(--border)] bg-white p-4 sm:min-h-44 dark:bg-white">
              <img
                src={project.logo}
                alt={project.logoAlt}
                className="max-h-32 w-auto max-w-full object-contain sm:max-h-36"
                loading="lazy"
              />
            </div>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
              {project.organization}
            </p>
            <h3 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.03em] text-[color:var(--foreground)]">
              {project.title}
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
              {project.description.split('\n\n').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
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
              href={`tel:${federationInfo.phone.replace(/\D/g, "")}`}
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
  );
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <LatestNews />
      <ChampionsPreview />
      <GrantsProjectsPreview />
      <ContactCTA />
    </>
  );
}

export default HomePage;

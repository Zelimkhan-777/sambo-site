import { useEffect } from 'react'
import Button from '../components/ui/Button'
import Section from '../components/common/Section'
import SectionHeading from '../components/common/SectionHeading'
import MediaPlaceholder, { Users } from '../components/common/MediaPlaceholder'
import { activityDirections, federationInfo, federationPreview } from '../data/federation'
import { leadership } from '../data/coaches'
import { activityMedia, leadershipMedia } from '../data/media'

function AboutHero() {
  return (
    <Section className="pt-2 sm:pt-4">
      <div className="grid gap-8 border border-[color:var(--border)] bg-[color:var(--surface)] p-6 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:p-10">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
            О Федерации
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-5xl sm:leading-[1.05]">
            Развитие самбо в Чеченской Республике
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--muted-foreground)] sm:text-lg">
            {federationPreview.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/coaches">Руководство и тренеры</Button>
          </div>
        </div>

        <div className="flex min-h-64 flex-col justify-between border border-[color:var(--border)] bg-[color:var(--background)] p-6">
          <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
            <span>Организация</span>
            <span aria-hidden="true" className="h-2 w-2 bg-[color:var(--accent-red)]" />
          </div>
          <div>
            <div className="h-px w-16 bg-[color:var(--accent-blue)]" />
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted-foreground)]">
              Информация на странице основана на подтверждённых данных источника федерации.
            </p>
          </div>
        </div>
      </div>
    </Section>
  )
}

function FederationFacts() {
  const facts = [
    { label: 'Полное название', value: federationInfo.fullName },
    { label: 'Регион', value: federationInfo.region },
    { label: 'Адрес', value: federationInfo.address },
  ]

  return (
    <Section className="pt-16 sm:pt-20">
      <SectionHeading
        eyebrow="Основные сведения"
        title="Федерация самбо Чеченской Республики"
        description="Региональная физкультурно-спортивная общественная организация, развивающая спортивное и боевое самбо в регионе."
      />
      <dl className="mt-8 grid gap-4 lg:grid-cols-3">
        {facts.map((fact) => (
          <div key={fact.label} className="border border-[color:var(--border)] bg-[color:var(--surface)] p-5">
            <dt className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">
              {fact.label}
            </dt>
            <dd className="mt-4 text-sm leading-7 text-[color:var(--foreground)]">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

function ActivitySection() {
  return (
    <Section className="pt-16 sm:pt-20">
      <SectionHeading
        eyebrow="Цели и задачи"
        title="Основные направления работы"
        description="На странице представлены направления, заявленные в материалах проекта, без неподтверждённых показателей и достижений."
      />
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {activityDirections.map((direction) => (
          <article key={direction.id} className="group overflow-hidden border border-[color:var(--border)] bg-[color:var(--surface)] transition-colors duration-200 hover:border-[color:var(--border-strong)]">
            <div className="relative aspect-[16/9] overflow-hidden bg-[color:var(--surface-strong)]">
              <img
                alt={activityMedia[direction.id].alt}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                loading="lazy"
                src={activityMedia[direction.id].src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="absolute bottom-4 left-5 text-xs font-semibold uppercase tracking-[0.2em] text-white">{direction.number}</span>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">{direction.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted-foreground)]">{direction.description}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

function LeadershipSection() {
  return (
    <Section className="pt-16 sm:pt-20">
      <SectionHeading
        eyebrow="Руководство"
        title="Представители федерации"
        description="Фамилии и должности приведены по подтверждённому источнику. Биографии и достижения будут добавлены только после отдельной проверки."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {leadership.map((person) => (
          <article key={person.id} className="border border-[color:var(--border)] bg-[color:var(--surface)] p-5 sm:p-6">
            {leadershipMedia[person.id] ? (
              <img
                alt={leadershipMedia[person.id].alt}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                src={leadershipMedia[person.id].src}
              />
            ) : null}
            <div className="mt-5 flex items-start gap-4">
              {!leadershipMedia[person.id] ? (
                <MediaPlaceholder compact icon={Users} label="Фотография представителя готовится" />
              ) : null}
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                  {person.name}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[color:var(--muted-foreground)]">{person.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

function ContactsSection() {
  return (
    <Section className="py-16 sm:py-20">
      <div className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6 sm:p-8 lg:p-10">
        <SectionHeading
          eyebrow="Контакты"
          title="Связаться с федерацией"
          description="Официальные контактные данные Федерации самбо Чеченской Республики."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <a
            className="border border-[color:var(--border)] bg-[color:var(--background)] p-5 transition-colors hover:border-[color:var(--border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)]"
            href={`tel:${federationInfo.phone.replace(/\D/g, '')}`}
          >
            <span className="block text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">Телефон</span>
            <span className="mt-3 block text-base font-medium text-[color:var(--foreground)]">{federationInfo.phone}</span>
          </a>
          <a
            className="border border-[color:var(--border)] bg-[color:var(--background)] p-5 transition-colors hover:border-[color:var(--border-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)]"
            href={`mailto:${federationInfo.email}`}
          >
            <span className="block text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted-foreground)]">Email</span>
            <span className="mt-3 block break-all text-base font-medium text-[color:var(--foreground)]">{federationInfo.email}</span>
          </a>
        </div>
      </div>
    </Section>
  )
}

function AboutPage() {
  useEffect(() => {
    document.title = 'О Федерации | Федерация самбо Чеченской Республики'
  }, [])

  return (
    <>
      <AboutHero />
      <FederationFacts />
      <ActivitySection />
      <LeadershipSection />
      <ContactsSection />
    </>
  )
}

export default AboutPage

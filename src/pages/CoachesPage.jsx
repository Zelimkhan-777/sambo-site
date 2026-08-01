import MediaPlaceholder, { Users } from '../components/common/MediaPlaceholder';
import Section from '../components/common/Section';
import SectionHeading from '../components/common/SectionHeading';
import { coaches } from '../data/coaches';
import { coachesMedia } from '../data/coachesMedia';

function CoachCard({ coach }) {
  const media = coachesMedia[coach.id];

  return (
    <article className="overflow-hidden border border-[color:var(--border)] bg-[color:var(--surface)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--surface-strong)]">
        {media.src ? (
          <img
            src={media.src}
            alt={media.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <MediaPlaceholder label="Фотография готовится к публикации" icon={Users} />
        )}
      </div>
      <div className="p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
          {coach.role}
        </p>
        <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
          {coach.name}
        </h2>
        {coach.honors ? (
          <p className="mt-4 text-sm font-medium leading-6 text-[color:var(--foreground)]">
            {coach.honors}
          </p>
        ) : null}
        <p className="mt-4 text-sm leading-7 text-[color:var(--muted-foreground)]">
          {coach.description}
        </p>
      </div>
    </article>
  );
}

function CoachesPage() {
  return (
    <>
      <Section className="pt-2 sm:pt-4">
        <div className="border border-[color:var(--border)] bg-[color:var(--surface)] p-6 sm:p-8 lg:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
            Тренеры
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-5xl sm:leading-[1.05]">
            Тренеры, которые воспитывают чемпионов
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--muted-foreground)] sm:text-lg">
            Опыт, характер и преданность спорту — основа чеченской школы самбо
          </p>
        </div>
      </Section>

      <Section className="pt-16 pb-16 sm:pt-20 sm:pb-20">
        <SectionHeading
          eyebrow="Тренерский состав"
          title="Школа, в которой растут победители"
          description="Наставники Федерации передают спортсменам спортивную культуру, дисциплину и опыт больших соревнований."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {coaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </Section>
    </>
  );
}

export default CoachesPage;

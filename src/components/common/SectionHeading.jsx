function SectionHeading({ eyebrow, title, description, action, as = 'h2' }) {
  const Heading = as

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="border-l-2 border-[color:var(--accent-red)] pl-3 text-sm font-medium tracking-[0.02em] text-[color:var(--muted-foreground)]">
            {eyebrow}
          </p>
        ) : null}
        <Heading className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.035em] text-[color:var(--foreground)] sm:text-4xl">
          {title}
        </Heading>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--muted-foreground)]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export default SectionHeading

function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-5 border-b border-[color:var(--border)] pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)] sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--muted-foreground)]">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}

export default SectionHeading

function EmptyState({ title, description, className = '' }) {
  return (
    <div
      className={[
        'border border-dashed border-[color:var(--border-strong)] bg-[color:var(--surface)] px-6 py-8 text-left',
        className,
      ].join(' ')}
    >
      <h3 className="text-lg font-semibold tracking-[-0.02em] text-[color:var(--foreground)]">
        {title}
      </h3>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--muted-foreground)]">
        {description}
      </p>
    </div>
  )
}

export default EmptyState

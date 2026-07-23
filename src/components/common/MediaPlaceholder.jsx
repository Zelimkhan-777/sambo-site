import { ImageOff, Users } from 'lucide-react'

function MediaPlaceholder({
  label = 'Фотография готовится к публикации',
  icon: Icon = ImageOff,
  className = '',
  compact = false,
}) {
  return (
    <div
      className={[
        'relative flex overflow-hidden border border-[color:var(--border)] bg-[color:var(--surface-strong)]',
        compact ? 'min-h-28 items-center gap-4 px-5 py-4' : 'min-h-56 flex-col justify-between p-6 sm:p-8',
        className,
      ].join(' ')}
      role="img"
      aria-label={label}
    >
      <div aria-hidden="true" className="absolute right-4 top-4 h-10 w-10 border border-[color:var(--border-strong)]" />
      <div className={compact ? 'flex h-12 w-12 shrink-0 items-center justify-center border border-[color:var(--border-strong)] bg-[color:var(--background)] text-[color:var(--accent-red)]' : 'flex h-16 w-16 items-center justify-center border border-[color:var(--border-strong)] bg-[color:var(--background)] text-[color:var(--accent-red)]'}>
        <Icon aria-hidden="true" size={compact ? 21 : 28} strokeWidth={1.4} />
      </div>
      <div className={compact ? '' : 'max-w-sm'}>
        <div className="h-px w-12 bg-[color:var(--accent-red)]" />
        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-[color:var(--muted-foreground)]">{label}</p>
      </div>
    </div>
  )
}

export default MediaPlaceholder
export { Users }

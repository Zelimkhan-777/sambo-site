function SkeletonBlock({ className = '' }) {
  return <span className={`block bg-[color:var(--surface-strong)] ${className}`} />
}

function LoadingStatus({ label, children, className = '' }) {
  return (
    <div className={className} role="status" aria-label={label}>
      <span className="sr-only">{label}</span>
      <div aria-hidden="true" className="motion-safe:animate-pulse">
        {children}
      </div>
    </div>
  )
}

export function RouteSkeleton() {
  return (
    <LoadingStatus
      className="mx-auto w-full max-w-7xl px-4 py-2 sm:px-6"
      label="Загрузка страницы"
    >
      <SkeletonBlock className="h-3 w-28" />
      <SkeletonBlock className="mt-4 h-10 w-full max-w-md" />
      <SkeletonBlock className="mt-4 h-4 w-full max-w-2xl" />
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="border border-[color:var(--border)]">
            <SkeletonBlock className="aspect-[16/10] w-full" />
            <div className="space-y-4 p-5">
              <SkeletonBlock className="h-3 w-24" />
              <SkeletonBlock className="h-6 w-4/5" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </LoadingStatus>
  )
}

export function CardGridSkeleton({ count = 3, className = '' }) {
  return (
    <LoadingStatus className={className} label="Загрузка материалов">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="border border-[color:var(--border)]">
            <SkeletonBlock className="aspect-[16/10] w-full" />
            <div className="space-y-4 p-5">
              <SkeletonBlock className="h-3 w-24" />
              <SkeletonBlock className="h-6 w-4/5" />
              <SkeletonBlock className="h-4 w-full" />
              <SkeletonBlock className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </LoadingStatus>
  )
}

export function DocumentListSkeleton({ className = '' }) {
  return (
    <LoadingStatus className={className} label="Загрузка документов">
      <div className="divide-y divide-[color:var(--border)] border-y border-[color:var(--border)]">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex items-center gap-4 py-5">
            <SkeletonBlock className="h-11 w-11 shrink-0" />
            <div className="min-w-0 flex-1 space-y-3">
              <SkeletonBlock className="h-5 w-full max-w-xl" />
              <SkeletonBlock className="h-3 w-48 max-w-full" />
            </div>
            <SkeletonBlock className="hidden h-11 w-28 shrink-0 sm:block" />
          </div>
        ))}
      </div>
    </LoadingStatus>
  )
}

export function DetailSkeleton() {
  return (
    <LoadingStatus className="mx-auto max-w-4xl" label="Загрузка материала">
      <SkeletonBlock className="h-3 w-36" />
      <SkeletonBlock className="mt-8 h-10 w-full max-w-3xl" />
      <SkeletonBlock className="mt-3 h-10 w-3/5" />
      <SkeletonBlock className="mt-8 aspect-video w-full" />
      <div className="mt-8 max-w-3xl space-y-4">
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-4/5" />
      </div>
    </LoadingStatus>
  )
}

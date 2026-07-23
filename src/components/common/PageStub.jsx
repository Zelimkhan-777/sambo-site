import Container from '../ui/Container'
import { FileText } from 'lucide-react'

function PageStub({ title, description, eyebrow }) {
  return (
    <Container>
      <section className="border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-8 sm:px-8 sm:py-10">
        <div className="mb-8 flex h-16 w-16 items-center justify-center border border-[color:var(--border-strong)] bg-[color:var(--background)] text-[color:var(--accent-red)]">
          <FileText aria-hidden="true" size={28} strokeWidth={1.4} />
        </div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
          {description}
        </p>
      </section>
    </Container>
  )
}

export default PageStub

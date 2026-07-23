function PageStub({ title, description, eyebrow }) {
  return (
    <section className="space-y-4">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-neutral-500">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
        {title}
      </h1>
      <p className="max-w-2xl text-base leading-7 text-neutral-600">
        {description}
      </p>
    </section>
  )
}

export default PageStub

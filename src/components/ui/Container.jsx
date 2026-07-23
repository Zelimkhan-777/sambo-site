function Container({ as: Component = 'div', className = '', children }) {
  return (
    <Component
      className={[
        'mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10',
        className,
      ].join(' ')}
    >
      {children}
    </Component>
  )
}

export default Container

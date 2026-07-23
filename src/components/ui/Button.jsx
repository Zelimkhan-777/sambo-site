import { Link } from 'react-router-dom'

const variantClasses = {
  primary:
    'border-[color:var(--foreground)] bg-[color:var(--foreground)] text-[color:var(--background)] hover:border-[color:var(--foreground-soft)] hover:bg-[color:var(--foreground-soft)]',
  secondary:
    'border-[color:var(--border-strong)] bg-[color:var(--surface)] text-[color:var(--foreground)] hover:border-[color:var(--foreground)] hover:bg-[color:var(--surface-strong)]',
  text:
    'border-transparent bg-transparent text-[color:var(--foreground)] hover:text-[color:var(--accent-blue)]',
}

function Button({
  children,
  className = '',
  disabled = false,
  href,
  icon,
  iconPosition = 'left',
  to,
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const content = (
    <>
      {icon && iconPosition === 'left' ? (
        <span aria-hidden="true" className="shrink-0">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === 'right' ? (
        <span aria-hidden="true" className="shrink-0">
          {icon}
        </span>
      ) : null}
    </>
  )

  const sharedClassName = [
    'inline-flex min-h-11 items-center justify-center gap-2 border px-4 text-sm font-medium tracking-[0.01em] transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)] disabled:cursor-not-allowed disabled:opacity-50',
    variantClasses[variant],
    disabled ? 'pointer-events-none' : '',
    className,
  ].join(' ')

  if (to && !disabled) {
    return (
      <Link className={sharedClassName} to={to} {...props}>
        {content}
      </Link>
    )
  }

  if (href && !disabled) {
    return (
      <a className={sharedClassName} href={href} {...props}>
        {content}
      </a>
    )
  }

  if ((to || href) && disabled) {
    return (
      <span aria-disabled="true" className={sharedClassName}>
        {content}
      </span>
    )
  }

  return (
    <button className={sharedClassName} disabled={disabled} type={type} {...props}>
      {content}
    </button>
  )
}

export default Button

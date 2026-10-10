import styles from './Button.module.css'

function Button({
  href,
  variant = 'primary',
  icon,
  external = false,
  children,
  ...rest
}) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <a
      className={`${styles.button} ${styles[variant]}`}
      href={href}
      {...externalProps}
      {...rest}
    >
      {children}
      {icon}
    </a>
  )
}

export default Button
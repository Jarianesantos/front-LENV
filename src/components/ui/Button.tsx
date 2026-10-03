interface Props {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  className?: string
}

export default function Button({ children, onClick, variant = 'primary', disabled, className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variant === 'primary' ? 'btn-primary' : 'btn-secondary'} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  )
}

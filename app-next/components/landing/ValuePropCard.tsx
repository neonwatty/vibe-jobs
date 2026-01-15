interface ValuePropCardProps {
  icon: React.ReactNode
  title: string
  description: string
  accentColor?: 'primary' | 'secondary' | 'neutral'
}

export default function ValuePropCard({
  icon,
  title,
  description,
  accentColor = 'primary',
}: ValuePropCardProps) {
  const colorClasses = {
    primary: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]',
    secondary: 'bg-[var(--color-secondary)]/10 text-[var(--color-secondary)]',
    neutral: 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]',
  }

  return (
    <div className="card text-center">
      <div className={`w-16 h-16 rounded-xl ${colorClasses[accentColor]} flex items-center justify-center mx-auto mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-[var(--color-text-muted)]">{description}</p>
    </div>
  )
}

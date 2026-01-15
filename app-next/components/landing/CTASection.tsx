import Link from 'next/link'

interface CTASectionProps {
  headline: string
  description?: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
}

export default function CTASection({
  headline,
  description,
  primaryCTA,
  secondaryCTA,
}: CTASectionProps) {
  return (
    <div className="py-20 border-t border-[var(--color-border)]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-display text-2xl md:text-3xl mb-4">{headline}</h2>
        {description && (
          <p className="text-[var(--color-text-muted)] mb-8">{description}</p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={primaryCTA.href} className="btn btn-primary btn-lg w-full sm:w-auto">
            {primaryCTA.text}
          </Link>
          {secondaryCTA && (
            <Link href={secondaryCTA.href} className="btn btn-secondary btn-lg w-full sm:w-auto">
              {secondaryCTA.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'

interface HeroSectionProps {
  headline: React.ReactNode
  subheadline: string
  primaryCTA: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
}

export default function HeroSection({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
}: HeroSectionProps) {
  return (
    <div className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-display text-4xl md:text-5xl lg:text-6xl mb-6">
          {headline}
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">
          {subheadline}
        </p>
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

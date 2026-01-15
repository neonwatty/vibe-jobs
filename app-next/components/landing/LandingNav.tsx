import Link from 'next/link'

interface LandingNavProps {
  showEmployerLink?: boolean
  showTalentLink?: boolean
}

export default function LandingNav({ showEmployerLink = true, showTalentLink = true }: LandingNavProps) {
  return (
    <nav className="container flex items-center justify-between py-6">
      <Link
        href="/"
        className="text-display text-xl tracking-tight hover:opacity-80 transition-opacity"
      >
        vibe<span className="text-[var(--color-accent)]">jobs</span>
      </Link>
      <div className="flex items-center gap-4">
        {showTalentLink && (
          <Link href="/for/talent" className="btn btn-ghost hidden md:inline-flex">For Talent</Link>
        )}
        {showEmployerLink && (
          <Link href="/for/employers" className="btn btn-ghost hidden md:inline-flex">For Employers</Link>
        )}
        <Link href="/jobs" className="btn btn-ghost">Browse Jobs</Link>
        <Link href="/login" className="btn btn-ghost">Log in</Link>
        <Link href="/signup" className="btn btn-primary">Get Started</Link>
      </div>
    </nav>
  )
}

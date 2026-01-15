interface Step {
  number: number
  title: string
  description: string
}

interface HowItWorksProps {
  title?: string
  steps: Step[]
}

export default function HowItWorks({ title = "How It Works", steps }: HowItWorksProps) {
  return (
    <div className="py-16">
      <h2 className="text-display text-2xl md:text-3xl text-center mb-12">{title}</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] text-[var(--color-bg-primary)] flex items-center justify-center mx-auto mb-4 text-display text-xl font-bold">
              {step.number}
            </div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-[var(--color-text-muted)]">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

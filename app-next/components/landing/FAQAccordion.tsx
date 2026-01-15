'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: React.ReactNode
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="card">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between text-left"
          >
            <h3 className="font-semibold pr-4">{item.question}</h3>
            <svg
              className={`w-5 h-5 shrink-0 text-[var(--color-text-muted)] transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === index && (
            <div className="mt-4 pt-4 border-t border-[var(--color-border)] text-[var(--color-text-secondary)]">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

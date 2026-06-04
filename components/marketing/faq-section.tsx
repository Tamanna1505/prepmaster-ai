"use client"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import type { FaqItem } from "@/lib/sample-data"
import { cn } from "@/lib/utils"
import { Container, SectionHead } from "@/components/marketing/primitives"

export function FAQSection({
  items,
  eyebrow = "FAQ",
  title = "Common questions",
  description,
}: {
  items: FaqItem[]
  eyebrow?: string
  title?: string
  description?: string
}) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="bg-cream-50 py-14 sm:py-20">
      <Container className="max-w-[820px]">
        <SectionHead eyebrow={eyebrow} title={title} description={description} align="center" />
        <div className="mt-10 divide-y divide-line overflow-hidden rounded-[20px] bg-surface shadow-[inset_0_0_0_1px_var(--color-line)]">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.question}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className="font-ui text-[16px] font-semibold text-ink">{item.question}</span>
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-surface-muted text-ink">
                    {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-200 ease-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[15px] leading-[1.6] text-cocoa sm:px-6">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

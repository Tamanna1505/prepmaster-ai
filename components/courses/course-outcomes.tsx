import { Check } from "lucide-react"
import { Eyebrow } from "@/components/marketing/primitives"

export function CourseOutcomes({
  outcomes,
  title = "What you'll be able to do",
}: {
  outcomes: string[]
  title?: string
}) {
  return (
    <section className="rounded-[20px] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-7">
      <Eyebrow tone="orange">Outcomes</Eyebrow>
      <h2 className="mt-2 font-serif text-[24px] leading-[1.12] tracking-[-0.02em] text-ink sm:text-[28px]">
        {title}
      </h2>
      <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {outcomes.map((o) => (
          <li key={o} className="flex items-start gap-2.5 text-[15px] leading-[1.5] text-cocoa">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gold-200 text-gold-ink">
              <Check className="size-3.5" strokeWidth={2.5} />
            </span>
            {o}
          </li>
        ))}
      </ul>
    </section>
  )
}

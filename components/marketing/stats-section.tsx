import { Container } from "@/components/marketing/primitives"

/* Trust band — sample figures only (DESIGN_SYSTEM.md: gold reserved for accents,
   so this band sits on the bright cream surface, not a golden block). */
const STATS = [
  { value: "48k+", label: "Students preparing" },
  { value: "1.6M", label: "Questions attempted" },
  { value: "6", label: "Exam tracks covered" },
  { value: "92%", label: "Would recommend" },
]

export function StatsSection() {
  return (
    <section className="border-b border-line bg-cream-50 py-12 sm:py-14">
      <Container wide>
        <dl className="grid grid-cols-2 gap-8 sm:gap-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center sm:text-left">
              <dt className="font-data text-[34px] font-semibold leading-none tracking-[-0.02em] text-ink sm:text-[40px]">
                {s.value}
              </dt>
              <dd className="mt-2 font-ui text-[14px] text-taupe">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}

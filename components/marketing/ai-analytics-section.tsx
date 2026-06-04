import { Sparkle, TrendingUp } from "lucide-react"
import { Container } from "@/components/marketing/primitives"

const TOPICS = [
  { topic: "Mechanics", pct: 84, color: "var(--color-gold-300)" },
  { topic: "Thermodynamics", pct: 71, color: "var(--color-teal)" },
  { topic: "Electrostatics", pct: 52, color: "var(--color-orange)" },
  { topic: "Modern physics", pct: 66, color: "var(--color-gold-300)" },
]

const ACCURACY = 76

/* Accuracy dial — teal is the signature colour here (DESIGN_SYSTEM.md §6). */
function AccuracyDial({ value }: { value: number }) {
  return (
    <div className="relative grid size-[132px] place-items-center">
      <div
        className="size-full rounded-full"
        style={{
          background: `conic-gradient(var(--color-teal) ${value}%, rgba(255,255,255,0.10) ${value}% 100%)`,
        }}
      />
      <div className="absolute grid size-[98px] place-items-center rounded-full bg-ink">
        <span className="font-data text-[28px] font-semibold tracking-[-0.02em] text-cream-text">
          {value}
          <span className="text-[16px] text-[#C9BCA6]">%</span>
        </span>
      </div>
    </div>
  )
}

export function AIAnalyticsSection() {
  return (
    <section className="bg-cream-100 py-14 sm:py-20">
      <Container wide>
        <div className="overflow-hidden rounded-[28px] bg-ink p-7 text-cream-text shadow-feature sm:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Copy */}
            <div>
              <p className="eyebrow text-gold-200">AI Performance Insights</p>
              <h2 className="mt-3 font-serif text-[30px] leading-[1.12] tracking-[-0.02em] text-cream-text sm:text-[38px]">
                Know exactly where you&apos;re losing marks
              </h2>
              <p className="mt-4 max-w-lg text-[16px] leading-[1.6] text-[#C9BCA6] sm:text-[17px]">
                Topic-wise accuracy, time per question, and your trend across the last ten attempts —
                followed by a short, specific plan written for that exact attempt.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "Topic mastery heatmap",
                  "Question-by-question review with explanations",
                  "Time-management chart per section",
                  "AI-named weak topics with revision links",
                ].map((line) => (
                  <li key={line} className="flex items-start gap-2.5 text-[15px] text-cream-text/90">
                    <span className="mt-1.5 grid size-3.5 place-items-center rounded-full bg-teal/25">
                      <span className="size-1.5 rounded-full bg-teal" />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            {/* Widgets */}
            <div className="rounded-[22px] bg-white/[0.04] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-6">
                <AccuracyDial value={ACCURACY} />
                <div>
                  <p className="eyebrow text-[#C9BCA6]">Overall accuracy</p>
                  <p className="mt-2 flex items-center gap-1.5 font-ui text-[14px] text-teal">
                    <TrendingUp className="size-4" strokeWidth={2} /> +4% vs last 4 attempts
                  </p>
                  <p className="mt-1 font-ui text-[13px] text-[#C9BCA6]">
                    Last 10 attempts trending up
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {TOPICS.map((t) => (
                  <div key={t.topic}>
                    <div className="mb-1.5 flex items-center justify-between font-ui text-[13px]">
                      <span className="text-cream-text/90">{t.topic}</span>
                      <span className="font-data text-[12px] tracking-[-0.02em] text-[#C9BCA6]">
                        {t.pct}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${t.pct}%`, backgroundColor: t.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[16px] bg-white/[0.06] p-4">
                <div className="flex items-center gap-2">
                  <Sparkle className="size-4 text-gold-200" strokeWidth={1.75} />
                  <span className="eyebrow text-gold-200">Suggested next step</span>
                </div>
                <p className="mt-2 text-[14px] leading-[1.55] text-cream-text/90">
                  Take Electrostatics — Topic Test #3 after revising Lesson 4.3 (Gauss law).
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

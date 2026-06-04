import { CheckCircle2, GraduationCap, Sparkle, Timer } from "lucide-react"
import { Container, Eyebrow, PillLink, Tag } from "@/components/marketing/primitives"

const TRUST = [
  { icon: GraduationCap, label: "JEE · NEET · UPSC · GATE" },
  { icon: Timer, label: "Exam-grade mock UI" },
  { icon: Sparkle, label: "AI feedback on every attempt" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-cream-100">
      <Container
        wide
        className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-24"
      >
        {/* Copy */}
        <div className="animate-fade-up">
          <Eyebrow>Smarter prep for competitive exams</Eyebrow>
          <h1 className="mt-4 font-serif text-[40px] leading-[1.04] tracking-[-0.02em] text-ink sm:text-[56px] lg:text-[62px]">
            Stop revising blindly. Start improving with intent.
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-[1.6] text-cocoa sm:text-[18px]">
            PrepMaster AI brings structured courses, exam-grade mock tests, and AI feedback into one
            loop — so every attempt ends with a clear, named next step.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PillLink href="/register" variant="ink" size="lg">
              Start free trial
            </PillLink>
            <PillLink href="/courses" variant="outline" size="lg">
              Browse courses
            </PillLink>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
            {TRUST.map((t) => (
              <span key={t.label} className="flex items-center gap-2 font-ui text-[14px] text-taupe">
                <t.icon className="size-4 text-orange" strokeWidth={1.75} />
                {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* Visual — result preview card (golden accent, no teal in hero) */}
        <div className="animate-fade-up lg:justify-self-end">
          <div className="relative w-full max-w-md rounded-[24px] bg-surface p-5 shadow-card-hover shadow-[inset_0_0_0_1px_var(--color-line)]">
            <div className="rounded-[18px] bg-surface-muted p-5">
              <div className="flex items-center justify-between">
                <Eyebrow tone="taupe">Mock attempt · JEE Physics #14</Eyebrow>
                <Tag tone="gold">Submitted</Tag>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { k: "Score", v: "182", sub: "/240" },
                  { k: "Accuracy", v: "76", sub: "%" },
                  { k: "Time", v: "154", sub: "min" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-[14px] bg-surface p-3 shadow-[inset_0_0_0_1px_var(--color-line)]"
                  >
                    <p className="font-ui text-[12px] text-taupe">{s.k}</p>
                    <p className="mt-1 font-data text-[20px] font-semibold tracking-[-0.02em] text-ink">
                      {s.v}
                      <span className="ml-0.5 text-[12px] text-taupe">{s.sub}</span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-[14px] bg-gold-200 p-4 text-gold-ink">
                <div className="flex items-center gap-2">
                  <Sparkle className="size-4" strokeWidth={1.75} />
                  <span className="font-ui text-[12px] font-semibold uppercase tracking-[0.14em]">
                    AI feedback
                  </span>
                </div>
                <p className="mt-2 text-[14px] leading-[1.55]">
                  Strong on mechanics. You lost the most marks in Electrostatics — Gauss law. Revise
                  Lesson 4.3, then retake the topic test.
                </p>
              </div>

              <ul className="mt-4 space-y-2">
                {["Revise Lesson 4.3 — Gauss law", "Attempt Electrostatics topic test"].map((l) => (
                  <li key={l} className="flex items-center gap-2 font-ui text-[13px] text-cocoa">
                    <CheckCircle2 className="size-4 text-orange" strokeWidth={1.75} />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

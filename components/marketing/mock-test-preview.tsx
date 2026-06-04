import { ClipboardList, Sparkle } from "lucide-react"
import type { MockTest } from "@/lib/sample-data"
import { mockTests } from "@/lib/sample-data"
import { Container, LearnMore, SectionHead, Tag } from "@/components/marketing/primitives"

type State = "live" | "new" | null

export function MockTestCard({ test, state = null }: { test: MockTest; state?: State }) {
  return (
    <div className="group flex h-full flex-col rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-card-hover">
      <div className="flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-xl bg-gold-200 text-gold-ink">
          <ClipboardList className="size-5" strokeWidth={1.75} />
        </span>
        {state === "live" ? (
          <Tag tone="live">
            <span className="size-1.5 rounded-full bg-live-deep" /> Live now
          </Tag>
        ) : state === "new" ? (
          <Tag tone="teal">New</Tag>
        ) : (
          <Tag tone="outline">{test.examTag}</Tag>
        )}
      </div>

      <h3 className="mt-4 font-serif text-[19px] leading-[1.2] text-ink">{test.title}</h3>

      <p className="mt-2 font-data text-[12px] tracking-[-0.02em] text-taupe">
        {test.questionCount} questions · {test.durationMinutes} min · {test.difficulty}
      </p>

      <div className="my-4 h-px bg-line" />

      <div className="mt-auto flex items-center justify-between">
        <LearnMore label="Start mock" href="/mock-tests" />
        <span className="flex items-center gap-1.5 font-ui text-[12px] text-taupe">
          <Sparkle className="size-3.5 text-orange" strokeWidth={1.75} /> Instant AI report
        </span>
      </div>
    </div>
  )
}

export function MockTestPreview({ limit = 3 }: { limit?: number }) {
  const states: State[] = ["live", "new", null, null, null, null]
  return (
    <section className="bg-cream-50 py-14 sm:py-20">
      <Container wide>
        <SectionHead
          eyebrow="Mock tests"
          title="Practice on the UI you'll see on exam day"
          description="Global timer, navigation grid, mark-for-review, and auto-submit — the same affordances as the official portals, with an instant AI report at the end."
          trailing={<LearnMore label="All mock tests" href="/mock-tests" />}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mockTests.slice(0, limit).map((test, i) => (
            <MockTestCard key={test.slug} test={test} state={states[i]} />
          ))}
        </div>
      </Container>
    </section>
  )
}

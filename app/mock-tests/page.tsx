import type { Metadata } from "next"
import { LineChart, ListChecks, Sparkle, Target } from "lucide-react"
import { SiteShell } from "@/components/layout/site-shell"
import { Container, Eyebrow, SectionHead } from "@/components/marketing/primitives"
import { PublicTestBrowser } from "@/components/tests/public-test-browser"
import { getPublishedTests } from "@/lib/data/tests"

// Always reflect the live database (new tests appear without a rebuild).
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Mock tests",
  description:
    "Full-length, sectional, and topic-drill mock tests with the same timer, navigation grid, and auto-submit as the real exam — plus an instant AI report.",
}

const ANALYTICS_POINTS = [
  {
    icon: Target,
    title: "Section & topic breakdown",
    body: "See exactly which sections and topics cost you marks — not just a total score.",
  },
  {
    icon: LineChart,
    title: "Accuracy & percentile",
    body: "Track accuracy, percentile estimates, and time management across every attempt.",
  },
  {
    icon: Sparkle,
    title: "AI-written next steps",
    body: "A short, specific plan after each test: what to revise and which test to take next.",
  },
]

export default async function MockTestsPage() {
  const tests = (await getPublishedTests()) ?? []

  return (
    <SiteShell>
      {/* Hero */}
      <section className="border-b border-line bg-cream-100 py-14 sm:py-16">
        <Container wide>
          <Eyebrow>Mock tests</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-serif text-[40px] leading-[1.04] tracking-[-0.02em] text-ink sm:text-[52px]">
            Practice on the UI you&apos;ll see on exam day
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.6] text-cocoa">
            A realistic timer, a navigation palette, mark-for-review, and auto-submit. Every attempt
            ends with an instant, AI-written report on what to revise next.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 font-ui text-[14px] text-taupe">
            <ListChecks className="size-4 text-orange" strokeWidth={1.75} /> Full-length, sectional,
            and topic drills across exams.
          </p>
        </Container>
      </section>

      {/* Browser */}
      <section className="bg-cream-100 py-12 sm:py-16">
        <Container wide>
          <PublicTestBrowser tests={tests} />
        </Container>
      </section>

      {/* AI analytics after tests */}
      <section className="bg-cream-50 py-14 sm:py-20">
        <Container wide>
          <SectionHead
            eyebrow="After every test"
            title="An AI analysis, the moment you submit"
            description="PrepMaster AI turns each attempt into a clear next step — so practice actually changes your score."
            tone="teal"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {ANALYTICS_POINTS.map((p) => (
              <div
                key={p.title}
                className="rounded-[20px] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-line)]"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-teal-tint text-teal-deep">
                  <p.icon className="size-5" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 font-serif text-[19px] leading-[1.2] text-ink">{p.title}</h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-cocoa">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </SiteShell>
  )
}

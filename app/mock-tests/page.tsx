import type { Metadata } from "next"
import { Sparkle } from "lucide-react"
import { SiteShell } from "@/components/layout/site-shell"
import { Container, Eyebrow } from "@/components/marketing/primitives"
import { MockTestsBrowser } from "@/components/marketing/mock-tests-browser"

export const metadata: Metadata = {
  title: "Mock tests",
  description:
    "Full-length, sectional, and topic-drill mock tests with the same timer, navigation grid, and auto-submit as the real exam — plus an instant AI report.",
}

export default function MockTestsPage() {
  return (
    <SiteShell>
      <section className="border-b border-line bg-cream-100 py-14 sm:py-16">
        <Container wide>
          <Eyebrow>Mock tests</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-serif text-[40px] leading-[1.04] tracking-[-0.02em] text-ink sm:text-[52px]">
            Practice on the UI you&apos;ll see on exam day
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.6] text-cocoa">
            Realistic timer, navigation grid, mark-for-review, and auto-submit. Every attempt ends
            with an instant, AI-written report on what to revise next.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 font-ui text-[14px] text-taupe">
            <Sparkle className="size-4 text-orange" strokeWidth={1.75} /> Sign in to attempt — your
            scores carry into your analytics.
          </p>
        </Container>
      </section>

      <section className="bg-cream-100 py-12 sm:py-16">
        <Container wide>
          <MockTestsBrowser />
        </Container>
      </section>
    </SiteShell>
  )
}

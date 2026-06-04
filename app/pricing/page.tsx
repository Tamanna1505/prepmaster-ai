import type { Metadata } from "next"
import { SiteShell } from "@/components/layout/site-shell"
import { Container, Eyebrow } from "@/components/marketing/primitives"
import { PricingCard } from "@/components/marketing/pricing-card"
import { FAQSection } from "@/components/marketing/faq-section"
import { CTASection } from "@/components/marketing/cta-section"
import { PRICING_TIERS } from "@/lib/pricing"
import type { FaqItem } from "@/lib/sample-data"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start free and upgrade when you're ready. Full access during the MVP — paid tiers are a preview of what's coming next.",
}

const PRICING_FAQS: FaqItem[] = [
  {
    question: "Is PrepMaster AI really free right now?",
    answer:
      "Yes. During the MVP, every course, mock test, and AI feedback report is free. Anyone who joins now keeps free access to everything available today.",
  },
  {
    question: "When do paid tiers start?",
    answer:
      "Paid tiers are a preview of what's coming next and aren't billable yet. We'll give plenty of notice before anything changes, and early users keep their free access.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "You'll be able to move between Free, Pro, and Mentor at any time once paid tiers go live. Nothing is locked in.",
  },
  {
    question: "What does the Mentor plan include?",
    answer:
      "Mentor adds human guidance on top of the AI: monthly 1:1 sessions, a personalised study roadmap, and mock interview practice for exams that need it.",
  },
]

export default function PricingPage() {
  return (
    <SiteShell>
      <section className="border-b border-line bg-cream-100 py-14 sm:py-16">
        <Container wide className="text-center">
          <Eyebrow className="justify-center">Pricing</Eyebrow>
          <h1 className="mx-auto mt-3 max-w-3xl font-serif text-[40px] leading-[1.04] tracking-[-0.02em] text-ink sm:text-[52px]">
            Start free. Upgrade when you&apos;re ready.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-[1.6] text-cocoa">
            Full access during the MVP. Paid tiers below are a preview of what&apos;s coming — no
            checkout, no card required today.
          </p>
        </Container>
      </section>

      <section className="bg-cream-100 py-12 sm:py-16">
        <Container wide>
          <div className="grid items-stretch gap-5 md:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </Container>
      </section>

      <FAQSection items={PRICING_FAQS} eyebrow="Questions" title="Pricing, answered" />

      <CTASection
        eyebrow="No risk to start"
        title="Try everything free today"
        description="Create an account and get your first AI feedback report in minutes."
        primary={{ href: "/register", label: "Start free trial" }}
        secondary={{ href: "/contact", label: "Talk to us" }}
        tone="ink"
      />
    </SiteShell>
  )
}

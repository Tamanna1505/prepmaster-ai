import { SiteShell } from "@/components/layout/site-shell"
import { HeroSection } from "@/components/marketing/hero-section"
import { StatsSection } from "@/components/marketing/stats-section"
import { FeaturedCourses } from "@/components/marketing/featured-courses"
import { MockTestPreview } from "@/components/marketing/mock-test-preview"
import { AIAnalyticsSection } from "@/components/marketing/ai-analytics-section"
import { CTASection } from "@/components/marketing/cta-section"
import { Testimonials } from "@/components/marketing/testimonials"
import { FAQSection } from "@/components/marketing/faq-section"
import { PricingCard } from "@/components/marketing/pricing-card"
import { Container, LearnMore, SectionHead } from "@/components/marketing/primitives"
import { PRICING_TIERS } from "@/lib/pricing"
import { faqs } from "@/lib/sample-data"

export default function HomePage() {
  return (
    <SiteShell>
      {/* 2 — Hero */}
      <HeroSection />

      {/* 3 — Stats trust band */}
      <StatsSection />

      {/* 4 — Featured courses */}
      <FeaturedCourses />

      {/* 5 — Mock test preview */}
      <MockTestPreview />

      {/* 6 — AI analytics preview (teal accent) */}
      <AIAnalyticsSection />

      {/* 7 — Decorative pattern band (golden CTA feature block) */}
      <CTASection
        eyebrow="Built for exam day"
        title="One loop: study, attempt, improve"
        description="Join thousands of students turning every mock test into a clear, named next step."
        primary={{ href: "/register", label: "Start free trial" }}
        secondary={{ href: "/mock-tests", label: "Browse mock tests" }}
        tone="gold"
        withPattern
      />

      {/* 8 — Testimonials */}
      <Testimonials />

      {/* 9 — Pricing preview */}
      <section className="bg-cream-50 py-14 sm:py-20">
        <Container wide>
          <SectionHead
            eyebrow="Pricing"
            title="Start free. Upgrade when you're ready."
            description="Full access during the MVP. Paid tiers are a preview of what's coming next."
            trailing={<LearnMore label="See full pricing" href="/pricing" />}
          />
          <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
            {PRICING_TIERS.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>
        </Container>
      </section>

      {/* 10 — FAQ */}
      <FAQSection items={faqs} />

      {/* 11 — Final CTA */}
      <CTASection
        eyebrow="Ready when you are"
        title="Make your next attempt your best one"
        description="Create a free account and get your first AI feedback report today."
        primary={{ href: "/register", label: "Start free trial" }}
        secondary={{ href: "/courses", label: "Explore courses" }}
        tone="ink"
      />
    </SiteShell>
  )
}

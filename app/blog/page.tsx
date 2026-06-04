import type { Metadata } from "next"
import { SiteShell } from "@/components/layout/site-shell"
import { Container, Eyebrow } from "@/components/marketing/primitives"
import { BlogExplorer } from "@/components/marketing/blog-explorer"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Long-form strategy, study hacks, and student success stories from PrepMaster AI — no fluff.",
}

export default function BlogIndexPage() {
  return (
    <SiteShell>
      <section className="border-b border-line bg-cream-100 py-14 sm:py-16">
        <Container wide>
          <Eyebrow>The journal</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-serif text-[40px] leading-[1.04] tracking-[-0.02em] text-ink sm:text-[52px]">
            Strategy, study hacks, and student stories
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-[1.6] text-cocoa">
            Long-form writing on how to prepare smarter — drawn from real student data and the
            patterns that actually move scores.
          </p>
        </Container>
      </section>

      <section className="bg-cream-100 py-12 sm:py-16">
        <Container wide>
          <BlogExplorer />
        </Container>
      </section>
    </SiteShell>
  )
}

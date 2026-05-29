import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/page-header"
import { SiteShell } from "@/components/layout/site-shell"
import { MockTestCard } from "@/components/tests/mock-test-card"
import { mockTests } from "@/lib/sample-data"

export const metadata: Metadata = {
  title: "Mock tests",
  description: "Full-length and topic-wise mock tests with the same UI as the real exam.",
}

export default function MockTestsPage() {
  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <PageHeader
          eyebrow="Practice"
          title="Mock tests"
          description="Realistic timer, navigation grid, and auto-submit. Sign in to attempt — your scores carry over into your analytics."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockTests.map((t) => (
            <MockTestCard key={t.slug} test={t} />
          ))}
        </div>
      </div>
    </SiteShell>
  )
}

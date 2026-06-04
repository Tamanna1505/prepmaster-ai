import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/page-header"
import { DashboardTests } from "@/components/dashboard/dashboard-tests"

export const metadata: Metadata = { title: "Mock tests" }

export default function MyTestsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Practice"
        title="Mock tests"
        description="Attempt full-length and topic-wise tests. Resume in-progress attempts where you left off — every submission ends with an instant AI report."
      />
      <DashboardTests />
    </div>
  )
}

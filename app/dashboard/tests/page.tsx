import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/page-header"
import { StudentTestBrowser } from "@/components/tests/student-test-browser"

export const metadata: Metadata = { title: "Mock tests" }

export default function MyTestsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Practice"
        title="Mock tests"
        description="Attempt full-length, sectional, and topic-drill tests. Resume in-progress attempts where you left off — every submission ends with an instant AI report."
      />
      <StudentTestBrowser />
    </div>
  )
}

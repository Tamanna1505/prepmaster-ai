import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/page-header"
import { ResultsBrowser } from "@/components/tests/results-browser"

export const metadata: Metadata = { title: "Results" }

export default function ResultsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="History"
        title="Results"
        description="Every submitted mock test with score, accuracy, percentile, and full AI analysis. Search and filter to find any attempt."
      />
      <ResultsBrowser />
    </div>
  )
}

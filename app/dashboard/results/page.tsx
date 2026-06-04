import type { Metadata } from "next"
import { FileCheck2, Gauge, Target } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card"
import { LearnMore, Tag } from "@/components/marketing/primitives"
import { recentResults } from "@/lib/dashboard-data"

export const metadata: Metadata = { title: "Results" }

const avg = (key: "scorePct" | "accuracyPct") =>
  Math.round(recentResults.reduce((sum, r) => sum + r[key], 0) / recentResults.length)

export default function ResultsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="History"
        title="Results"
        description="Every submitted mock test with score, accuracy, and AI feedback."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardStatCard label="Tests submitted" value={String(recentResults.length)} icon={FileCheck2} />
        <DashboardStatCard label="Average score" value={`${avg("scorePct")}%`} icon={Gauge} tone="teal" />
        <DashboardStatCard label="Average accuracy" value={`${avg("accuracyPct")}%`} icon={Target} tone="teal" />
      </div>

      <div className="overflow-x-auto rounded-[18px] bg-surface shadow-[inset_0_0_0_1px_var(--color-line)]">
        <table className="w-full min-w-[680px] text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="eyebrow px-5 py-4 text-taupe">Test</th>
              <th className="eyebrow px-5 py-4 text-taupe">Date</th>
              <th className="eyebrow px-5 py-4 text-taupe">Score</th>
              <th className="eyebrow px-5 py-4 text-taupe">Accuracy</th>
              <th className="eyebrow px-5 py-4 text-right text-taupe">Report</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {recentResults.map((r) => (
              <tr key={r.id} className="transition-colors hover:bg-surface-muted">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <Tag tone="outline">{r.examTag}</Tag>
                    <span className="font-ui text-[14px] font-medium text-ink">{r.title}</span>
                  </div>
                </td>
                <td className="px-5 py-4 font-ui text-[14px] text-cocoa">
                  {new Date(r.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-5 py-4 font-data text-[14px] font-semibold tracking-[-0.02em] text-ink">
                  {r.scorePct}%
                </td>
                <td className="px-5 py-4 font-data text-[14px] font-semibold tracking-[-0.02em] text-teal-deep">
                  {r.accuracyPct}%
                </td>
                <td className="px-5 py-4 text-right">
                  <span className="inline-flex justify-end">
                    <LearnMore label="View" href="/dashboard/results" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

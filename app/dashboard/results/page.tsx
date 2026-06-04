import type { Metadata } from "next"
import Link from "next/link"
import { FileCheck2, Gauge, TrendingUp } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card"
import { LearnMore, Tag } from "@/components/marketing/primitives"
import { attemptSummaries } from "@/lib/result-data"

export const metadata: Metadata = { title: "Results" }

const round = (n: number) => Math.round(n)

export default function ResultsPage() {
  const summaries = attemptSummaries()
  const avgScore = round(summaries.reduce((s, a) => s + a.scorePct, 0) / summaries.length)
  const avgPercentile = round(summaries.reduce((s, a) => s + a.percentile, 0) / summaries.length)

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="History"
        title="Results"
        description="Every submitted mock test with score, accuracy, percentile, and full AI analysis."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <DashboardStatCard label="Tests submitted" value={String(summaries.length)} icon={FileCheck2} />
        <DashboardStatCard label="Average score" value={`${avgScore}%`} icon={Gauge} tone="teal" />
        <DashboardStatCard label="Average percentile" value={`${avgPercentile}th`} icon={TrendingUp} tone="teal" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summaries.map((a) => (
          <div
            key={a.id}
            className="flex h-full flex-col rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-card-hover"
          >
            <div className="flex items-center justify-between gap-2">
              <Tag tone="outline">{a.examTag}</Tag>
              <span className="font-ui text-[12px] text-taupe">
                {new Date(a.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h3 className="mt-3 font-serif text-[18px] leading-[1.2] text-ink">{a.title}</h3>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-[12px] bg-surface-muted p-3 text-center">
                <p className="font-data text-[20px] font-semibold tracking-[-0.02em] text-ink">
                  {a.scorePct}%
                </p>
                <p className="font-ui text-[11px] text-taupe">Score</p>
              </div>
              <div className="rounded-[12px] bg-surface-muted p-3 text-center">
                <p className="font-data text-[20px] font-semibold tracking-[-0.02em] text-teal-deep">
                  {a.accuracyPct}%
                </p>
                <p className="font-ui text-[11px] text-taupe">Accuracy</p>
              </div>
              <div className="rounded-[12px] bg-surface-muted p-3 text-center">
                <p className="font-data text-[20px] font-semibold tracking-[-0.02em] text-teal-deep">
                  {a.percentile}
                </p>
                <p className="font-ui text-[11px] text-taupe">%ile</p>
              </div>
            </div>

            <div className="mt-auto border-t border-line pt-4">
              <Link href={`/dashboard/results/${a.id}`} className="focus-ring inline-flex rounded">
                <LearnMore label="View analysis" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

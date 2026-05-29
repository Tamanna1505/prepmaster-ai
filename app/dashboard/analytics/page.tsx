import type { Metadata } from "next"
import { MetricCard } from "@/components/analytics/metric-card"
import { PageHeader } from "@/components/layout/page-header"

export const metadata: Metadata = { title: "Analytics" }

const TOPIC_MASTERY = [
  { topic: "Mechanics", pct: 84 },
  { topic: "Thermodynamics", pct: 71 },
  { topic: "Electrostatics", pct: 52 },
  { topic: "Modern Physics", pct: 66 },
  { topic: "Optics", pct: 78 },
]

const RECENT_ATTEMPTS = [
  { idx: 1, score: 60 },
  { idx: 2, score: 64 },
  { idx: 3, score: 58 },
  { idx: 4, score: 67 },
  { idx: 5, score: 71 },
  { idx: 6, score: 69 },
  { idx: 7, score: 74 },
  { idx: 8, score: 72 },
  { idx: 9, score: 76 },
  { idx: 10, score: 78 },
]

export default function AnalyticsPage() {
  const max = Math.max(...RECENT_ATTEMPTS.map((a) => a.score))
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Insights"
        title="Analytics"
        description="Topic mastery, accuracy trends, and time management. Live charts (recharts) wire up in Phase 7."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Tests in last 30d" value="14" hint="+3 vs prior 30d" />
        <MetricCard label="Avg accuracy" value="72%" hint="+4% vs last 4 attempts" />
        <MetricCard label="Avg time / question" value="48s" hint="-6s vs previous month" />
        <MetricCard label="Strongest topic" value="Mechanics" hint="84% accuracy" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <h3 className="text-sm font-semibold">Topic mastery</h3>
          <div className="mt-4 space-y-3">
            {TOPIC_MASTERY.map((t) => (
              <div key={t.topic}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium">{t.topic}</span>
                  <span className="text-muted-foreground">{t.pct}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${t.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <h3 className="text-sm font-semibold">Accuracy trend</h3>
          <p className="text-xs text-muted-foreground">Last 10 attempts</p>
          <div className="mt-6 flex h-40 items-end gap-2">
            {RECENT_ATTEMPTS.map((a) => (
              <div key={a.idx} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-primary/70"
                  style={{ height: `${(a.score / max) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground">#{a.idx}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from "next"
import { Clock, FileCheck2, Target, TrendingUp } from "lucide-react"
import { PageHeader } from "@/components/layout/page-header"
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card"
import { PerformancePreview } from "@/components/dashboard/performance-preview"
import { WeakAreaCard } from "@/components/dashboard/weak-area-card"
import { performanceTrend, weakAreas } from "@/lib/dashboard-data"

export const metadata: Metadata = { title: "Analytics" }

const TOPIC_MASTERY = [
  { topic: "Mechanics", pct: 84 },
  { topic: "Quantitative aptitude", pct: 76 },
  { topic: "Reasoning", pct: 71 },
  { topic: "Data interpretation", pct: 58 },
  { topic: "Electrostatics", pct: 52 },
]

const TIME_MANAGEMENT = [
  { label: "Avg time / question", value: "48s", hint: "−6s vs last month" },
  { label: "Questions rushed", value: "9%", hint: "Watch DI sets" },
  { label: "Unattempted", value: "4%", hint: "Mostly hard items" },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Insights"
        title="Analytics"
        description="Topic mastery, accuracy trends, and time management across your recent attempts."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard label="Tests in last 30d" value="14" delta="+3 vs prior 30d" trend="up" icon={FileCheck2} />
        <DashboardStatCard label="Avg accuracy" value="74%" delta="+4% vs last 4" trend="up" icon={Target} tone="teal" />
        <DashboardStatCard label="Avg time / question" value="48s" delta="−6s vs last month" trend="up" icon={Clock} tone="teal" />
        <DashboardStatCard label="Best streak" value="12 days" delta="Personal best: 18" trend="flat" icon={TrendingUp} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <PerformancePreview series={performanceTrend} />

        {/* Topic mastery (teal analytics) */}
        <div className="rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-6">
          <p className="eyebrow text-teal-deep">Topic mastery</p>
          <p className="mt-1 font-ui text-[13px] text-taupe">Accuracy by topic</p>
          <div className="mt-5 space-y-3.5">
            {TOPIC_MASTERY.map((t) => (
              <div key={t.topic}>
                <div className="mb-1.5 flex items-center justify-between font-ui text-[13px]">
                  <span className="text-cocoa">{t.topic}</span>
                  <span className="font-data tracking-[-0.02em] text-ink">{t.pct}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-teal-tint">
                  <div className="h-full rounded-full bg-teal" style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* Time management */}
        <div className="rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-6">
          <p className="eyebrow text-teal-deep">Time management</p>
          <div className="mt-4 space-y-3">
            {TIME_MANAGEMENT.map((m) => (
              <div
                key={m.label}
                className="flex items-center justify-between rounded-[14px] bg-surface-muted px-4 py-3"
              >
                <div>
                  <p className="font-ui text-[14px] text-cocoa">{m.label}</p>
                  <p className="font-ui text-[12px] text-taupe">{m.hint}</p>
                </div>
                <p className="font-data text-[20px] font-semibold tracking-[-0.02em] text-teal-deep">
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Weak areas */}
        <div>
          <h2 className="mb-4 font-serif text-[22px] tracking-[-0.02em] text-ink">
            Weak areas to fix
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {weakAreas.map((area) => (
              <WeakAreaCard key={area.topic} area={area} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

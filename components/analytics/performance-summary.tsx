import { Clock, FileCheck2, Gauge, Target, TrendingUp, Trophy } from "lucide-react"
import type { StudentAnalytics } from "@/lib/analytics-data"

function fmtTime(seconds: number) {
  return `${seconds}s`
}

export function PerformanceSummary({ summary }: { summary: StudentAnalytics["summary"] }) {
  const tiles = [
    { icon: FileCheck2, label: "Tests taken", value: String(summary.testsTaken), tone: "ink" as const },
    { icon: Gauge, label: "Avg score", value: `${summary.avgScore}%`, tone: "teal" as const },
    { icon: Target, label: "Avg accuracy", value: `${summary.avgAccuracy}%`, tone: "teal" as const },
    { icon: Trophy, label: "Best percentile", value: `${summary.bestPercentile}th`, tone: "teal" as const },
    {
      icon: TrendingUp,
      label: "Improvement",
      value: `${summary.improvement >= 0 ? "+" : ""}${summary.improvement}%`,
      tone: "success" as const,
    },
    { icon: Clock, label: "Avg time / Q", value: fmtTime(summary.avgSecondsPerQuestion), tone: "ink" as const },
  ]

  const valueTone: Record<string, string> = {
    ink: "text-ink",
    teal: "text-teal-deep",
    success: "text-brand-success",
  }

  return (
    <div className="rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-6">
      <p className="eyebrow text-teal-deep">Overall performance</p>
      <p className="mt-1 font-ui text-[13px] text-taupe">Across your last {summary.testsTaken} mock tests</p>
      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map((t) => (
          <div key={t.label} className="rounded-[14px] bg-surface-muted p-4">
            <t.icon className={`size-4 ${valueTone[t.tone]}`} strokeWidth={1.75} />
            <dd
              className={`mt-2 font-data text-[22px] font-semibold leading-none tracking-[-0.02em] ${valueTone[t.tone]}`}
            >
              {t.value}
            </dd>
            <dt className="mt-1.5 font-ui text-[12px] text-taupe">{t.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  )
}

import { Clock, Gauge, Target, TrendingUp } from "lucide-react"
import type { BuiltResult } from "@/lib/result-data"
import { cn } from "@/lib/utils"

function ScoreRing({ pct }: { pct: number }) {
  return (
    <div className="relative grid size-[128px] shrink-0 place-items-center">
      <div
        className="size-full rounded-full"
        style={{
          background: `conic-gradient(var(--color-teal) ${pct}%, var(--color-teal-tint) ${pct}% 100%)`,
        }}
      />
      <div className="absolute grid size-[98px] place-items-center rounded-full bg-surface">
        <span className="font-data text-[30px] font-semibold leading-none tracking-[-0.02em] text-teal-deep">
          {pct}
          <span className="text-[15px]">%</span>
        </span>
        <span className="mt-1 font-ui text-[10px] uppercase tracking-[0.12em] text-taupe">Score</span>
      </div>
    </div>
  )
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m ${String(s).padStart(2, "0")}s`
}

export function ResultSummaryCard({ result }: { result: BuiltResult }) {
  const total = result.total || 1
  const segments = [
    { label: "Correct", value: result.correct, color: "bg-teal", text: "text-teal-deep" },
    { label: "Wrong", value: result.wrong, color: "bg-live-deep", text: "text-live-deep" },
    { label: "Unattempted", value: result.unattempted, color: "bg-cream-300", text: "text-taupe" },
  ]

  const stats = [
    { icon: Gauge, label: "Score", value: `${result.totalScore}/${result.maxScore}`, tone: "text-ink" },
    { icon: Target, label: "Accuracy", value: `${result.accuracyPct}%`, tone: "text-teal-deep" },
    { icon: TrendingUp, label: "Percentile", value: `${result.percentile}th`, tone: "text-teal-deep" },
    { icon: Clock, label: "Time taken", value: formatTime(result.timeTakenSeconds), tone: "text-ink" },
  ]

  return (
    <div className="rounded-[24px] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-7">
      <div className="grid gap-7 lg:grid-cols-[auto_1fr] lg:gap-9">
        {/* Score + breakdown */}
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center lg:flex-col lg:items-start">
          <ScoreRing pct={result.percentage} />
          <div className="w-full min-w-[200px]">
            <p className="eyebrow text-taupe">Question breakdown</p>
            <div className="mt-2.5 flex h-2.5 w-full overflow-hidden rounded-full bg-surface-muted">
              {segments.map((s) => (
                <div
                  key={s.label}
                  className={cn("h-full", s.color)}
                  style={{ width: `${(s.value / total) * 100}%` }}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
              {segments.map((s) => (
                <span key={s.label} className="flex items-center gap-1.5 font-ui text-[12px] text-cocoa">
                  <span className={cn("size-2.5 rounded-[3px]", s.color)} />
                  {s.label}
                  <span className={cn("font-data font-semibold tracking-[-0.02em]", s.text)}>{s.value}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-[16px] bg-surface-muted p-4">
              <s.icon className={`size-4 ${s.tone}`} strokeWidth={1.75} />
              <p className={`mt-2.5 font-data text-[22px] font-semibold leading-none tracking-[-0.02em] ${s.tone}`}>
                {s.value}
              </p>
              <p className="mt-1.5 font-ui text-[12px] text-taupe">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

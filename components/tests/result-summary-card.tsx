import { CheckCircle2, CircleSlash, Clock, Gauge, TrendingUp, XCircle } from "lucide-react"
import type { BuiltResult } from "@/lib/result-data"

function ScoreRing({ pct }: { pct: number }) {
  return (
    <div className="relative grid size-[120px] shrink-0 place-items-center">
      <div
        className="size-full rounded-full"
        style={{
          background: `conic-gradient(var(--color-teal) ${pct}%, var(--color-teal-tint) ${pct}% 100%)`,
        }}
      />
      <div className="absolute grid size-[92px] place-items-center rounded-full bg-surface">
        <span className="font-data text-[28px] font-semibold leading-none tracking-[-0.02em] text-teal-deep">
          {pct}
          <span className="text-[14px]">%</span>
        </span>
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
  const stats = [
    { icon: Gauge, label: "Accuracy", value: `${result.accuracyPct}%`, tone: "text-teal-deep" },
    { icon: CheckCircle2, label: "Correct", value: String(result.correct), tone: "text-teal-deep" },
    { icon: XCircle, label: "Wrong", value: String(result.wrong), tone: "text-live-deep" },
    { icon: CircleSlash, label: "Unattempted", value: String(result.unattempted), tone: "text-taupe" },
    { icon: Clock, label: "Time taken", value: formatTime(result.timeTakenSeconds), tone: "text-ink" },
    { icon: TrendingUp, label: "Percentile", value: `${result.percentile}th`, tone: "text-teal-deep" },
  ]

  return (
    <div className="rounded-[24px] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-7">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-5">
          <ScoreRing pct={result.percentage} />
          <div>
            <p className="eyebrow text-taupe">Total score</p>
            <p className="mt-1 font-data text-[34px] font-semibold leading-none tracking-[-0.02em] text-ink">
              {result.totalScore}
              <span className="text-[18px] text-taupe"> / {result.maxScore}</span>
            </p>
            <p className="mt-2 font-ui text-[14px] text-cocoa">
              {result.correct} correct · {result.wrong} wrong · {result.unattempted} skipped
            </p>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-[14px] bg-surface-muted p-3.5">
              <s.icon className={`size-4 ${s.tone}`} strokeWidth={1.75} />
              <p className={`mt-2 font-data text-[18px] font-semibold tracking-[-0.02em] ${s.tone}`}>
                {s.value}
              </p>
              <p className="font-ui text-[12px] text-taupe">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { Clock } from "lucide-react"
import type { TimeManagement } from "@/lib/analytics-data"
import { cn } from "@/lib/utils"

export function TimeManagementCard({ data }: { data: TimeManagement }) {
  const segments = [
    { label: "Rushed", pct: data.rushedPct, color: "bg-orange" },
    { label: "On pace", pct: data.optimalPct, color: "bg-teal" },
    { label: "Overtime", pct: data.overtimePct, color: "bg-gold-400" },
  ]

  return (
    <div className="rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-6">
      <div className="flex items-center gap-2">
        <Clock className="size-4 text-teal-deep" strokeWidth={1.75} />
        <p className="eyebrow text-teal-deep">Time management</p>
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <p className="font-data text-[34px] font-semibold leading-none tracking-[-0.02em] text-teal-deep">
          {data.avgSecondsPerQuestion}s
        </p>
        <p className="font-ui text-[13px] text-taupe">avg per question</p>
      </div>

      {/* Pace distribution */}
      <div className="mt-5">
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-surface-muted">
          {segments.map((s) => (
            <div key={s.label} className={cn("h-full", s.color)} style={{ width: `${s.pct}%` }} />
          ))}
        </div>
        <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1">
          {segments.map((s) => (
            <span key={s.label} className="flex items-center gap-1.5 font-ui text-[12px] text-cocoa">
              <span className={cn("size-2.5 rounded-[3px]", s.color)} /> {s.label} {s.pct}%
            </span>
          ))}
        </div>
      </div>

      {/* By difficulty */}
      <div className="mt-5 space-y-2.5">
        {data.byDifficulty.map((d) => (
          <div
            key={d.difficulty}
            className="flex items-center justify-between rounded-[12px] bg-surface-muted px-4 py-2.5"
          >
            <span className="font-ui text-[14px] text-cocoa">{d.difficulty}</span>
            <div className="flex items-center gap-3">
              <span className="font-data text-[14px] font-semibold tracking-[-0.02em] text-ink">
                {d.avgSeconds}s
              </span>
              <span
                className={cn(
                  "rounded-full px-2.5 py-0.5 font-ui text-[11px] font-semibold",
                  d.verdict === "Too slow"
                    ? "bg-[rgba(216,145,71,0.16)] text-orange"
                    : "bg-teal-tint text-teal-deep"
                )}
              >
                {d.verdict}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[13px] leading-[1.5] text-taupe">{data.note}</p>
    </div>
  )
}

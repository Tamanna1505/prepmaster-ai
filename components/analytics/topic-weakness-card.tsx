import { AlertTriangle } from "lucide-react"
import type { TopicAgg } from "@/lib/analytics-data"
import { cn } from "@/lib/utils"

function band(pct: number) {
  if (pct >= 70) return { label: "Solid", tone: "text-teal-deep" }
  if (pct >= 55) return { label: "Shaky", tone: "text-orange" }
  return { label: "Weak", tone: "text-live-deep" }
}

export function TopicWeaknessCard({ topics }: { topics: TopicAgg[] }) {
  return (
    <div className="rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-6">
      <div className="flex items-center gap-2">
        <AlertTriangle className="size-4 text-orange" strokeWidth={1.75} />
        <p className="eyebrow text-teal-deep">Topic-wise weakness analysis</p>
      </div>
      <p className="mt-1 font-ui text-[13px] text-taupe">Lowest-accuracy topics first — your highest-return fixes</p>

      <div className="mt-5 space-y-4">
        {topics.map((t) => {
          const b = band(t.accuracyPct)
          return (
            <div key={t.topic} className="rounded-[14px] bg-surface-muted p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-ui text-[15px] font-semibold text-ink">{t.topic}</p>
                  {t.subtopics.length ? (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {t.subtopics.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-surface px-2.5 py-0.5 font-ui text-[11px] text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="text-right">
                  <p className="font-data text-[18px] font-semibold tracking-[-0.02em] text-teal-deep">
                    {t.accuracyPct}%
                  </p>
                  <p className={cn("font-ui text-[11px] font-semibold", b.tone)}>{b.label}</p>
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-teal-tint">
                <div className="h-full rounded-full bg-teal" style={{ width: `${t.accuracyPct}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

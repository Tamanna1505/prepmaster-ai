import type { WeakArea } from "@/lib/dashboard-data"

/* Weak areas are performance analytics — teal is the signature colour here. */
export function WeakAreaCard({ area }: { area: WeakArea }) {
  return (
    <div className="rounded-[16px] bg-surface p-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
      <div className="flex items-center justify-between gap-3">
        <p className="font-ui text-[15px] font-semibold text-ink">{area.topic}</p>
        <span className="font-data text-[14px] font-semibold tracking-[-0.02em] text-teal-deep">
          {area.accuracyPct}%
        </span>
      </div>
      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-teal-tint">
        <div className="h-full rounded-full bg-teal" style={{ width: `${area.accuracyPct}%` }} />
      </div>
      <p className="mt-2.5 text-[13px] leading-[1.5] text-cocoa">{area.note}</p>
    </div>
  )
}

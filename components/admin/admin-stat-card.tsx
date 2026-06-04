import type { LucideIcon } from "lucide-react"
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminStatCard({
  label,
  value,
  delta,
  trend,
  icon: Icon,
  tone = "default",
}: {
  label: string
  value: string
  delta?: string
  trend?: "up" | "down" | "flat"
  icon: LucideIcon
  tone?: "default" | "teal"
}) {
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : ArrowRight

  return (
    <div className="rounded-[18px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-card-hover">
      <div className="flex items-center justify-between">
        <p className="eyebrow text-taupe">{label}</p>
        <span
          className={cn(
            "grid size-9 place-items-center rounded-[10px]",
            tone === "teal" ? "bg-teal-tint text-teal-deep" : "bg-surface-muted text-brown"
          )}
        >
          <Icon className="size-[18px]" strokeWidth={1.75} />
        </span>
      </div>
      <p
        className={cn(
          "mt-3 font-data text-[26px] font-semibold leading-none tracking-[-0.02em]",
          tone === "teal" ? "text-teal-deep" : "text-ink"
        )}
      >
        {value}
      </p>
      {delta ? (
        <p
          className={cn(
            "mt-2 flex items-center gap-1 font-ui text-[13px]",
            trend === "down" ? "text-brand-error" : trend === "flat" ? "text-taupe" : "text-brand-success"
          )}
        >
          <TrendIcon className="size-3.5" strokeWidth={2} />
          {delta}
        </p>
      ) : null}
    </div>
  )
}

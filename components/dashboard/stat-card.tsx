import type { LucideIcon } from "lucide-react"
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function StatCard({
  label,
  value,
  delta,
  trend,
  icon: Icon,
}: {
  label: string
  value: string
  delta: string
  trend: "up" | "down" | "flat"
  icon: LucideIcon
}) {
  const TrendIcon = trend === "up" ? ArrowUpRight : trend === "down" ? ArrowDownRight : ArrowRight
  return (
    <div className="rounded-xl border border-border/60 bg-card p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <span className="grid size-8 place-items-center rounded-md bg-muted text-muted-foreground">
          <Icon className="size-4" />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      <p
        className={cn(
          "mt-1 flex items-center gap-1 text-xs",
          trend === "up"
            ? "text-emerald-600"
            : trend === "down"
              ? "text-red-600"
              : "text-muted-foreground",
        )}
      >
        <TrendIcon className="size-3" />
        {delta}
      </p>
    </div>
  )
}

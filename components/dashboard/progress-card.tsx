import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { PillLink } from "@/components/marketing/primitives"

/* Progress bar uses a warm gold fill (course completion is not analytics, so
   teal is reserved). */
export function ProgressBar({ pct, className }: { pct: number; className?: string }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-surface-muted", className)}>
      <div className="h-full rounded-full bg-gold-300" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function ProgressCard({
  icon: Icon,
  eyebrow,
  title,
  subtitle,
  progressPct,
  meta,
  cta,
}: {
  icon?: LucideIcon
  eyebrow?: string
  title: string
  subtitle?: string
  progressPct: number
  meta?: string
  cta?: { href: string; label: string }
}) {
  return (
    <div className="rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-card-hover sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {Icon ? (
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-200 text-gold-ink">
              <Icon className="size-5" strokeWidth={1.75} />
            </span>
          ) : null}
          <div>
            {eyebrow ? <p className="eyebrow text-taupe">{eyebrow}</p> : null}
            <h3 className="mt-1 font-serif text-[19px] leading-[1.2] text-ink">{title}</h3>
            {subtitle ? <p className="mt-1 text-[14px] leading-[1.5] text-cocoa">{subtitle}</p> : null}
          </div>
        </div>
        {cta ? (
          <PillLink href={cta.href} variant="outline" size="sm" className="hidden shrink-0 sm:inline-flex">
            {cta.label}
          </PillLink>
        ) : null}
      </div>

      <div className="mt-5">
        <div className="mb-1.5 flex items-center justify-between font-ui text-[13px]">
          <span className="text-taupe">{meta ?? "Progress"}</span>
          <span className="font-data tracking-[-0.02em] text-ink">{progressPct}%</span>
        </div>
        <ProgressBar pct={progressPct} />
      </div>

      {cta ? (
        <Link
          href={cta.href}
          className="focus-ring mt-4 inline-flex rounded font-ui text-[14px] font-semibold text-orange hover:underline sm:hidden"
        >
          {cta.label}
        </Link>
      ) : null}
    </div>
  )
}

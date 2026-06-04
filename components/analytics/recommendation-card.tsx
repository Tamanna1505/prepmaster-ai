import { ArrowRight } from "lucide-react"
import type { Recommendation } from "@/lib/analytics-data"
import { cn } from "@/lib/utils"
import { PillLink } from "@/components/marketing/primitives"

const priorityTone: Record<Recommendation["priority"], string> = {
  High: "bg-[rgba(194,80,47,0.12)] text-live-deep",
  Medium: "bg-gold-200 text-gold-ink",
  Low: "bg-teal-tint text-teal-deep",
}

export function RecommendationCard({ rec }: { rec: Recommendation }) {
  return (
    <div className="flex h-full flex-col rounded-[18px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-card-hover">
      <span
        className={cn(
          "w-fit rounded-full px-2.5 py-1 font-ui text-[11px] font-semibold uppercase tracking-[0.08em]",
          priorityTone[rec.priority]
        )}
      >
        {rec.priority} priority
      </span>
      <h3 className="mt-3 font-serif text-[18px] leading-[1.2] text-ink">{rec.title}</h3>
      <p className="mt-2 flex-1 text-[14px] leading-[1.5] text-cocoa">{rec.detail}</p>
      <div className="mt-4">
        <PillLink href={rec.cta.href} variant="gold" size="sm">
          {rec.cta.label} <ArrowRight className="size-4" strokeWidth={2} />
        </PillLink>
      </div>
    </div>
  )
}

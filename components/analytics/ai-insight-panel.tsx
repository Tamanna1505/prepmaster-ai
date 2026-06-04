import {
  ArrowRight,
  BookOpen,
  Clock,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import type { AiInsight } from "@/lib/analytics-data"
import { cn } from "@/lib/utils"

const priorityTone: Record<AiInsight["priority"], string> = {
  High: "bg-[rgba(216,145,71,0.2)] text-gold-200",
  Medium: "bg-white/10 text-cream-text",
  Low: "bg-teal/20 text-teal",
}

function InsightBlock({
  icon: Icon,
  accent,
  label,
  title,
  detail,
}: {
  icon: typeof Clock
  accent: string
  label: string
  title: string
  detail: string
}) {
  return (
    <div className="rounded-[16px] bg-white/[0.05] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]">
      <div className="flex items-center gap-2">
        <Icon className={cn("size-4", accent)} strokeWidth={2} />
        <span className="font-ui text-[11px] font-semibold uppercase tracking-[0.1em] text-[#C9BCA6]">
          {label}
        </span>
      </div>
      <p className="mt-2 font-serif text-[18px] leading-[1.2] text-cream-text">{title}</p>
      <p className="mt-1 text-[13px] leading-[1.5] text-cream-text/80">{detail}</p>
    </div>
  )
}

export function AiInsightPanel({
  insight,
  analyticsHref,
}: {
  insight: AiInsight
  analyticsHref?: string
}) {
  return (
    <section className="overflow-hidden rounded-[24px] bg-ink p-6 text-cream-text shadow-feature sm:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-gold-200 text-gold-ink">
            <Sparkles className="size-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="eyebrow text-gold-200">Your AI mentor</p>
            <h2 className="mt-1.5 max-w-xl font-serif text-[24px] leading-[1.16] tracking-[-0.02em] text-cream-text sm:text-[28px]">
              {insight.headline}
            </h2>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span
            className={cn(
              "rounded-full px-3 py-1 font-ui text-[11px] font-semibold uppercase tracking-[0.08em]",
              priorityTone[insight.priority]
            )}
          >
            {insight.priority} priority
          </span>
        </div>
      </div>

      {/* Narrative */}
      <p className="mt-5 max-w-3xl text-[16px] leading-[1.65] text-cream-text/90">
        {insight.narrative}
      </p>

      {/* Confidence meter */}
      <div className="mt-5 max-w-xs">
        <div className="flex items-center justify-between font-ui text-[12px] text-[#C9BCA6]">
          <span>Confidence in this read</span>
          <span className="font-data tracking-[-0.02em] text-teal">{insight.confidencePct}%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-teal" style={{ width: `${insight.confidencePct}%` }} />
        </div>
      </div>

      {/* Insight blocks */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <InsightBlock
          icon={TrendingUp}
          accent="text-teal"
          label="Strength"
          title={insight.strength.title}
          detail={insight.strength.detail}
        />
        <InsightBlock
          icon={TrendingDown}
          accent="text-orange"
          label="Weakness"
          title={insight.weakness.title}
          detail={insight.weakness.detail}
        />
        <InsightBlock
          icon={Clock}
          accent="text-gold-200"
          label="Time management"
          title="Pace check"
          detail={insight.timeFeedback}
        />
        <InsightBlock
          icon={BookOpen}
          accent="text-teal"
          label="Topic revision"
          title="What to revise"
          detail={insight.revisionAdvice}
        />
      </div>

      {/* Next steps + practice set */}
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-[16px] bg-white/[0.05] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]">
          <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.1em] text-[#C9BCA6]">
            Recommended next steps
          </p>
          <ol className="mt-3 space-y-2.5">
            {insight.nextSteps.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-[14px] leading-[1.5] text-cream-text/90">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold-200 font-data text-[12px] font-semibold text-gold-ink">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col justify-between rounded-[16px] bg-gold-200 p-5 text-gold-ink">
          <div>
            <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.1em] text-orange">
              Suggested practice set
            </p>
            <p className="mt-2 font-serif text-[19px] leading-[1.2]">{insight.practiceSet.title}</p>
            <p className="mt-1 text-[13px] text-brown">{insight.practiceSet.detail}</p>
          </div>
          <Link
            href={insight.practiceSet.href}
            className="focus-ring mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-ui text-[14px] font-semibold text-cream-text transition-all hover:-translate-y-px hover:shadow-card-hover"
          >
            Start practice <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </div>
      </div>

      {analyticsHref ? (
        <div className="mt-5">
          <Link
            href={analyticsHref}
            className="focus-ring inline-flex items-center gap-2 rounded font-ui text-[14px] font-semibold text-gold-200 hover:underline"
          >
            Open full analytics <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </div>
      ) : null}
    </section>
  )
}

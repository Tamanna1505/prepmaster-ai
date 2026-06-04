import { Target } from "lucide-react"
import type { RecentResult } from "@/lib/dashboard-data"
import { LearnMore, Tag } from "@/components/marketing/primitives"

export function RecentTestCard({ result }: { result: RecentResult }) {
  const date = new Date(result.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <div className="flex h-full flex-col rounded-[18px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-card-hover">
      <div className="flex items-center justify-between gap-3">
        <Tag tone="outline">{result.examTag}</Tag>
        <span className="font-ui text-[12px] text-taupe">{date}</span>
      </div>

      <h3 className="mt-3 font-serif text-[17px] leading-[1.2] text-ink">{result.title}</h3>

      <div className="mt-4 flex items-end gap-5">
        <div>
          <p className="eyebrow text-taupe">Score</p>
          <p className="mt-1 font-data text-[24px] font-semibold leading-none tracking-[-0.02em] text-ink">
            {result.scorePct}%
          </p>
        </div>
        <div>
          <p className="eyebrow text-taupe">Accuracy</p>
          <p className="mt-1 flex items-center gap-1 font-data text-[24px] font-semibold leading-none tracking-[-0.02em] text-teal-deep">
            <Target className="size-4 text-teal" strokeWidth={2} />
            {result.accuracyPct}%
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <span className="font-data text-[12px] tracking-[-0.02em] text-taupe">
          {result.correct}/{result.total} correct
        </span>
        <LearnMore label="View report" href="/dashboard/results" />
      </div>
    </div>
  )
}

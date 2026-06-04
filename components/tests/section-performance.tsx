import type { SectionResult, TopicResult } from "@/lib/result-data"

/* Teal bars — performance analytics. */
function Bar({ pct }: { pct: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-teal-tint">
      <div className="h-full rounded-full bg-teal" style={{ width: `${pct}%` }} />
    </div>
  )
}

export function SectionPerformance({
  sections,
  topics,
}: {
  sections: SectionResult[]
  topics: TopicResult[]
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Section-wise */}
      <div className="rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-6">
        <p className="eyebrow text-teal-deep">Section-wise performance</p>
        <div className="mt-4 space-y-4">
          {sections.map((s) => (
            <div key={s.name}>
              <div className="mb-1.5 flex items-center justify-between font-ui text-[14px]">
                <span className="text-ink">{s.name}</span>
                <span className="font-data text-[12px] tracking-[-0.02em] text-taupe">
                  {s.score}/{s.maxScore} marks · {s.accuracyPct}%
                </span>
              </div>
              <Bar pct={s.accuracyPct} />
              <p className="mt-1 font-ui text-[12px] text-taupe">
                {s.correct}/{s.total} correct · {s.attempted} attempted
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Topic-wise (weakest first) */}
      <div className="rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-6">
        <p className="eyebrow text-teal-deep">Topic-wise performance</p>
        <p className="mt-1 font-ui text-[12px] text-taupe">Weakest topics first</p>
        <div className="mt-4 space-y-3.5">
          {topics.map((t) => (
            <div key={t.topic}>
              <div className="mb-1.5 flex items-center justify-between font-ui text-[13px]">
                <span className="text-cocoa">{t.topic}</span>
                <span className="font-data tracking-[-0.02em] text-ink">{t.accuracyPct}%</span>
              </div>
              <Bar pct={t.accuracyPct} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

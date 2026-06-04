"use client"

import { useMemo, useState } from "react"
import { CheckCircle2, CircleSlash, XCircle } from "lucide-react"
import type { QuestionReviewItem, ReviewStatus } from "@/lib/result-data"
import { cn } from "@/lib/utils"
import { Tag } from "@/components/marketing/primitives"

const FILTERS: { key: "all" | ReviewStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "correct", label: "Correct" },
  { key: "wrong", label: "Wrong" },
  { key: "unattempted", label: "Skipped" },
]

function StatusBadge({ status }: { status: ReviewStatus }) {
  if (status === "correct")
    return (
      <Tag tone="teal">
        <CheckCircle2 className="size-3.5" strokeWidth={2} /> Correct
      </Tag>
    )
  if (status === "wrong")
    return (
      <Tag tone="live">
        <XCircle className="size-3.5" strokeWidth={2} /> Wrong
      </Tag>
    )
  return (
    <Tag tone="outline">
      <CircleSlash className="size-3.5" strokeWidth={2} /> Skipped
    </Tag>
  )
}

export function QuestionReview({ review }: { review: QuestionReviewItem[] }) {
  const [filter, setFilter] = useState<"all" | ReviewStatus>("all")

  const items = useMemo(
    () => (filter === "all" ? review : review.filter((r) => r.status === filter)),
    [filter, review]
  )

  const counts = useMemo(
    () => ({
      all: review.length,
      correct: review.filter((r) => r.status === "correct").length,
      wrong: review.filter((r) => r.status === "wrong").length,
      unattempted: review.filter((r) => r.status === "unattempted").length,
    }),
    [review]
  )

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={cn(
              "focus-ring rounded-full px-4 py-2 font-ui text-[13px] font-medium transition-all duration-150",
              filter === f.key
                ? "bg-ink text-cream-text"
                : "bg-surface text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-surface-muted"
            )}
          >
            {f.label} ({counts[f.key]})
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {items.map((r) => (
          <div
            key={r.question.id}
            className="rounded-[18px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-data text-[13px] font-semibold tracking-[-0.02em] text-taupe">
                  Q{r.index}
                </span>
                <Tag tone="outline">{r.question.topic}</Tag>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "font-data text-[13px] font-semibold tracking-[-0.02em]",
                    r.marksAwarded > 0
                      ? "text-teal-deep"
                      : r.marksAwarded < 0
                        ? "text-live-deep"
                        : "text-taupe"
                  )}
                >
                  {r.marksAwarded > 0 ? "+" : ""}
                  {r.marksAwarded}
                </span>
                <StatusBadge status={r.status} />
              </div>
            </div>

            <p className="mt-3 text-[15px] leading-[1.55] text-ink">{r.question.stem}</p>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <div
                className={cn(
                  "rounded-[12px] px-4 py-3",
                  r.status === "correct"
                    ? "bg-teal-tint"
                    : r.status === "wrong"
                      ? "bg-live-tint"
                      : "bg-surface-muted"
                )}
              >
                <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.1em] text-taupe">
                  Your answer
                </p>
                <p
                  className={cn(
                    "mt-1 font-ui text-[14px] font-medium",
                    r.status === "correct"
                      ? "text-teal-deep"
                      : r.status === "wrong"
                        ? "text-live-deep"
                        : "text-cocoa"
                  )}
                >
                  {r.yourAnswerText}
                </p>
              </div>
              <div className="rounded-[12px] bg-surface-muted px-4 py-3">
                <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.1em] text-taupe">
                  Correct answer
                </p>
                <p className="mt-1 font-ui text-[14px] font-medium text-ink">{r.correctAnswerText}</p>
              </div>
            </div>

            <div className="mt-3 rounded-[12px] bg-cream-100 px-4 py-3">
              <p className="font-ui text-[11px] font-semibold uppercase tracking-[0.1em] text-orange">
                Explanation
              </p>
              <p className="mt-1 text-[14px] leading-[1.55] text-cocoa">{r.question.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

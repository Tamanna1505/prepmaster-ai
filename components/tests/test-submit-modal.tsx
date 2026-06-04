"use client"

import { AlertTriangle, X } from "lucide-react"
import { PillButton } from "@/components/marketing/primitives"

type Summary = { total: number; answered: number; notAnswered: number; marked: number }

export function TestSubmitModal({
  open,
  summary,
  onClose,
  onConfirm,
}: {
  open: boolean
  summary: Summary
  onClose: () => void
  onConfirm: () => void
}) {
  if (!open) return null

  const stats = [
    { label: "Answered", value: summary.answered, tone: "text-teal-deep" },
    { label: "Not answered", value: summary.notAnswered, tone: "text-live-deep" },
    { label: "Marked for review", value: summary.marked, tone: "text-orange" },
  ]

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-5">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="submit-title"
        className="relative w-full max-w-md rounded-[24px] bg-surface p-6 shadow-feature sm:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="focus-ring absolute right-4 top-4 grid size-8 place-items-center rounded-full text-taupe hover:bg-surface-muted hover:text-ink"
        >
          <X className="size-4" />
        </button>

        <span className="grid size-12 place-items-center rounded-full bg-[rgba(216,145,71,0.14)] text-orange">
          <AlertTriangle className="size-6" strokeWidth={1.75} />
        </span>
        <h2 id="submit-title" className="mt-4 font-serif text-[24px] tracking-[-0.02em] text-ink">
          Submit this test?
        </h2>
        <p className="mt-2 text-[15px] leading-[1.55] text-cocoa">
          Once submitted, the attempt is final and your AI analysis is generated instantly. Here&apos;s
          where you stand:
        </p>

        <dl className="mt-5 grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[14px] bg-surface-muted p-3 text-center"
            >
              <dt className="font-ui text-[11px] text-taupe">{s.label}</dt>
              <dd className={`mt-1 font-data text-[22px] font-semibold tracking-[-0.02em] ${s.tone}`}>
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-center font-ui text-[12px] text-taupe">
          {summary.notAnswered > 0
            ? `${summary.notAnswered} question${summary.notAnswered > 1 ? "s" : ""} still unanswered.`
            : "All questions answered."}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <PillButton type="button" variant="outline" size="md" onClick={onClose}>
            Keep working
          </PillButton>
          <PillButton type="button" variant="ink" size="md" onClick={onConfirm}>
            Submit test
          </PillButton>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { attemptSummaries, type AttemptSummary } from "@/lib/result-data"
import { getStudentAnalytics } from "@/lib/analytics-data"
import { LearnMore, Tag } from "@/components/marketing/primitives"

type Status = "Improved" | "Dropped" | "Steady"

const statusTone: Record<Status, "teal" | "live" | "outline"> = {
  Improved: "teal",
  Dropped: "live",
  Steady: "outline",
}

type Row = AttemptSummary & { status: Status }

function withStatus(): Row[] {
  const byDateAsc = [...attemptSummaries()].sort((a, b) => a.date.localeCompare(b.date))
  const rows: Row[] = byDateAsc.map((a, i) => {
    if (i === 0) return { ...a, status: "Steady" }
    const prev = byDateAsc[i - 1]
    const diff = a.scorePct - prev.scorePct
    const status: Status = diff > 1 ? "Improved" : diff < -1 ? "Dropped" : "Steady"
    return { ...a, status }
  })
  return rows.reverse() // newest first for display
}

const ALL_ROWS = withStatus()
const EXAMS = ["All", ...Array.from(new Set(ALL_ROWS.map((r) => r.examTag)))]
const STATUSES = ["All", "Improved", "Dropped", "Steady"]

export function ResultsBrowser() {
  const analytics = getStudentAnalytics()
  const [query, setQuery] = useState("")
  const [exam, setExam] = useState("All")
  const [status, setStatus] = useState("All")

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ALL_ROWS.filter(
      (r) =>
        (exam === "All" || r.examTag === exam) &&
        (status === "All" || r.status === status) &&
        (!q || r.title.toLowerCase().includes(q))
    )
  }, [query, exam, status])

  return (
    <div className="space-y-8">
      {/* Improvement summary */}
      <div className="grid gap-4 rounded-[20px] bg-ink p-6 text-cream-text shadow-feature sm:grid-cols-[1.2fr_1fr_1fr] sm:p-7">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-teal" strokeWidth={2} />
            <p className="eyebrow text-gold-200">Improvement summary</p>
          </div>
          <p className="mt-2 font-data text-[40px] font-semibold leading-none tracking-[-0.02em] text-teal">
            {analytics.summary.improvement >= 0 ? "+" : ""}
            {analytics.summary.improvement}%
          </p>
          <p className="mt-2 max-w-xs text-[14px] leading-[1.5] text-cream-text/85">
            Your score has moved {analytics.summary.improvement >= 0 ? "up" : "down"} over your last{" "}
            {analytics.summary.testsTaken} mocks. Keep the cadence — accuracy is trending the right way.
          </p>
        </div>
        <div className="rounded-[14px] bg-white/[0.05] p-4">
          <p className="font-data text-[26px] font-semibold tracking-[-0.02em] text-cream-text">
            {analytics.summary.avgScore}%
          </p>
          <p className="mt-1 font-ui text-[12px] text-[#C9BCA6]">Average score</p>
        </div>
        <div className="rounded-[14px] bg-white/[0.05] p-4">
          <p className="font-data text-[26px] font-semibold tracking-[-0.02em] text-teal">
            {analytics.summary.bestPercentile}th
          </p>
          <p className="mt-1 font-ui text-[12px] text-[#C9BCA6]">Best percentile</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-[18px] bg-cream-50 p-4 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-taupe" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your attempts"
            className="focus-ring w-full rounded-full bg-surface py-2.5 pl-10 pr-4 font-ui text-[14px] text-ink shadow-[inset_0_0_0_1px_var(--color-line)] placeholder:text-taupe"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-ui text-[12px] font-semibold uppercase tracking-[0.1em] text-taupe">Exam</span>
          {EXAMS.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => setExam(e)}
              className={cn(
                "focus-ring rounded-full px-3.5 py-1.5 font-ui text-[13px] font-medium transition-all duration-150",
                exam === e
                  ? "bg-ink text-cream-text"
                  : "bg-surface text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-surface-muted"
              )}
            >
              {e}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-ui text-[12px] font-semibold uppercase tracking-[0.1em] text-taupe">Trend</span>
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={cn(
                "focus-ring rounded-full px-3.5 py-1.5 font-ui text-[13px] font-medium transition-all duration-150",
                status === s ? "bg-gold-200 text-gold-ink" : "text-taupe hover:text-ink"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {rows.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((a) => (
            <div
              key={a.id}
              className="flex h-full flex-col rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-card-hover"
            >
              <div className="flex items-center justify-between gap-2">
                <Tag tone="outline">{a.examTag}</Tag>
                <Tag tone={statusTone[a.status]}>{a.status}</Tag>
              </div>

              <h3 className="mt-3 font-serif text-[18px] leading-[1.2] text-ink">{a.title}</h3>
              <p className="mt-1 font-ui text-[12px] text-taupe">
                {new Date(a.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { v: `${a.scorePct}%`, l: "Score", t: "text-ink" },
                  { v: `${a.accuracyPct}%`, l: "Accuracy", t: "text-teal-deep" },
                  { v: `${a.percentile}`, l: "%ile", t: "text-teal-deep" },
                ].map((s) => (
                  <div key={s.l} className="rounded-[12px] bg-surface-muted p-3 text-center">
                    <p className={`font-data text-[19px] font-semibold tracking-[-0.02em] ${s.t}`}>{s.v}</p>
                    <p className="font-ui text-[11px] text-taupe">{s.l}</p>
                  </div>
                ))}
              </div>

              <div className="mt-auto border-t border-line pt-4">
                <Link href={`/dashboard/results/${a.id}`} className="focus-ring inline-flex rounded">
                  <LearnMore label="View detailed analysis" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] bg-surface p-12 text-center shadow-[inset_0_0_0_1px_var(--color-line)]">
          <p className="font-serif text-[20px] text-ink">No attempts match your filters</p>
          <p className="mt-2 text-[14px] text-cocoa">Try a different exam, trend, or search.</p>
        </div>
      )}
    </div>
  )
}

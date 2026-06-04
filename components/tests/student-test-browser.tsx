"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import {
  DIFFICULTIES,
  EXAM_TYPES,
  TEST_TYPES,
  examTests,
  type ExamTest,
} from "@/lib/test-data"
import { resultIdForTest } from "@/lib/result-data"
import { TestFilterBar } from "@/components/tests/test-filter-bar"
import { TestCard } from "@/components/tests/test-card"

type Status = "Not started" | "In progress" | "Completed"

/* Sample student state — which tests are completed / in progress. */
const COMPLETED = new Set(["jee-main-full-01", "cat-quant-full-01"])
const IN_PROGRESS = "cuet-general-01"

function statusOf(test: ExamTest): Status {
  if (COMPLETED.has(test.id)) return "Completed"
  if (test.id === IN_PROGRESS) return "In progress"
  return "Not started"
}

function ctaFor(test: ExamTest, status: Status) {
  if (status === "Completed")
    return {
      href: `/dashboard/results/${resultIdForTest(test.id)}`,
      label: "View result",
      variant: "outline" as const,
    }
  if (status === "In progress")
    return { href: `/dashboard/tests/${test.id}/attempt`, label: "Resume", variant: "gold" as const }
  return { href: `/dashboard/tests/${test.id}`, label: "Start test", variant: "ink" as const }
}

const TABS = ["Available", "In progress", "Completed"] as const
type Tab = (typeof TABS)[number]

export function StudentTestBrowser() {
  const [tab, setTab] = useState<Tab>("Available")
  const [exam, setExam] = useState("All")
  const [type, setType] = useState("All")
  const [difficulty, setDifficulty] = useState("All")

  const filtered = useMemo(() => {
    return examTests
      .map((t) => ({ test: t, status: statusOf(t) }))
      .filter(({ status }) =>
        tab === "Available" ? status === "Not started" : status === tab
      )
      .filter(
        ({ test }) =>
          (exam === "All" || test.examTag === exam) &&
          (type === "All" || test.testType === type) &&
          (difficulty === "All" || test.difficulty === difficulty)
      )
  }, [tab, exam, type, difficulty])

  const counts = useMemo(() => {
    const all = examTests.map(statusOf)
    return {
      Available: all.filter((s) => s === "Not started").length,
      "In progress": all.filter((s) => s === "In progress").length,
      Completed: all.filter((s) => s === "Completed").length,
    } as Record<Tab, number>
  }, [])

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="inline-flex flex-wrap gap-1 rounded-full bg-surface-muted p-1 shadow-[inset_0_0_0_1px_var(--color-line)]">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={cn(
              "focus-ring rounded-full px-4 py-2 font-ui text-[14px] font-medium transition-all duration-150",
              tab === t ? "bg-ink text-cream-text shadow-card" : "text-cocoa hover:text-ink"
            )}
          >
            {t} ({counts[t]})
          </button>
        ))}
      </div>

      <TestFilterBar
        groups={[
          { label: "Exam", options: EXAM_TYPES, active: exam, onChange: setExam },
          { label: "Type", options: TEST_TYPES, active: type, onChange: setType },
          { label: "Difficulty", options: DIFFICULTIES, active: difficulty, onChange: setDifficulty },
        ]}
      />

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(({ test, status }) => (
            <TestCard
              key={test.id}
              test={test}
              status={status}
              cta={ctaFor(test, status)}
              note={status === "In progress" ? "Auto-saved · resume anytime" : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] bg-surface p-12 text-center shadow-[inset_0_0_0_1px_var(--color-line)]">
          <p className="font-serif text-[20px] text-ink">Nothing here yet</p>
          <p className="mt-2 text-[14px] text-cocoa">
            {tab === "Completed"
              ? "Submit a test to see it here with its AI analysis."
              : "Try a different tab or filter."}
          </p>
        </div>
      )}
    </div>
  )
}

"use client"

import { useMemo, useState } from "react"
import {
  DIFFICULTIES,
  EXAM_TYPES,
  TEST_TYPES,
  examTests,
} from "@/lib/test-data"
import { TestFilterBar } from "@/components/tests/test-filter-bar"
import { TestCard } from "@/components/tests/test-card"

export function PublicTestBrowser() {
  const [exam, setExam] = useState("All")
  const [type, setType] = useState("All")
  const [difficulty, setDifficulty] = useState("All")

  const filtered = useMemo(
    () =>
      examTests.filter(
        (t) =>
          (exam === "All" || t.examTag === exam) &&
          (type === "All" || t.testType === type) &&
          (difficulty === "All" || t.difficulty === difficulty)
      ),
    [exam, type, difficulty]
  )

  return (
    <div className="space-y-8">
      <TestFilterBar
        groups={[
          { label: "Exam", options: EXAM_TYPES, active: exam, onChange: setExam },
          { label: "Type", options: TEST_TYPES, active: type, onChange: setType },
          { label: "Difficulty", options: DIFFICULTIES, active: difficulty, onChange: setDifficulty },
        ]}
      />

      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TestCard
              key={t.id}
              test={t}
              cta={{ href: `/dashboard/tests/${t.id}`, label: "Start test", variant: "gold" }}
              note="Instant AI report on submit"
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] bg-surface p-12 text-center shadow-[inset_0_0_0_1px_var(--color-line)]">
          <p className="font-serif text-[20px] text-ink">No tests match these filters</p>
          <p className="mt-2 text-[14px] text-cocoa">Try a different exam, type, or difficulty.</p>
        </div>
      )}
    </div>
  )
}

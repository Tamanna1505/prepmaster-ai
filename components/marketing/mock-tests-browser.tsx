"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { mockTests } from "@/lib/sample-data"
import { MockTestCard } from "@/components/marketing/mock-test-preview"

const TABS = ["Full-length", "Sectional", "Topic drills"] as const
type Tab = (typeof TABS)[number]

/* Sample categorisation — the live mock-test schema lands in Phase 6 (PRD §10). */
const CATEGORY: Record<string, Tab> = Object.fromEntries(
  mockTests.map((t, i) => [t.slug, TABS[i % TABS.length]])
)

const STATE_FOR: Record<string, "live" | "new" | null> = Object.fromEntries(
  mockTests.map((t, i) => [t.slug, i === 0 ? "live" : i === 1 ? "new" : null])
)

export function MockTestsBrowser() {
  const [tab, setTab] = useState<Tab>("Full-length")
  const visible = mockTests.filter((t) => CATEGORY[t.slug] === tab)

  return (
    <div>
      {/* Segmented control */}
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
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((test) => (
          <MockTestCard key={test.slug} test={test} state={STATE_FOR[test.slug]} />
        ))}
      </div>
    </div>
  )
}

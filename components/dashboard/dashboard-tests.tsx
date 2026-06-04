"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { mockTests } from "@/lib/sample-data"
import { recentResults } from "@/lib/dashboard-data"
import { LearnMore, PillLink, Tag } from "@/components/marketing/primitives"
import { ProgressBar } from "@/components/dashboard/progress-card"
import { RecentTestCard } from "@/components/dashboard/recent-test-card"

const TABS = ["Available", "In progress", "Completed"] as const
type Tab = (typeof TABS)[number]

export function DashboardTests() {
  const [tab, setTab] = useState<Tab>("Available")

  return (
    <div>
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

      <div className="mt-8">
        {tab === "Available" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockTests.map((t) => (
              <div
                key={t.slug}
                className="flex h-full flex-col rounded-[18px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 ease-out hover:-translate-y-[2px] hover:shadow-card-hover"
              >
                <Tag tone="outline">{t.examTag}</Tag>
                <h3 className="mt-3 font-serif text-[18px] leading-[1.2] text-ink">{t.title}</h3>
                <p className="mt-2 font-data text-[12px] tracking-[-0.02em] text-taupe">
                  {t.questionCount} questions · {t.durationMinutes} min · {t.difficulty}
                </p>
                <div className="mt-auto pt-4">
                  <PillLink href="/dashboard/tests" variant="ink" size="sm">
                    Start test
                  </PillLink>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "In progress" ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[18px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)]">
              <div className="flex items-center justify-between">
                <Tag tone="live">
                  <span className="size-1.5 rounded-full bg-live-deep" /> Resumable
                </Tag>
                <span className="font-ui text-[12px] text-taupe">Auto-saved 2h ago</span>
              </div>
              <h3 className="mt-3 font-serif text-[18px] leading-[1.2] text-ink">
                CAT Quant — Full Mock #08
              </h3>
              <p className="mt-2 font-data text-[12px] tracking-[-0.02em] text-taupe">
                34/60 answered · 41 min left
              </p>
              <div className="mt-4">
                <ProgressBar pct={57} />
              </div>
              <div className="mt-4">
                <LearnMore label="Resume attempt" href="/dashboard/tests" />
              </div>
            </div>
          </div>
        ) : null}

        {tab === "Completed" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentResults.map((r) => (
              <RecentTestCard key={r.id} result={r} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

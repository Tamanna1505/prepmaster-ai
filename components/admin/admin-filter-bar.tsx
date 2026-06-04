"use client"

import type { ReactNode } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

export type FilterGroup = {
  label: string
  options: string[]
  active: string
  onChange: (value: string) => void
}

/* Reusable admin search + chip-filter bar with an optional action slot. */
export function AdminFilterBar({
  search,
  groups = [],
  action,
}: {
  search?: { value: string; onChange: (v: string) => void; placeholder?: string }
  groups?: FilterGroup[]
  action?: ReactNode
}) {
  return (
    <div className="rounded-[18px] bg-cream-50 p-4 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {search ? (
          <div className="relative lg:w-80">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-taupe" />
            <input
              type="search"
              value={search.value}
              onChange={(e) => search.onChange(e.target.value)}
              placeholder={search.placeholder ?? "Search"}
              className="focus-ring w-full rounded-full bg-surface py-2.5 pl-10 pr-4 font-ui text-[14px] text-ink shadow-[inset_0_0_0_1px_var(--color-line)] placeholder:text-taupe"
            />
          </div>
        ) : (
          <span />
        )}
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>

      {groups.length > 0 ? (
        <div className="mt-3 flex flex-col gap-2.5 border-t border-line pt-3">
          {groups.map((g) => (
            <div key={g.label} className="flex flex-wrap items-center gap-2">
              <span className="w-20 shrink-0 font-ui text-[12px] font-semibold uppercase tracking-[0.1em] text-taupe">
                {g.label}
              </span>
              {g.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => g.onChange(opt)}
                  className={cn(
                    "focus-ring rounded-full px-3.5 py-1.5 font-ui text-[13px] font-medium transition-all duration-150",
                    g.active === opt
                      ? "bg-ink text-cream-text"
                      : "bg-surface text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-surface-muted"
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

"use client"

import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

/* Reusable, controlled search + chip filter bar (student library + admin). */
export function CourseFilterBar({
  query,
  onQueryChange,
  placeholder = "Search courses",
  categories,
  activeCategory,
  onCategoryChange,
  statuses,
  activeStatus,
  onStatusChange,
}: {
  query: string
  onQueryChange: (value: string) => void
  placeholder?: string
  categories: string[]
  activeCategory: string
  onCategoryChange: (value: string) => void
  statuses?: string[]
  activeStatus?: string
  onStatusChange?: (value: string) => void
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => onCategoryChange(c)}
              className={cn(
                "focus-ring rounded-full px-4 py-2 font-ui text-[14px] font-medium transition-all duration-150",
                activeCategory === c
                  ? "bg-ink text-cream-text"
                  : "bg-surface text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-surface-muted"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative lg:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-taupe" />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={placeholder}
            className="focus-ring w-full rounded-full bg-surface py-2.5 pl-10 pr-4 font-ui text-[14px] text-ink shadow-[inset_0_0_0_1px_var(--color-line)] placeholder:text-taupe"
          />
        </div>
      </div>

      {statuses && onStatusChange ? (
        <div className="flex flex-wrap items-center gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onStatusChange(s)}
              className={cn(
                "focus-ring rounded-full px-3 py-1.5 font-ui text-[13px] font-medium transition-all duration-150",
                activeStatus === s
                  ? "bg-gold-200 text-gold-ink"
                  : "text-taupe hover:text-ink"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

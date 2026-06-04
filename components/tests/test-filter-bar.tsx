"use client"

import { cn } from "@/lib/utils"

type Group = {
  label: string
  options: string[]
  active: string
  onChange: (value: string) => void
}

function ChipGroup({ label, options, active, onChange }: Group) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-ui text-[12px] font-semibold uppercase tracking-[0.1em] text-taupe">
        {label}
      </span>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={cn(
            "focus-ring rounded-full px-3.5 py-1.5 font-ui text-[13px] font-medium transition-all duration-150",
            active === opt
              ? "bg-ink text-cream-text"
              : "bg-surface text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-surface-muted"
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

export function TestFilterBar({ groups }: { groups: Group[] }) {
  return (
    <div className="flex flex-col gap-3 rounded-[18px] bg-cream-50 p-4 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-5">
      {groups.map((g) => (
        <ChipGroup key={g.label} {...g} />
      ))}
    </div>
  )
}

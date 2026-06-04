import { cn } from "@/lib/utils"

export type PaletteStatus = "not-visited" | "answered" | "not-answered" | "marked"

export type PaletteItem = { id: string; number: number; status: PaletteStatus }
export type PaletteGroup = { name: string; items: PaletteItem[] }

const swatch: Record<PaletteStatus, string> = {
  answered: "bg-teal text-cream-text",
  "not-answered": "bg-live-tint text-live-deep",
  marked: "bg-orange text-cream-text",
  "not-visited": "bg-surface text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)]",
}

const legend: { status: PaletteStatus; label: string }[] = [
  { status: "answered", label: "Answered" },
  { status: "not-answered", label: "Not answered" },
  { status: "marked", label: "Marked for review" },
  { status: "not-visited", label: "Not visited" },
]

export function QuestionPalette({
  groups,
  currentId,
  onJump,
}: {
  groups: PaletteGroup[]
  currentId: string
  onJump: (id: string) => void
}) {
  return (
    <div className="rounded-[18px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)]">
      <p className="eyebrow text-taupe">Question palette</p>

      <div className="mt-5 space-y-5">
        {groups.map((g) => (
          <div key={g.name}>
            {groups.length > 1 ? (
              <p className="mb-2 font-ui text-[12px] font-semibold text-cocoa">{g.name}</p>
            ) : null}
            <div className="grid grid-cols-6 gap-2 sm:grid-cols-7">
              {g.items.map((it) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => onJump(it.id)}
                  aria-current={it.id === currentId ? "true" : undefined}
                  className={cn(
                    "focus-ring grid size-9 place-items-center rounded-[10px] font-data text-[13px] font-semibold transition-transform hover:-translate-y-px",
                    swatch[it.status],
                    it.id === currentId && "ring-2 ring-ink ring-offset-2 ring-offset-surface"
                  )}
                >
                  {it.number}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 border-t border-line pt-4">
        {legend.map((l) => (
          <div key={l.status} className="flex items-center gap-2">
            <span className={cn("size-4 rounded-[6px]", swatch[l.status])} />
            <span className="font-ui text-[12px] text-cocoa">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

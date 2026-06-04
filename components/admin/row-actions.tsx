import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

/* Compact table-row actions: Edit (link) + optional Publish toggle + Delete.
   Publish/delete are visual only in this phase. */
export function RowActions({
  editHref,
  status,
  onTogglePublish,
  onDelete,
}: {
  editHref: string
  status?: "Published" | "Draft"
  onTogglePublish?: () => void
  onDelete?: () => void
}) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <Link
        href={editHref}
        className="focus-ring inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 font-ui text-[12px] font-semibold text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] transition-colors hover:bg-surface-muted hover:text-ink"
      >
        <Pencil className="size-3.5" strokeWidth={2} /> Edit
      </Link>
      {status && onTogglePublish ? (
        <button
          type="button"
          onClick={onTogglePublish}
          className={cn(
            "focus-ring rounded-full px-2.5 py-1.5 font-ui text-[12px] font-semibold transition-colors",
            status === "Published"
              ? "text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-surface-muted hover:text-ink"
              : "bg-gold-200 text-gold-ink hover:-translate-y-px"
          )}
        >
          {status === "Published" ? "Unpublish" : "Publish"}
        </button>
      ) : null}
      {onDelete ? (
        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete"
          className="focus-ring inline-flex items-center rounded-full px-2.5 py-1.5 font-ui text-[12px] font-semibold text-brand-error shadow-[inset_0_0_0_1px_rgba(194,80,47,0.3)] transition-colors hover:bg-[rgba(194,80,47,0.08)]"
        >
          <Trash2 className="size-3.5" strokeWidth={2} />
        </button>
      ) : null}
    </div>
  )
}

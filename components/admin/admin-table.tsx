import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type Align = "left" | "right" | "center"

export type AdminColumn = {
  header: string
  align?: Align
  /** Optional Tailwind width/utility classes for the column cells. */
  className?: string
}

export type AdminRow = {
  key: string
  cells: ReactNode[]
}

const alignClass: Record<Align, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
}

/* Reusable, responsive admin table. Pass plain header strings and rows of
   pre-rendered cells — keeps each page in control of its own formatting. */
export function AdminTable({
  columns,
  rows,
  minWidth = 720,
  empty = "No records yet.",
}: {
  columns: AdminColumn[]
  rows: AdminRow[]
  minWidth?: number
  empty?: string
}) {
  return (
    <div className="overflow-x-auto rounded-[18px] bg-surface shadow-[inset_0_0_0_1px_var(--color-line)]">
      <table className="w-full text-left" style={{ minWidth }}>
        <thead>
          <tr className="border-b border-line">
            {columns.map((col) => (
              <th
                key={col.header}
                className={cn("eyebrow px-5 py-4 text-taupe", alignClass[col.align ?? "left"])}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-10 text-center font-ui text-[14px] text-taupe">
                {empty}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.key} className="transition-colors hover:bg-surface-muted">
                {row.cells.map((cell, i) => (
                  <td
                    key={i}
                    className={cn(
                      "px-5 py-4 font-ui text-[14px] text-cocoa",
                      alignClass[columns[i]?.align ?? "left"],
                      columns[i]?.className
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

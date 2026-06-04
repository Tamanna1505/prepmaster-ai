"use client"

import { useMemo, useState } from "react"
import { Plus, Star } from "lucide-react"
import { adminBlog, BLOG_CATEGORIES } from "@/lib/admin-data"
import { PillLink } from "@/components/marketing/primitives"
import { AdminTable } from "@/components/admin/admin-table"
import { AdminFilterBar } from "@/components/admin/admin-filter-bar"
import { StatusBadge } from "@/components/admin/status-badge"
import { RowActions } from "@/components/admin/row-actions"

type Status = "Published" | "Draft"

const CATEGORIES = ["All", ...BLOG_CATEGORIES]
const STATUSES = ["All", "Published", "Draft"]

export function BlogManager() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [status, setStatus] = useState("All")
  const [statusOverrides, setStatusOverrides] = useState<Record<string, Status>>({})
  const [removed, setRemoved] = useState<Set<string>>(new Set())

  const statusOf = (id: string, initial: Status): Status => statusOverrides[id] ?? initial

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return adminBlog
      .filter((p) => !removed.has(p.id))
      .map((p) => ({ ...p, liveStatus: statusOf(p.id, p.status) }))
      .filter(
        (p) =>
          (category === "All" || p.category === category) &&
          (status === "All" || p.liveStatus === status) &&
          (!q || p.title.toLowerCase().includes(q) || p.author.toLowerCase().includes(q))
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, status, statusOverrides, removed])

  return (
    <div className="space-y-6">
      <AdminFilterBar
        search={{ value: query, onChange: setQuery, placeholder: "Search title or author" }}
        groups={[
          { label: "Category", options: CATEGORIES, active: category, onChange: setCategory },
          { label: "Status", options: STATUSES, active: status, onChange: setStatus },
        ]}
        action={
          <PillLink href="/admin/blog/new" variant="ink" size="md">
            <Plus className="size-4" strokeWidth={2} /> Write post
          </PillLink>
        }
      />

      <AdminTable
        minWidth={920}
        columns={[
          { header: "Title" },
          { header: "Category" },
          { header: "Author" },
          { header: "Published" },
          { header: "Status" },
          { header: "Actions", align: "right" },
        ]}
        rows={visible.map((p) => ({
          key: p.id,
          cells: [
            <span key="t" className="flex items-center gap-2 font-medium text-ink">
              {p.featured ? <Star className="size-3.5 fill-gold-300 text-gold-300" strokeWidth={1.5} /> : null}
              {p.title}
            </span>,
            p.category,
            p.author,
            p.publishedAt
              ? new Date(p.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
              : "—",
            <StatusBadge key="s" status={p.liveStatus} />,
            <RowActions
              key="a"
              editHref={`/admin/blog/${p.id}/edit`}
              status={p.liveStatus}
              onTogglePublish={() =>
                setStatusOverrides((m) => ({
                  ...m,
                  [p.id]: p.liveStatus === "Published" ? "Draft" : "Published",
                }))
              }
              onDelete={() => setRemoved((s) => new Set(s).add(p.id))}
            />,
          ],
        }))}
      />
      <p className="font-ui text-[12px] text-taupe">
        Publish, unpublish, and delete are visual only — changes reset on reload.
      </p>
    </div>
  )
}

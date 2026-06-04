"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { courses, courseTotals, getCourseContent } from "@/lib/sample-data"
import { cn } from "@/lib/utils"
import { PillLink, Tag } from "@/components/marketing/primitives"
import { AdminTable } from "@/components/admin/admin-table"
import { CourseFilterBar } from "@/components/courses/course-filter-bar"

type Status = "Published" | "Draft"

const baseRows = courses.map((c, i) => {
  const content = getCourseContent(c.slug)
  const totalLessons = content ? courseTotals(content).totalLessons : 0
  return {
    slug: c.slug,
    title: c.title,
    examTag: c.examTag,
    lessons: totalLessons,
    enrolled: c.studentsEnrolled,
    completion: Math.min(92, Math.round(c.rating * 16)),
    initialStatus: (i === 4 ? "Draft" : "Published") as Status,
  }
})

const CATEGORIES = ["All", ...Array.from(new Set(courses.map((c) => c.examTag)))]
const STATUSES = ["All", "Published", "Draft"]

export function AdminCourseManager() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [status, setStatus] = useState("All")
  // Ephemeral, visual-only state (no backend in this phase).
  const [statusOverrides, setStatusOverrides] = useState<Record<string, Status>>({})
  const [removed, setRemoved] = useState<Set<string>>(new Set())

  const statusOf = (slug: string, initial: Status): Status => statusOverrides[slug] ?? initial

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return baseRows
      .filter((r) => !removed.has(r.slug))
      .map((r) => ({ ...r, status: statusOf(r.slug, r.initialStatus) }))
      .filter((r) => {
        const matchesCat = category === "All" || r.examTag === category
        const matchesStatus = status === "All" || r.status === status
        const matchesQuery = !q || r.title.toLowerCase().includes(q)
        return matchesCat && matchesStatus && matchesQuery
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, status, statusOverrides, removed])

  const togglePublish = (slug: string, current: Status) =>
    setStatusOverrides((m) => ({ ...m, [slug]: current === "Published" ? "Draft" : "Published" }))

  const remove = (slug: string) =>
    setRemoved((s) => {
      const next = new Set(s)
      next.add(slug)
      return next
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CourseFilterBar
          query={query}
          onQueryChange={setQuery}
          placeholder="Search courses"
          categories={CATEGORIES}
          activeCategory={category}
          onCategoryChange={setCategory}
          statuses={STATUSES}
          activeStatus={status}
          onStatusChange={setStatus}
        />
        <PillLink href="/admin/courses/new" variant="ink" size="md" className="shrink-0">
          <Plus className="size-4" strokeWidth={2} /> Add course
        </PillLink>
      </div>

      <AdminTable
        minWidth={860}
        columns={[
          { header: "Course" },
          { header: "Lessons", align: "right" },
          { header: "Enrolled", align: "right" },
          { header: "Completion", align: "right" },
          { header: "Status" },
          { header: "Actions", align: "right" },
        ]}
        rows={visible.map((r) => ({
          key: r.slug,
          cells: [
            <div key="c">
              <p className="font-medium text-ink">{r.title}</p>
              <p className="font-ui text-[12px] text-taupe">{r.examTag}</p>
            </div>,
            <span key="l" className="font-data tracking-[-0.02em]">
              {r.lessons}
            </span>,
            <span key="e" className="font-data tracking-[-0.02em]">
              {r.enrolled.toLocaleString()}
            </span>,
            <span key="cm" className="font-data tracking-[-0.02em] text-teal-deep">
              {r.completion}%
            </span>,
            <Tag key="s" tone={r.status === "Published" ? "teal" : "outline"}>
              {r.status}
            </Tag>,
            <div key="a" className="flex items-center justify-end gap-1.5">
              <Link
                href={`/admin/courses/${r.slug}/edit`}
                className="focus-ring inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 font-ui text-[12px] font-semibold text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] transition-colors hover:bg-surface-muted hover:text-ink"
              >
                <Pencil className="size-3.5" strokeWidth={2} /> Edit
              </Link>
              <button
                type="button"
                onClick={() => togglePublish(r.slug, r.status)}
                className={cn(
                  "focus-ring rounded-full px-2.5 py-1.5 font-ui text-[12px] font-semibold transition-colors",
                  r.status === "Published"
                    ? "text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-surface-muted hover:text-ink"
                    : "bg-gold-200 text-gold-ink hover:-translate-y-px"
                )}
              >
                {r.status === "Published" ? "Unpublish" : "Publish"}
              </button>
              <button
                type="button"
                onClick={() => remove(r.slug)}
                aria-label={`Delete ${r.title}`}
                className="focus-ring inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 font-ui text-[12px] font-semibold text-brand-error shadow-[inset_0_0_0_1px_rgba(194,80,47,0.3)] transition-colors hover:bg-[rgba(194,80,47,0.08)]"
              >
                <Trash2 className="size-3.5" strokeWidth={2} />
              </button>
            </div>,
          ],
        }))}
      />
      <p className="font-ui text-[12px] text-taupe">
        Publish, unpublish, and delete are visual only in this phase — changes reset on reload.
      </p>
    </div>
  )
}

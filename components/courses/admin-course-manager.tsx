"use client"

import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { courses, courseTotals, getCourseContent } from "@/lib/sample-data"
import { PillLink } from "@/components/marketing/primitives"
import { AdminTable } from "@/components/admin/admin-table"
import { AdminFilterBar } from "@/components/admin/admin-filter-bar"
import { StatusBadge } from "@/components/admin/status-badge"
import { RowActions } from "@/components/admin/row-actions"

type Status = "Published" | "Draft"

const PRICES = ["Free", "₹499", "₹1,299"]

const baseRows = courses.map((c, i) => {
  const content = getCourseContent(c.slug)
  const totalLessons = content ? courseTotals(content).totalLessons : 0
  return {
    slug: c.slug,
    title: c.title,
    examTag: c.examTag,
    level: c.difficulty,
    lessons: totalLessons,
    enrolled: c.studentsEnrolled,
    price: PRICES[i % PRICES.length],
    initialStatus: (i === 4 ? "Draft" : "Published") as Status,
  }
})

const EXAMS = ["All", ...Array.from(new Set(courses.map((c) => c.examTag)))]
const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"]
const STATUSES = ["All", "Published", "Draft"]

export function AdminCourseManager() {
  const [query, setQuery] = useState("")
  const [exam, setExam] = useState("All")
  const [level, setLevel] = useState("All")
  const [status, setStatus] = useState("All")
  const [statusOverrides, setStatusOverrides] = useState<Record<string, Status>>({})
  const [removed, setRemoved] = useState<Set<string>>(new Set())

  const statusOf = (slug: string, initial: Status): Status => statusOverrides[slug] ?? initial

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return baseRows
      .filter((r) => !removed.has(r.slug))
      .map((r) => ({ ...r, status: statusOf(r.slug, r.initialStatus) }))
      .filter(
        (r) =>
          (exam === "All" || r.examTag === exam) &&
          (level === "All" || r.level === level) &&
          (status === "All" || r.status === status) &&
          (!q || r.title.toLowerCase().includes(q))
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, exam, level, status, statusOverrides, removed])

  const togglePublish = (slug: string, current: Status) =>
    setStatusOverrides((m) => ({ ...m, [slug]: current === "Published" ? "Draft" : "Published" }))
  const remove = (slug: string) => setRemoved((s) => new Set(s).add(slug))

  return (
    <div className="space-y-6">
      <AdminFilterBar
        search={{ value: query, onChange: setQuery, placeholder: "Search courses" }}
        groups={[
          { label: "Exam", options: EXAMS, active: exam, onChange: setExam },
          { label: "Level", options: LEVELS, active: level, onChange: setLevel },
          { label: "Status", options: STATUSES, active: status, onChange: setStatus },
        ]}
        action={
          <PillLink href="/admin/courses/new" variant="ink" size="md">
            <Plus className="size-4" strokeWidth={2} /> Add course
          </PillLink>
        }
      />

      <AdminTable
        minWidth={920}
        columns={[
          { header: "Course" },
          { header: "Exam" },
          { header: "Level" },
          { header: "Lessons", align: "right" },
          { header: "Enrolled", align: "right" },
          { header: "Price", align: "right" },
          { header: "Status" },
          { header: "Actions", align: "right" },
        ]}
        rows={visible.map((r) => ({
          key: r.slug,
          cells: [
            <span key="c" className="font-medium text-ink">
              {r.title}
            </span>,
            r.examTag,
            r.level,
            <span key="l" className="font-data tracking-[-0.02em]">
              {r.lessons}
            </span>,
            <span key="e" className="font-data tracking-[-0.02em]">
              {r.enrolled.toLocaleString()}
            </span>,
            <span key="p" className="font-data tracking-[-0.02em] text-ink">
              {r.price}
            </span>,
            <StatusBadge key="s" status={r.status} />,
            <RowActions
              key="a"
              editHref={`/admin/courses/${r.slug}/edit`}
              status={r.status}
              onTogglePublish={() => togglePublish(r.slug, r.status)}
              onDelete={() => remove(r.slug)}
            />,
          ],
        }))}
      />
      <p className="font-ui text-[12px] text-taupe">
        Publish, unpublish, and delete are visual only in this phase — changes reset on reload.
      </p>
    </div>
  )
}

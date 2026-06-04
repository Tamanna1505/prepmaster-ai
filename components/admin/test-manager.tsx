"use client"

import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { adminTests } from "@/lib/admin-data"
import { PillLink, Tag } from "@/components/marketing/primitives"
import { AdminTable } from "@/components/admin/admin-table"
import { AdminFilterBar } from "@/components/admin/admin-filter-bar"
import { StatusBadge } from "@/components/admin/status-badge"
import { RowActions } from "@/components/admin/row-actions"

type Status = "Published" | "Draft"

const EXAMS = ["All", ...Array.from(new Set(adminTests.map((t) => t.examTag)))]
const TYPES = ["All", "Full-length", "Sectional", "Topic drill"]
const STATUSES = ["All", "Published", "Draft"]

export function TestManager() {
  const [query, setQuery] = useState("")
  const [exam, setExam] = useState("All")
  const [type, setType] = useState("All")
  const [status, setStatus] = useState("All")
  const [statusOverrides, setStatusOverrides] = useState<Record<string, Status>>({})
  const [removed, setRemoved] = useState<Set<string>>(new Set())

  const statusOf = (id: string, initial: Status): Status => statusOverrides[id] ?? initial

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return adminTests
      .filter((t) => !removed.has(t.id))
      .map((t) => ({ ...t, liveStatus: statusOf(t.id, t.status) }))
      .filter(
        (t) =>
          (exam === "All" || t.examTag === exam) &&
          (type === "All" || t.testType === type) &&
          (status === "All" || t.liveStatus === status) &&
          (!q || t.title.toLowerCase().includes(q))
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, exam, type, status, statusOverrides, removed])

  return (
    <div className="space-y-6">
      <AdminFilterBar
        search={{ value: query, onChange: setQuery, placeholder: "Search tests" }}
        groups={[
          { label: "Exam", options: EXAMS, active: exam, onChange: setExam },
          { label: "Type", options: TYPES, active: type, onChange: setType },
          { label: "Status", options: STATUSES, active: status, onChange: setStatus },
        ]}
        action={
          <PillLink href="/admin/tests/new" variant="ink" size="md">
            <Plus className="size-4" strokeWidth={2} /> Create test
          </PillLink>
        }
      />

      <AdminTable
        minWidth={940}
        columns={[
          { header: "Test" },
          { header: "Exam" },
          { header: "Type" },
          { header: "Questions", align: "right" },
          { header: "Marks", align: "right" },
          { header: "Level" },
          { header: "Status" },
          { header: "Actions", align: "right" },
        ]}
        rows={visible.map((t) => ({
          key: t.id,
          cells: [
            <span key="t" className="font-medium text-ink">
              {t.title}
            </span>,
            t.examTag,
            <Tag key="ty" tone="gold">
              {t.testType}
            </Tag>,
            <span key="q" className="font-data tracking-[-0.02em]">
              {t.questions}
            </span>,
            <span key="m" className="font-data tracking-[-0.02em]">
              {t.totalMarks}
            </span>,
            <StatusBadge key="d" status={t.difficulty} />,
            <StatusBadge key="s" status={t.liveStatus} />,
            <RowActions
              key="a"
              editHref={`/admin/tests/${t.id}/edit`}
              status={t.liveStatus}
              onTogglePublish={() =>
                setStatusOverrides((m) => ({
                  ...m,
                  [t.id]: t.liveStatus === "Published" ? "Draft" : "Published",
                }))
              }
              onDelete={() => setRemoved((s) => new Set(s).add(t.id))}
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

"use client"

import { useMemo, useState } from "react"
import { Plus } from "lucide-react"
import { adminQuestions, QUESTION_SECTIONS } from "@/lib/admin-data"
import { PillLink, Tag } from "@/components/marketing/primitives"
import { AdminTable } from "@/components/admin/admin-table"
import { AdminFilterBar } from "@/components/admin/admin-filter-bar"
import { StatusBadge } from "@/components/admin/status-badge"
import { RowActions } from "@/components/admin/row-actions"

const SECTIONS = ["All", ...QUESTION_SECTIONS]
const TYPES = ["All", "MCQ single", "MCQ multi", "Numeric"]
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"]

export function QuestionManager() {
  const [query, setQuery] = useState("")
  const [section, setSection] = useState("All")
  const [type, setType] = useState("All")
  const [difficulty, setDifficulty] = useState("All")
  const [removed, setRemoved] = useState<Set<string>>(new Set())

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return adminQuestions
      .filter((row) => !removed.has(row.id))
      .filter(
        (row) =>
          (section === "All" || row.section === section) &&
          (type === "All" || row.type === type) &&
          (difficulty === "All" || row.difficulty === difficulty) &&
          (!q || row.stem.toLowerCase().includes(q) || row.topic.toLowerCase().includes(q))
      )
  }, [query, section, type, difficulty, removed])

  return (
    <div className="space-y-6">
      <AdminFilterBar
        search={{ value: query, onChange: setQuery, placeholder: "Search question text or topic" }}
        groups={[
          { label: "Section", options: SECTIONS, active: section, onChange: setSection },
          { label: "Type", options: TYPES, active: type, onChange: setType },
          { label: "Level", options: DIFFICULTIES, active: difficulty, onChange: setDifficulty },
        ]}
        action={
          <PillLink href="/admin/questions/new" variant="ink" size="md">
            <Plus className="size-4" strokeWidth={2} /> Add question
          </PillLink>
        }
      />

      <AdminTable
        minWidth={900}
        columns={[
          { header: "ID" },
          { header: "Question" },
          { header: "Section" },
          { header: "Topic" },
          { header: "Type" },
          { header: "Level" },
          { header: "Marks", align: "right" },
          { header: "Actions", align: "right" },
        ]}
        rows={visible.map((row) => ({
          key: row.id,
          cells: [
            <span key="id" className="font-data text-[12px] tracking-[-0.01em] text-taupe">
              {row.id}
            </span>,
            <span key="s" className="line-clamp-1 block max-w-xs font-medium text-ink">
              {row.stem}
            </span>,
            row.section,
            row.topic,
            <Tag key="t" tone="outline">
              {row.type}
            </Tag>,
            <StatusBadge key="d" status={row.difficulty} />,
            <span key="m" className="font-data tracking-[-0.02em] text-ink">
              +{row.marks}
              {row.negativeMarks < 0 ? ` / ${row.negativeMarks}` : ""}
            </span>,
            <RowActions
              key="a"
              editHref={`/admin/questions/${row.id}/edit`}
              onDelete={() => setRemoved((s) => new Set(s).add(row.id))}
            />,
          ],
        }))}
      />
      <p className="font-ui text-[12px] text-taupe">Delete is visual only — changes reset on reload.</p>
    </div>
  )
}

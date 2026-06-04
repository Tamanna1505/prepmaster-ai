"use client"

import { useState } from "react"
import { Check, Plus, Trash2 } from "lucide-react"
import { adminQuestions, type AdminTestRow } from "@/lib/admin-data"
import { cn } from "@/lib/utils"
import { PillButton, Tag } from "@/components/marketing/primitives"
import {
  AdminFormSection,
  AdminInput,
  AdminSelect,
  AdminTextarea,
  AdminToggle,
} from "@/components/admin/admin-form-section"

export type TestFormInitial = AdminTestRow

const EXAM_TYPES = ["CAT", "CUET", "MBA Entrance", "Aptitude", "JEE", "NEET", "UPSC", "SSC", "GATE"]
const TEST_TYPES = ["Full-length", "Sectional", "Topic drill"]
const LEVELS = ["Easy", "Medium", "Hard"]

type BSection = { uid: string; name: string; questionIds: string[] }

let UID = 0
const uid = () => `s-${UID++}`

export function TestForm({ mode, initial }: { mode: "new" | "edit"; initial?: TestFormInitial }) {
  const [published, setPublished] = useState(initial?.status === "Published")
  const [sections, setSections] = useState<BSection[]>([
    { uid: uid(), name: "Section 1", questionIds: [] },
  ])

  const addSection = () =>
    setSections((s) => [...s, { uid: uid(), name: `Section ${s.length + 1}`, questionIds: [] }])
  const removeSection = (su: string) => setSections((s) => s.filter((x) => x.uid !== su))
  const renameSection = (su: string, name: string) =>
    setSections((s) => s.map((x) => (x.uid === su ? { ...x, name } : x)))
  const toggleQuestion = (su: string, qid: string) =>
    setSections((s) =>
      s.map((x) =>
        x.uid === su
          ? {
              ...x,
              questionIds: x.questionIds.includes(qid)
                ? x.questionIds.filter((id) => id !== qid)
                : [...x.questionIds, qid],
            }
          : x
      )
    )

  const sectionMarks = (sec: BSection) =>
    adminQuestions
      .filter((q) => sec.questionIds.includes(q.id))
      .reduce((sum, q) => sum + q.marks, 0)

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <AdminFormSection title="Test details">
        <AdminInput id="title" label="Title" full placeholder="e.g. CAT Quant — Full Mock #02" defaultValue={initial?.title} />
        <AdminTextarea id="description" label="Description" rows={3} placeholder="Instructions and rules shown before the test…" defaultValue={initial?.description} />
        <AdminSelect id="examTag" label="Exam type" options={EXAM_TYPES} defaultValue={initial?.examTag} />
        <AdminSelect id="testType" label="Test type" options={TEST_TYPES} defaultValue={initial?.testType} />
        <AdminInput id="durationMinutes" label="Duration (minutes)" type="number" defaultValue={initial?.durationMinutes ?? 60} />
        <AdminInput id="totalMarks" label="Total marks" type="number" defaultValue={initial?.totalMarks ?? 0} />
        <AdminSelect id="difficulty" label="Difficulty" options={LEVELS} defaultValue={initial?.difficulty} />
        <AdminToggle
          label="Published"
          description="Only published tests are visible to students."
          checked={published}
          onChange={() => setPublished((v) => !v)}
        />
      </AdminFormSection>

      {/* Sections & question selection */}
      <AdminFormSection
        title="Sections & questions"
        description="Configure sections and pick questions from the bank for each."
        cols={1}
      >
        <div className="space-y-4">
          {sections.map((sec, i) => (
            <div key={sec.uid} className="rounded-[16px] bg-surface-muted p-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
              <div className="flex items-center gap-2">
                <span className="font-data text-[12px] text-taupe">S{i + 1}</span>
                <input
                  value={sec.name}
                  onChange={(e) => renameSection(sec.uid, e.target.value)}
                  placeholder="Section name"
                  className="focus-ring flex-1 rounded-[10px] bg-surface px-3 py-2 font-ui text-[14px] font-medium text-ink shadow-[inset_0_0_0_1px_var(--color-line)]"
                />
                <Tag tone="teal">
                  {sec.questionIds.length} Q · {sectionMarks(sec)} marks
                </Tag>
                <button
                  type="button"
                  onClick={() => removeSection(sec.uid)}
                  aria-label="Remove section"
                  className="focus-ring grid size-8 place-items-center rounded-full text-brand-error hover:bg-[rgba(194,80,47,0.08)]"
                >
                  <Trash2 className="size-4" strokeWidth={2} />
                </button>
              </div>

              {/* Question picker */}
              <p className="mt-3 mb-2 font-ui text-[12px] font-semibold uppercase tracking-[0.1em] text-taupe">
                Select questions
              </p>
              <div className="space-y-1.5">
                {adminQuestions.map((q) => {
                  const checked = sec.questionIds.includes(q.id)
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => toggleQuestion(sec.uid, q.id)}
                      className={cn(
                        "focus-ring flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-left transition-colors",
                        checked ? "bg-teal-tint" : "bg-surface hover:bg-cream-100"
                      )}
                    >
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-[6px] transition-colors",
                          checked ? "bg-teal text-cream-text" : "bg-surface-muted shadow-[inset_0_0_0_1px_var(--color-line)]"
                        )}
                      >
                        {checked ? <Check className="size-3.5" strokeWidth={3} /> : null}
                      </span>
                      <span className="line-clamp-1 flex-1 font-ui text-[13px] text-cocoa">{q.stem}</span>
                      <span className="font-data text-[11px] tracking-[-0.02em] text-taupe">
                        {q.topic} · +{q.marks}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addSection}
          className="focus-ring mt-1 inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-ui text-[13px] font-semibold text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] transition-colors hover:bg-surface-muted hover:text-ink"
        >
          <Plus className="size-4" strokeWidth={2} /> Add section
        </button>
      </AdminFormSection>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <PillButton type="submit" variant="outline" size="lg">
          Save draft
        </PillButton>
        <PillButton type="submit" variant="ink" size="lg">
          {mode === "edit" ? "Save & publish" : "Create test"}
        </PillButton>
      </div>
      <p className="text-right font-ui text-[12px] text-taupe">
        Form is visual only — no data is saved in this phase.
      </p>
    </form>
  )
}

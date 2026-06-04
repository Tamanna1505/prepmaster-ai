"use client"

import { useState } from "react"
import { GripVertical, Plus, Trash2, Video, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { PillButton } from "@/components/marketing/primitives"
import { fieldClass, fieldLabelClass } from "@/components/auth/auth-shell"

export type CourseFormInitial = {
  title: string
  slug: string
  summary: string
  description: string
  category: string
  examTag: string
  level: string
  durationHours: number
  price: number
  thumbnailUrl: string
  published: boolean
  modules: { title: string; lessons: { title: string; kind: "video" | "reading"; durationMinutes: number }[] }[]
}

type BLesson = { uid: string; title: string; kind: "video" | "reading"; durationMinutes: number }
type BModule = { uid: string; title: string; lessons: BLesson[] }

const CATEGORIES = ["Full course", "Crash course", "Topic track", "Test series"]
const EXAM_TYPES = ["CAT", "CUET", "MBA Entrance", "Aptitude", "JEE", "NEET", "UPSC", "SSC", "GATE", "Banking"]
const LEVELS = ["Beginner", "Intermediate", "Advanced"]

/* Builder-only unique ids for React keys (not persisted). */
let UID = 0
const uid = () => `b-${UID++}`

export function CourseForm({
  mode,
  initial,
}: {
  mode: "new" | "edit"
  initial?: CourseFormInitial
}) {
  const [published, setPublished] = useState(initial?.published ?? false)
  const [modules, setModules] = useState<BModule[]>(
    initial?.modules.map((m) => ({
      uid: uid(),
      title: m.title,
      lessons: m.lessons.map((l) => ({ uid: uid(), ...l })),
    })) ?? [{ uid: uid(), title: "Module 1", lessons: [{ uid: uid(), title: "", kind: "video", durationMinutes: 10 }] }]
  )

  const addModule = () =>
    setModules((ms) => [...ms, { uid: uid(), title: `Module ${ms.length + 1}`, lessons: [] }])
  const removeModule = (mu: string) => setModules((ms) => ms.filter((m) => m.uid !== mu))
  const setModuleTitle = (mu: string, title: string) =>
    setModules((ms) => ms.map((m) => (m.uid === mu ? { ...m, title } : m)))
  const addLesson = (mu: string) =>
    setModules((ms) =>
      ms.map((m) =>
        m.uid === mu
          ? { ...m, lessons: [...m.lessons, { uid: uid(), title: "", kind: "video", durationMinutes: 10 }] }
          : m
      )
    )
  const removeLesson = (mu: string, lu: string) =>
    setModules((ms) =>
      ms.map((m) => (m.uid === mu ? { ...m, lessons: m.lessons.filter((l) => l.uid !== lu) } : m))
    )
  const updateLesson = (mu: string, lu: string, patch: Partial<BLesson>) =>
    setModules((ms) =>
      ms.map((m) =>
        m.uid === mu
          ? { ...m, lessons: m.lessons.map((l) => (l.uid === lu ? { ...l, ...patch } : l)) }
          : m
      )
    )

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      {/* Course details */}
      <section className="rounded-[20px] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-7">
        <h2 className="font-serif text-[20px] text-ink">Course details</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="title" className={fieldLabelClass}>
              Title
            </label>
            <input id="title" name="title" defaultValue={initial?.title} placeholder="e.g. CAT Quant — Complete Course" className={fieldClass} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="slug" className={fieldLabelClass}>
              Slug
            </label>
            <input id="slug" name="slug" defaultValue={initial?.slug} placeholder="cat-quant-complete" className={fieldClass} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="category" className={fieldLabelClass}>
              Category
            </label>
            <select id="category" name="category" defaultValue={initial?.category ?? CATEGORIES[0]} className={fieldClass}>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="examTag" className={fieldLabelClass}>
              Exam type
            </label>
            <select id="examTag" name="examTag" defaultValue={initial?.examTag ?? EXAM_TYPES[0]} className={fieldClass}>
              {EXAM_TYPES.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="level" className={fieldLabelClass}>
              Level
            </label>
            <select id="level" name="level" defaultValue={initial?.level ?? LEVELS[0]} className={fieldClass}>
              {LEVELS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="durationHours" className={fieldLabelClass}>
              Duration (hours)
            </label>
            <input id="durationHours" name="durationHours" type="number" min={0} defaultValue={initial?.durationHours ?? 40} className={fieldClass} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="price" className={fieldLabelClass}>
              Price (₹)
            </label>
            <input id="price" name="price" type="number" min={0} defaultValue={initial?.price ?? 0} className={fieldClass} />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="thumbnailUrl" className={fieldLabelClass}>
              Thumbnail URL
            </label>
            <input id="thumbnailUrl" name="thumbnailUrl" defaultValue={initial?.thumbnailUrl} placeholder="https://…" className={fieldClass} />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="description" className={fieldLabelClass}>
              Description
            </label>
            <textarea id="description" name="description" rows={4} defaultValue={initial?.description} placeholder="Markdown supported…" className={`${fieldClass} resize-y`} />
          </div>
        </div>

        {/* Published toggle */}
        <div className="mt-5 flex items-center justify-between rounded-[14px] bg-surface-muted px-4 py-3">
          <div>
            <p className="font-ui text-[14px] font-semibold text-ink">Published</p>
            <p className="font-ui text-[12px] text-taupe">Only published courses appear publicly.</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={published}
            onClick={() => setPublished((v) => !v)}
            className={cn(
              "focus-ring relative h-6 w-11 rounded-full transition-colors",
              published ? "bg-teal" : "bg-cream-300"
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 size-5 rounded-full bg-surface shadow-card transition-all",
                published ? "left-[22px]" : "left-0.5"
              )}
            />
          </button>
        </div>
      </section>

      {/* Module & lesson builder */}
      <section className="rounded-[20px] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-7">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-[20px] text-ink">Modules &amp; lessons</h2>
          <PillButton type="button" variant="outline" size="sm" onClick={addModule}>
            <Plus className="size-4" strokeWidth={2} /> Add module
          </PillButton>
        </div>

        <div className="mt-5 space-y-4">
          {modules.map((m, mi) => (
            <div key={m.uid} className="rounded-[16px] bg-surface-muted p-4 shadow-[inset_0_0_0_1px_var(--color-line)]">
              <div className="flex items-center gap-2">
                <GripVertical className="size-4 shrink-0 text-taupe" />
                <span className="font-data text-[12px] text-taupe">M{mi + 1}</span>
                <input
                  value={m.title}
                  onChange={(e) => setModuleTitle(m.uid, e.target.value)}
                  placeholder="Module title"
                  className="focus-ring flex-1 rounded-[10px] bg-surface px-3 py-2 font-ui text-[14px] font-medium text-ink shadow-[inset_0_0_0_1px_var(--color-line)]"
                />
                <button
                  type="button"
                  onClick={() => removeModule(m.uid)}
                  aria-label="Remove module"
                  className="focus-ring grid size-8 place-items-center rounded-full text-brand-error hover:bg-[rgba(194,80,47,0.08)]"
                >
                  <Trash2 className="size-4" strokeWidth={2} />
                </button>
              </div>

              <ul className="mt-3 space-y-2">
                {m.lessons.map((l) => (
                  <li key={l.uid} className="flex flex-wrap items-center gap-2 rounded-[12px] bg-surface p-2.5 shadow-[inset_0_0_0_1px_var(--color-line)]">
                    <input
                      value={l.title}
                      onChange={(e) => updateLesson(m.uid, l.uid, { title: e.target.value })}
                      placeholder="Lesson title"
                      className="focus-ring min-w-[140px] flex-1 rounded-[10px] bg-surface px-3 py-1.5 font-ui text-[13px] text-ink shadow-[inset_0_0_0_1px_var(--color-line)]"
                    />
                    <div className="inline-flex overflow-hidden rounded-full shadow-[inset_0_0_0_1px_var(--color-line)]">
                      {(["video", "reading"] as const).map((k) => {
                        const KIcon = k === "video" ? Video : FileText
                        return (
                          <button
                            key={k}
                            type="button"
                            onClick={() => updateLesson(m.uid, l.uid, { kind: k })}
                            className={cn(
                              "flex items-center gap-1 px-3 py-1.5 font-ui text-[12px] font-medium transition-colors",
                              l.kind === k ? "bg-ink text-cream-text" : "text-taupe hover:text-ink"
                            )}
                          >
                            <KIcon className="size-3.5" strokeWidth={1.75} />
                          </button>
                        )
                      })}
                    </div>
                    <input
                      type="number"
                      min={1}
                      value={l.durationMinutes}
                      onChange={(e) => updateLesson(m.uid, l.uid, { durationMinutes: Number(e.target.value) })}
                      aria-label="Duration in minutes"
                      className="focus-ring w-16 rounded-[10px] bg-surface px-2 py-1.5 text-center font-data text-[13px] text-ink shadow-[inset_0_0_0_1px_var(--color-line)]"
                    />
                    <span className="font-ui text-[12px] text-taupe">min</span>
                    <button
                      type="button"
                      onClick={() => removeLesson(m.uid, l.uid)}
                      aria-label="Remove lesson"
                      className="focus-ring grid size-7 place-items-center rounded-full text-taupe hover:bg-surface-muted hover:text-brand-error"
                    >
                      <Trash2 className="size-3.5" strokeWidth={2} />
                    </button>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => addLesson(m.uid)}
                className="focus-ring mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-ui text-[13px] font-semibold text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] transition-colors hover:bg-surface hover:text-ink"
              >
                <Plus className="size-3.5" strokeWidth={2} /> Add lesson
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-end gap-3">
        <PillButton type="submit" variant="outline" size="lg">
          Save draft
        </PillButton>
        <PillButton type="submit" variant="ink" size="lg">
          {mode === "edit" ? "Save & publish" : "Publish course"}
        </PillButton>
      </div>
      <p className="text-right font-ui text-[12px] text-taupe">
        Form is visual only — no data is saved in this phase.
      </p>
    </form>
  )
}

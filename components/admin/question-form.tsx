"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { QUESTION_SECTIONS, type AdminQuestion, type AdminQuestionType } from "@/lib/admin-data"
import { PillButton } from "@/components/marketing/primitives"
import {
  AdminFormSection,
  AdminInput,
  AdminSelect,
  AdminTextarea,
} from "@/components/admin/admin-form-section"
import { fieldClass, fieldLabelClass } from "@/components/auth/auth-shell"

const TYPES: AdminQuestionType[] = ["MCQ single", "MCQ multi", "Numeric"]
const LETTERS = ["A", "B", "C", "D"]

export function QuestionForm({
  mode,
  initial,
}: {
  mode: "new" | "edit"
  initial?: AdminQuestion
}) {
  const [type, setType] = useState<AdminQuestionType>(initial?.type ?? "MCQ single")
  const [options, setOptions] = useState<string[]>(
    initial && initial.options.length === 4 ? initial.options : ["", "", "", ""]
  )
  const [correct, setCorrect] = useState<string[]>(initial?.correctAnswers ?? [])

  const setOption = (i: number, v: string) =>
    setOptions((o) => o.map((x, idx) => (idx === i ? v : x)))

  const toggleCorrect = (letter: string) => {
    if (type === "MCQ multi") {
      setCorrect((c) => (c.includes(letter) ? c.filter((x) => x !== letter) : [...c, letter]))
    } else {
      setCorrect([letter])
    }
  }

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <AdminFormSection title="Question" description="The stem students will read." cols={1}>
        <AdminTextarea
          id="stem"
          label="Question text"
          rows={3}
          placeholder="Type the question…"
          defaultValue={initial?.stem}
        />
        <AdminTextarea
          id="passage"
          label="Passage (optional)"
          rows={3}
          placeholder="Reading passage or shared context, if any…"
          defaultValue={initial?.passage}
        />
        <div className="space-y-1.5">
          <label htmlFor="type" className={fieldLabelClass}>
            Question type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as AdminQuestionType)}
            className={fieldClass}
          >
            {TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </AdminFormSection>

      {/* Options & answer */}
      <AdminFormSection
        title="Options & correct answer"
        description={type === "Numeric" ? "Enter the expected numeric value." : "Fill the options and mark the correct one(s)."}
        cols={1}
      >
        {type === "Numeric" ? (
          <AdminInput
            id="numericAnswer"
            label="Correct numeric answer"
            placeholder="e.g. 48"
            defaultValue={initial?.numericAnswer}
            hint="Students must match this value (within tolerance)."
          />
        ) : (
          <div className="space-y-3">
            {LETTERS.map((letter, i) => {
              const isCorrect = correct.includes(letter)
              return (
                <div key={letter} className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleCorrect(letter)}
                    aria-pressed={isCorrect}
                    aria-label={`Mark ${letter} correct`}
                    className={cn(
                      "focus-ring grid size-9 shrink-0 place-items-center font-ui text-[14px] font-semibold transition-colors",
                      type === "MCQ multi" ? "rounded-[8px]" : "rounded-full",
                      isCorrect
                        ? "bg-teal text-cream-text"
                        : "bg-surface-muted text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)]"
                    )}
                  >
                    {letter}
                  </button>
                  <input
                    value={options[i]}
                    onChange={(e) => setOption(i, e.target.value)}
                    placeholder={`Option ${letter}`}
                    className={fieldClass}
                  />
                </div>
              )
            })}
            <p className="font-ui text-[12px] text-taupe">
              {type === "MCQ multi" ? "Tap each letter that is correct." : "Tap the letter of the correct option."}{" "}
              {correct.length ? `Correct: ${correct.join(", ")}` : "No correct answer set."}
            </p>
          </div>
        )}
      </AdminFormSection>

      {/* Explanation & classification */}
      <AdminFormSection title="Explanation & classification">
        <AdminTextarea
          id="explanation"
          label="Explanation"
          rows={3}
          placeholder="Shown on the result review screen…"
          defaultValue={initial?.explanation}
        />
        <AdminSelect id="section" label="Section" options={QUESTION_SECTIONS} defaultValue={initial?.section} />
        <AdminInput id="topic" label="Topic" placeholder="e.g. Arithmetic" defaultValue={initial?.topic} />
        <AdminSelect id="difficulty" label="Difficulty" options={["Easy", "Medium", "Hard"]} defaultValue={initial?.difficulty} />
        <AdminInput id="marks" label="Marks" type="number" defaultValue={initial?.marks ?? 4} />
        <AdminInput id="negativeMarks" label="Negative marks" type="number" defaultValue={initial?.negativeMarks ?? -1} />
      </AdminFormSection>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <PillButton type="submit" variant="outline" size="lg">
          Save draft
        </PillButton>
        <PillButton type="submit" variant="ink" size="lg">
          {mode === "edit" ? "Save changes" : "Add question"}
        </PillButton>
      </div>
      <p className="text-right font-ui text-[12px] text-taupe">
        Form is visual only — no data is saved in this phase.
      </p>
    </form>
  )
}

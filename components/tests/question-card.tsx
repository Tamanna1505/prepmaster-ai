import { Check } from "lucide-react"
import type { PublicQuestion } from "@/lib/test-data"
import { cn } from "@/lib/utils"
import { Tag } from "@/components/marketing/primitives"

export type AnswerValue = { selectedOptionIds: string[]; numeric: string }

export const emptyAnswer: AnswerValue = { selectedOptionIds: [], numeric: "" }

export function isAnswered(a: AnswerValue | undefined): boolean {
  if (!a) return false
  return a.selectedOptionIds.length > 0 || a.numeric.trim() !== ""
}

const typeLabel: Record<PublicQuestion["type"], string> = {
  MCQ_SINGLE: "Single correct",
  MCQ_MULTI: "Multiple correct",
  NUMERIC: "Numeric answer",
}

export function QuestionCard({
  question,
  number,
  answer,
  onChange,
}: {
  question: PublicQuestion
  number: number
  answer: AnswerValue
  onChange: (next: AnswerValue) => void
}) {
  const selectOption = (id: string) => {
    if (question.type === "MCQ_SINGLE") {
      onChange({ ...answer, selectedOptionIds: [id] })
    } else if (question.type === "MCQ_MULTI") {
      const has = answer.selectedOptionIds.includes(id)
      onChange({
        ...answer,
        selectedOptionIds: has
          ? answer.selectedOptionIds.filter((x) => x !== id)
          : [...answer.selectedOptionIds, id],
      })
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-serif text-[20px] text-ink">Question {number}</span>
          <Tag tone="outline">{question.topic}</Tag>
        </div>
        <div className="flex items-center gap-2 font-data text-[12px] tracking-[-0.02em]">
          <Tag tone="teal">+{question.positiveMarks}</Tag>
          {question.negativeMarks < 0 ? <Tag tone="live">{question.negativeMarks}</Tag> : null}
          <span className="font-ui text-[12px] text-taupe">{typeLabel[question.type]}</span>
        </div>
      </div>

      <p className="mt-4 text-[17px] leading-[1.6] text-ink">{question.stem}</p>

      {/* Options or numeric */}
      {question.type === "NUMERIC" ? (
        <div className="mt-6 max-w-sm">
          <label htmlFor={`num-${question.id}`} className="block font-ui text-[12px] font-semibold text-cocoa">
            Your answer
          </label>
          <input
            id={`num-${question.id}`}
            inputMode="decimal"
            value={answer.numeric}
            onChange={(e) => onChange({ ...answer, numeric: e.target.value })}
            placeholder="Enter a numerical value"
            className="focus-ring mt-1.5 w-full rounded-[14px] bg-surface px-4 py-3 font-data text-[16px] tracking-[-0.01em] text-ink shadow-[inset_0_0_0_1px_var(--color-line)] placeholder:font-ui placeholder:text-taupe"
          />
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {question.options?.map((opt) => {
            const selected = answer.selectedOptionIds.includes(opt.id)
            return (
              <li key={opt.id}>
                <button
                  type="button"
                  onClick={() => selectOption(opt.id)}
                  aria-pressed={selected}
                  className={cn(
                    "focus-ring flex w-full items-center gap-3 rounded-[14px] px-4 py-3.5 text-left transition-all duration-150",
                    selected
                      ? "bg-teal-tint text-ink shadow-[inset_0_0_0_1.5px_var(--color-teal)]"
                      : "bg-surface text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-surface-muted"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center font-ui text-[13px] font-semibold uppercase transition-colors",
                      question.type === "MCQ_MULTI" ? "rounded-[7px]" : "rounded-full",
                      selected
                        ? "bg-teal text-cream-text"
                        : "bg-surface-muted text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)]"
                    )}
                  >
                    {selected ? <Check className="size-4" strokeWidth={3} /> : opt.id}
                  </span>
                  <span className="font-ui text-[15px]">{opt.text}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

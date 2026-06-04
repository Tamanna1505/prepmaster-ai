import { Clock, FileText, Layers, ListChecks, Target } from "lucide-react"
import { testTotals, type ExamTest } from "@/lib/test-data"
import { Tag } from "@/components/marketing/primitives"

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock
  label: string
  value: string
}) {
  return (
    <div className="rounded-[14px] bg-surface-muted p-4">
      <span className="grid size-9 place-items-center rounded-[10px] bg-surface text-brown shadow-[inset_0_0_0_1px_var(--color-line)]">
        <Icon className="size-[18px]" strokeWidth={1.75} />
      </span>
      <p className="mt-3 font-data text-[20px] font-semibold leading-none tracking-[-0.02em] text-ink">
        {value}
      </p>
      <p className="mt-1.5 font-ui text-[12px] text-taupe">{label}</p>
    </div>
  )
}

export function TestInstructions({ test }: { test: ExamTest }) {
  const { totalQuestions, totalMarks } = testTotals(test)

  return (
    <div className="space-y-6">
      {/* Key facts */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={Clock} label="Duration" value={`${test.durationMinutes} min`} />
        <Stat icon={FileText} label="Questions" value={String(totalQuestions)} />
        <Stat icon={Target} label="Total marks" value={String(totalMarks)} />
        <Stat icon={Layers} label="Sections" value={String(test.sections.length)} />
      </div>

      {/* Sections + marking */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[18px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)]">
          <p className="eyebrow text-taupe">Sections</p>
          <ul className="mt-3 space-y-2">
            {test.sections.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between rounded-[12px] bg-surface-muted px-4 py-2.5"
              >
                <span className="font-ui text-[14px] font-medium text-ink">{s.name}</span>
                <span className="font-data text-[12px] tracking-[-0.02em] text-taupe">
                  {s.questionIds.length} questions
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[18px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)]">
          <p className="eyebrow text-taupe">Marking scheme</p>
          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between rounded-[12px] bg-surface-muted px-4 py-2.5">
              <span className="font-ui text-[14px] text-cocoa">Correct answer</span>
              <Tag tone="teal">+{test.positiveMarks}</Tag>
            </div>
            <div className="flex items-center justify-between rounded-[12px] bg-surface-muted px-4 py-2.5">
              <span className="font-ui text-[14px] text-cocoa">Wrong answer</span>
              <Tag tone={test.negativeMarks < 0 ? "live" : "outline"}>
                {test.negativeMarks < 0 ? test.negativeMarks : "0"}
              </Tag>
            </div>
            <div className="flex items-center justify-between rounded-[12px] bg-surface-muted px-4 py-2.5">
              <span className="font-ui text-[14px] text-cocoa">Unattempted</span>
              <Tag tone="outline">0</Tag>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions & rules */}
      <div className="rounded-[18px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-6">
        <div className="flex items-center gap-2">
          <ListChecks className="size-4 text-orange" strokeWidth={1.75} />
          <p className="eyebrow text-taupe">Instructions &amp; rules</p>
        </div>
        <ol className="mt-4 space-y-3">
          {test.instructions.map((line, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-[1.55] text-cocoa">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-surface-muted font-data text-[12px] font-semibold text-ink">
                {i + 1}
              </span>
              {line}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

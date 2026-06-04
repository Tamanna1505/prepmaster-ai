import { Clock, FileText, Layers, Sparkle, Target, Users } from "lucide-react"
import { testTotals, type ExamTest } from "@/lib/test-data"
import { PillLink, Tag } from "@/components/marketing/primitives"

type StatusKind = "Not started" | "In progress" | "Completed"

export function TestCard({
  test,
  status,
  cta,
  note,
}: {
  test: ExamTest
  status?: StatusKind
  cta: { href: string; label: string; variant?: "ink" | "gold" | "outline" }
  note?: string
}) {
  const { totalQuestions, totalMarks, sectionCount } = testTotals(test)

  const statusTone =
    status === "Completed" ? "teal" : status === "In progress" ? "live" : "outline"

  return (
    <div className="flex h-full flex-col rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-card-hover">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Tag tone="outline">{test.examTag}</Tag>
          <Tag tone="gold">{test.testType}</Tag>
        </div>
        {status ? <Tag tone={statusTone}>{status}</Tag> : <Tag tone="outline">{test.difficulty}</Tag>}
      </div>

      <h3 className="mt-3 font-serif text-[19px] leading-[1.2] text-ink">{test.title}</h3>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 font-ui text-[13px] text-taupe">
        <div className="flex items-center gap-1.5">
          <Clock className="size-3.5" strokeWidth={1.75} />
          <dt className="sr-only">Duration</dt>
          <dd className="font-data tracking-[-0.02em] text-cocoa">{test.durationMinutes} min</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <FileText className="size-3.5" strokeWidth={1.75} />
          <dt className="sr-only">Questions</dt>
          <dd className="font-data tracking-[-0.02em] text-cocoa">{totalQuestions} questions</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Target className="size-3.5" strokeWidth={1.75} />
          <dt className="sr-only">Total marks</dt>
          <dd className="font-data tracking-[-0.02em] text-cocoa">{totalMarks} marks</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <Layers className="size-3.5" strokeWidth={1.75} />
          <dt className="sr-only">Sections</dt>
          <dd className="font-data tracking-[-0.02em] text-cocoa">
            {sectionCount} section{sectionCount > 1 ? "s" : ""}
          </dd>
        </div>
      </dl>

      <div className="my-4 h-px bg-line" />

      <div className="mt-auto flex items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 font-ui text-[12px] text-taupe">
          <Users className="size-3.5" strokeWidth={1.75} /> {test.attempts.toLocaleString()} attempts
        </span>
        <PillLink href={cta.href} variant={cta.variant ?? "ink"} size="sm">
          {cta.label}
        </PillLink>
      </div>

      {note ? (
        <p className="mt-3 flex items-center gap-1.5 font-ui text-[12px] text-taupe">
          <Sparkle className="size-3.5 text-orange" strokeWidth={1.75} /> {note}
        </p>
      ) : null}
    </div>
  )
}

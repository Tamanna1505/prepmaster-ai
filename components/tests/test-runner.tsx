"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, Eraser, Flag, LayoutGrid, LogOut, X } from "lucide-react"
import type { PublicTest } from "@/lib/test-data"
import { cn } from "@/lib/utils"
import { PillButton } from "@/components/marketing/primitives"
import { TestTimer } from "@/components/tests/test-timer"
import {
  QuestionCard,
  emptyAnswer,
  isAnswered,
  type AnswerValue,
} from "@/components/tests/question-card"
import {
  QuestionPalette,
  type PaletteGroup,
  type PaletteStatus,
} from "@/components/tests/question-palette"
import { TestSubmitModal } from "@/components/tests/test-submit-modal"

export function TestRunner({ test, resultHref }: { test: PublicTest; resultHref: string }) {
  const router = useRouter()
  const questions = test.questions

  const numberById = useMemo(() => {
    const map: Record<string, number> = {}
    questions.forEach((q, i) => (map[q.id] = i + 1))
    return map
  }, [questions])

  const [currentId, setCurrentId] = useState(questions[0].id)
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({})
  const [visited, setVisited] = useState<Set<string>>(() => new Set([questions[0].id]))
  const [marked, setMarked] = useState<Set<string>>(new Set())
  const [submitOpen, setSubmitOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)

  const index = questions.findIndex((q) => q.id === currentId)
  const current = questions[index]
  const currentSection = test.sections.find((s) => s.id === current.sectionId)
  const answer = answers[currentId] ?? emptyAnswer

  const move = (id: string) => {
    setCurrentId(id)
    setVisited((v) => (v.has(id) ? v : new Set(v).add(id)))
  }
  const goTo = (id: string) => {
    move(id)
    setPaletteOpen(false)
  }
  const next = () => index < questions.length - 1 && move(questions[index + 1].id)
  const prev = () => index > 0 && move(questions[index - 1].id)
  const onAnswer = (val: AnswerValue) => setAnswers((a) => ({ ...a, [currentId]: val }))
  const clearResponse = () => setAnswers((a) => ({ ...a, [currentId]: emptyAnswer }))
  const toggleMark = () =>
    setMarked((m) => {
      const n = new Set(m)
      if (n.has(currentId)) n.delete(currentId)
      else n.add(currentId)
      return n
    })

  const statusOf = (id: string): PaletteStatus => {
    if (marked.has(id)) return "marked"
    if (isAnswered(answers[id])) return "answered"
    if (visited.has(id)) return "not-answered"
    return "not-visited"
  }

  const groups: PaletteGroup[] = test.sections.map((s) => ({
    name: s.name,
    items: questions
      .filter((q) => q.sectionId === s.id)
      .map((q) => ({ id: q.id, number: numberById[q.id], status: statusOf(q.id) })),
  }))

  const answeredCount = questions.filter((q) => isAnswered(answers[q.id])).length
  const summary = {
    total: questions.length,
    answered: answeredCount,
    notAnswered: questions.length - answeredCount,
    marked: marked.size,
  }

  const submit = () => router.push(resultHref)

  return (
    <div className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-cream-100 font-ui text-ink">
      {/* Header */}
      <header className="flex items-center justify-between gap-3 border-b border-line bg-cream-50 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="truncate font-serif text-[16px] tracking-[-0.02em] text-ink sm:text-[18px]">
            {test.title}
          </p>
          <p className="font-ui text-[12px] text-taupe">
            {test.examTag} · {answeredCount}/{questions.length} answered
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <TestTimer durationSeconds={test.durationMinutes * 60} onExpire={submit} />
          <PillButton type="button" variant="ink" size="sm" onClick={() => setSubmitOpen(true)}>
            Submit
          </PillButton>
          <Link
            href={`/dashboard/tests/${test.id}`}
            aria-label="Exit test"
            className="focus-ring hidden size-9 place-items-center rounded-full text-taupe hover:bg-surface-muted hover:text-ink sm:grid"
          >
            <LogOut className="size-4" />
          </Link>
        </div>
      </header>

      {/* Section tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-line bg-cream-50 px-4 py-2.5 sm:px-6">
        {test.sections.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(s.questionIds[0])}
            className={cn(
              "focus-ring shrink-0 rounded-full px-4 py-1.5 font-ui text-[13px] font-medium transition-all duration-150",
              s.id === currentSection?.id
                ? "bg-ink text-cream-text"
                : "text-cocoa hover:bg-surface-muted"
            )}
          >
            {s.name}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPaletteOpen(true)}
          className="focus-ring ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 font-ui text-[13px] font-semibold text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-surface-muted lg:hidden"
        >
          <LayoutGrid className="size-3.5" strokeWidth={2} /> Palette
        </button>
      </div>

      {/* Body */}
      <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Question column */}
        <div className="flex flex-col overflow-y-auto">
          <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
            <div className="rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] sm:p-7">
              <QuestionCard
                question={current}
                number={numberById[currentId]}
                answer={answer}
                onChange={onAnswer}
              />
            </div>
          </div>

          {/* Action bar */}
          <div className="sticky bottom-0 border-t border-line bg-cream-50/95 px-4 py-3 backdrop-blur-md sm:px-6">
            <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={prev}
                disabled={index === 0}
                className="focus-ring inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 font-ui text-[14px] font-semibold text-cocoa shadow-[inset_0_0_0_1.5px_var(--color-line)] transition-colors hover:bg-surface-muted hover:text-ink disabled:opacity-40"
              >
                <ArrowLeft className="size-4" strokeWidth={2} /> Previous
              </button>
              <button
                type="button"
                onClick={clearResponse}
                className="focus-ring inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 font-ui text-[14px] font-semibold text-cocoa shadow-[inset_0_0_0_1.5px_var(--color-line)] transition-colors hover:bg-surface-muted hover:text-ink"
              >
                <Eraser className="size-4" strokeWidth={2} /> Clear
              </button>
              <button
                type="button"
                onClick={toggleMark}
                className={cn(
                  "focus-ring inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 font-ui text-[14px] font-semibold transition-colors",
                  marked.has(currentId)
                    ? "bg-orange text-cream-text"
                    : "text-cocoa shadow-[inset_0_0_0_1.5px_var(--color-line)] hover:bg-surface-muted hover:text-ink"
                )}
              >
                <Flag className="size-4" strokeWidth={2} />
                {marked.has(currentId) ? "Marked" : "Mark"}
              </button>
              <button
                type="button"
                onClick={next}
                disabled={index === questions.length - 1}
                className="focus-ring ml-auto inline-flex items-center gap-1.5 rounded-full bg-gold-200 px-5 py-2.5 font-ui text-[14px] font-semibold text-gold-ink shadow-[inset_0_0_0_1px_var(--color-gold-300)] transition-all hover:-translate-y-px hover:shadow-card-hover disabled:opacity-40 disabled:hover:translate-y-0"
              >
                Save &amp; Next <ArrowRight className="size-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>

        {/* Palette — desktop sidebar */}
        <aside className="hidden overflow-y-auto border-l border-line bg-cream-100 p-5 lg:block">
          <QuestionPalette groups={groups} currentId={currentId} onJump={goTo} />
        </aside>
      </div>

      {/* Palette — mobile drawer */}
      {paletteOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            aria-label="Close palette"
            onClick={() => setPaletteOpen(false)}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-[24px] bg-cream-100 p-5 shadow-feature">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-serif text-[18px] text-ink">Questions</p>
              <button
                type="button"
                onClick={() => setPaletteOpen(false)}
                aria-label="Close"
                className="focus-ring grid size-9 place-items-center rounded-full text-taupe hover:bg-surface-muted hover:text-ink"
              >
                <X className="size-4" />
              </button>
            </div>
            <QuestionPalette groups={groups} currentId={currentId} onJump={goTo} />
          </div>
        </div>
      ) : null}

      <TestSubmitModal
        open={submitOpen}
        summary={summary}
        onClose={() => setSubmitOpen(false)}
        onConfirm={submit}
      />
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  FileDown,
  Play,
} from "lucide-react"
import type { CourseLesson } from "@/lib/sample-data"
import { cn } from "@/lib/utils"
import { PillButton, Tag } from "@/components/marketing/primitives"
import { LessonKindIcon, lessonKindLabel } from "@/components/courses/lesson-status"

export function LessonViewer({
  courseTitle,
  courseId,
  moduleTitle,
  lesson,
  notes,
  initialCompleted,
  prevHref,
  nextHref,
}: {
  courseTitle: string
  courseId: string
  moduleTitle: string
  lesson: CourseLesson
  notes: string[]
  initialCompleted: boolean
  prevHref?: string
  nextHref?: string
}) {
  const [completed, setCompleted] = useState(initialCompleted)

  return (
    <div className="min-w-0">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1.5 font-ui text-[13px] text-taupe">
        <Link href={`/dashboard/courses/${courseId}`} className="focus-ring rounded hover:text-ink">
          {courseTitle}
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-cocoa">{moduleTitle}</span>
      </nav>

      {/* Title + meta */}
      <h1 className="mt-3 font-serif text-[28px] leading-[1.1] tracking-[-0.02em] text-ink sm:text-[34px]">
        {lesson.title}
      </h1>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-ui text-[13px] text-taupe">
        <span className="flex items-center gap-1.5">
          <LessonKindIcon kind={lesson.kind} className="size-4" /> {lessonKindLabel[lesson.kind]} lesson
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-4" strokeWidth={1.75} /> {lesson.durationMinutes} min
        </span>
        {lesson.isFreePreview ? <Tag tone="teal">Free preview</Tag> : null}
        {completed ? <Tag tone="gold">Completed</Tag> : null}
      </div>

      {/* Media / player card */}
      <div className="mt-6 overflow-hidden rounded-[20px] bg-ink shadow-feature">
        <div className="relative grid aspect-video place-items-center">
          {/* Decorative warm wash */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(250,225,153,0.18),transparent_55%)]" />
          <div className="relative flex flex-col items-center gap-3 text-cream-text">
            <span className="grid size-16 place-items-center rounded-full bg-gold-200 text-gold-ink shadow-card-hover">
              <Play className="size-7 translate-x-0.5" strokeWidth={2} fill="currentColor" />
            </span>
            <p className="font-ui text-[14px] text-[#C9BCA6]">
              {lesson.kind === "video" ? "Video lesson — player loads here" : "Lesson walkthrough"}
            </p>
          </div>
        </div>
      </div>

      {/* Notes */}
      <section className="mt-8">
        <h2 className="font-serif text-[22px] tracking-[-0.02em] text-ink">Lesson notes</h2>
        <div className="mt-3 space-y-4 text-[16px] leading-[1.7] text-cocoa">
          {notes.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* Resource download */}
      {lesson.hasResource ? (
        <div className="mt-6 flex flex-col gap-3 rounded-[18px] bg-surface-muted p-5 shadow-[inset_0_0_0_1px_var(--color-line)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface text-orange shadow-[inset_0_0_0_1px_var(--color-line)]">
              <FileDown className="size-5" strokeWidth={1.75} />
            </span>
            <div>
              <p className="font-ui text-[15px] font-semibold text-ink">
                {lesson.title} — notes (PDF)
              </p>
              <p className="font-data text-[12px] tracking-[-0.01em] text-taupe">PDF · ~8 pages</p>
            </div>
          </div>
          <PillButton type="button" variant="outline" size="sm">
            <FileDown className="size-4" strokeWidth={2} /> Download
          </PillButton>
        </div>
      ) : null}

      {/* Footer nav + mark complete */}
      <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {prevHref ? (
            <Link
              href={prevHref}
              className="focus-ring inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-ui text-[14px] font-semibold text-cocoa shadow-[inset_0_0_0_1.5px_var(--color-line)] transition-colors hover:bg-surface-muted hover:text-ink"
            >
              <ArrowLeft className="size-4" strokeWidth={2} /> Previous
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-ui text-[14px] font-semibold text-taupe opacity-50 shadow-[inset_0_0_0_1.5px_var(--color-line)]">
              <ArrowLeft className="size-4" strokeWidth={2} /> Previous
            </span>
          )}
          {nextHref ? (
            <Link
              href={nextHref}
              className="focus-ring inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-ui text-[14px] font-semibold text-cocoa shadow-[inset_0_0_0_1.5px_var(--color-line)] transition-colors hover:bg-surface-muted hover:text-ink"
            >
              Next <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-ui text-[14px] font-semibold text-taupe opacity-50 shadow-[inset_0_0_0_1.5px_var(--color-line)]">
              Next <ArrowRight className="size-4" strokeWidth={2} />
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setCompleted((v) => !v)}
          aria-pressed={completed}
          className={cn(
            "focus-ring inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-ui text-[15px] font-semibold transition-all duration-150 ease-out active:scale-[0.98]",
            completed
              ? "bg-teal text-cream-text hover:-translate-y-px hover:shadow-card-hover"
              : "bg-gold-200 text-gold-ink shadow-[inset_0_0_0_1px_var(--color-gold-300)] hover:-translate-y-px hover:shadow-card-hover"
          )}
        >
          <Check className="size-4" strokeWidth={2.5} />
          {completed ? "Completed" : "Mark as complete"}
        </button>
      </div>
    </div>
  )
}

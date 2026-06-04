"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronDown, Lightbulb, Lock } from "lucide-react"
import type { AnnotatedModule } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"
import { LessonStatusIcon } from "@/components/courses/lesson-status"

function ContentsList({
  modules,
  currentLessonId,
}: {
  modules: AnnotatedModule[]
  currentLessonId: string
}) {
  return (
    <div className="space-y-4">
      {modules.map((m) => (
        <div key={m.id}>
          <p className="flex items-center gap-1.5 px-1 font-ui text-[12px] font-semibold text-cocoa">
            {m.title}
            {!m.unlocked ? <Lock className="size-3 text-taupe" strokeWidth={1.75} /> : null}
          </p>
          <ul className="mt-1.5 space-y-0.5">
            {m.lessons.map((l) => {
              const active = l.id === currentLessonId
              const locked = l.status === "locked"
              const content = (
                <span
                  className={cn(
                    "flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 font-ui text-[13px] transition-colors",
                    active
                      ? "bg-ink text-cream-text"
                      : locked
                        ? "text-taupe"
                        : "text-cocoa hover:bg-surface-muted hover:text-ink"
                  )}
                >
                  <LessonStatusIcon status={active ? "in-progress" : l.status} className="size-4" />
                  <span className="truncate">{l.title}</span>
                </span>
              )
              return (
                <li key={l.id}>
                  {locked ? (
                    <span className="block cursor-not-allowed opacity-70">{content}</span>
                  ) : (
                    <Link href={l.href} className="focus-ring block rounded-[10px]">
                      {content}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function LessonSidebar({
  courseTitle,
  courseId,
  modules,
  currentLessonId,
  aiTip,
  progressPct,
  completedCount,
  totalLessons,
}: {
  courseTitle: string
  courseId: string
  modules: AnnotatedModule[]
  currentLessonId: string
  aiTip: string
  progressPct: number
  completedCount: number
  totalLessons: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      {/* Course header + progress */}
      <div className="rounded-[18px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)]">
        <Link
          href={`/dashboard/courses/${courseId}`}
          className="focus-ring inline-flex items-center gap-1 rounded font-ui text-[13px] font-medium text-cocoa transition-colors hover:text-ink"
        >
          <ChevronLeft className="size-4" strokeWidth={2} /> Back to course
        </Link>
        <p className="mt-2 font-serif text-[18px] leading-[1.2] text-ink">{courseTitle}</p>
        <div className="mt-3 flex items-center justify-between font-ui text-[12px] text-taupe">
          <span>
            {completedCount}/{totalLessons} lessons
          </span>
          <span className="font-data tracking-[-0.02em] text-teal-deep">{progressPct}%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-teal-tint">
          <div className="h-full rounded-full bg-teal" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Contents — collapsible on mobile, always open on desktop */}
      <div className="rounded-[18px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="focus-ring flex w-full items-center justify-between gap-3 rounded lg:pointer-events-none"
        >
          <span className="eyebrow text-taupe">Course contents</span>
          <ChevronDown
            className={cn("size-4 text-taupe transition-transform lg:hidden", open && "rotate-180")}
          />
        </button>
        <div className={cn("mt-4 lg:block", open ? "block" : "hidden")}>
          <ContentsList modules={modules} currentLessonId={currentLessonId} />
        </div>
      </div>

      {/* AI study tip — teal accent */}
      <div className="rounded-[18px] bg-teal-tint p-5 shadow-[inset_0_0_0_1px_rgba(84,159,170,0.25)]">
        <div className="flex items-center gap-2 text-teal-deep">
          <Lightbulb className="size-4" strokeWidth={2} />
          <span className="eyebrow">AI study tip</span>
        </div>
        <p className="mt-2 text-[14px] leading-[1.55] text-teal-deep">{aiTip}</p>
      </div>
    </aside>
  )
}

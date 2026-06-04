import { ArrowRight, BookOpen, Clock } from "lucide-react"
import type { Course } from "@/lib/sample-data"
import { LearnMore, PillLink, Tag } from "@/components/marketing/primitives"

/* Teal progress ring — per Phase 5, teal is used for progress + analytics. */
function ProgressRing({ pct }: { pct: number }) {
  return (
    <div className="relative grid size-[84px] shrink-0 place-items-center">
      <div
        className="size-full rounded-full"
        style={{
          background: `conic-gradient(var(--color-teal) ${pct}%, var(--color-teal-tint) ${pct}% 100%)`,
        }}
      />
      <div className="absolute grid size-[62px] place-items-center rounded-full bg-surface">
        <span className="font-data text-[18px] font-semibold tracking-[-0.02em] text-teal-deep">
          {pct}
          <span className="text-[11px]">%</span>
        </span>
      </div>
    </div>
  )
}

export function CourseProgressCard({
  course,
  progressPct,
  completedCount,
  totalLessons,
  totalMinutes,
  currentLessonTitle,
  continueHref,
  detailHref,
}: {
  course: Course
  progressPct: number
  completedCount: number
  totalLessons: number
  totalMinutes: number
  currentLessonTitle?: string
  continueHref: string
  detailHref?: string
}) {
  const Icon = course.icon

  return (
    <div className="flex h-full flex-col rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-card-hover sm:p-6">
      <div className="flex items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold-200 text-gold-ink">
          <Icon className="size-6" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <Tag tone="outline">{course.examTag}</Tag>
            <span className="font-ui text-[12px] text-taupe">{course.difficulty}</span>
          </div>
          <h3 className="mt-1.5 font-serif text-[19px] leading-[1.2] text-ink">{course.title}</h3>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <ProgressRing pct={progressPct} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 font-ui text-[13px] text-taupe">
            <span className="flex items-center gap-1.5">
              <BookOpen className="size-3.5" strokeWidth={1.75} /> {completedCount}/{totalLessons} lessons
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" strokeWidth={1.75} /> {Math.round(totalMinutes / 60)} hrs
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-teal-tint">
            <div className="h-full rounded-full bg-teal" style={{ width: `${progressPct}%` }} />
          </div>
          {currentLessonTitle ? (
            <p className="mt-2 truncate font-ui text-[13px] text-cocoa">
              Up next: <span className="text-ink">{currentLessonTitle}</span>
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
        <PillLink href={continueHref} variant="gold" size="sm">
          {progressPct > 0 ? "Continue" : "Start"} <ArrowRight className="size-4" strokeWidth={2} />
        </PillLink>
        {detailHref ? <LearnMore label="View course" href={detailHref} /> : null}
      </div>
    </div>
  )
}

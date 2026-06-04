import Link from "next/link"
import { BookOpen, Clock, Sparkle } from "lucide-react"
import type { RecommendedCourse } from "@/lib/dashboard-data"
import { Eyebrow, LearnMore } from "@/components/marketing/primitives"

export function RecommendedCourseCard({ item }: { item: RecommendedCourse }) {
  const { course, reason } = item
  const Icon = course.icon

  return (
    <div className="flex h-full flex-col rounded-[20px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-card-hover">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-xl bg-surface-muted text-brown">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <Eyebrow tone="taupe">
          {course.examTag} · {course.topics[0]}
        </Eyebrow>
      </div>

      <h3 className="mt-3 font-serif text-[19px] leading-[1.2] text-ink">{course.title}</h3>

      <p className="mt-2 flex items-start gap-1.5 text-[13px] leading-[1.5] text-cocoa">
        <Sparkle className="mt-0.5 size-3.5 shrink-0 text-orange" strokeWidth={1.75} />
        {reason}
      </p>

      <div className="mt-4 flex items-center gap-4 font-ui text-[13px] text-taupe">
        <span className="flex items-center gap-1.5">
          <BookOpen className="size-3.5" strokeWidth={1.75} /> {course.lessonCount} lessons
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5" strokeWidth={1.75} /> {course.durationHours} hrs
        </span>
      </div>

      <div className="mt-auto border-t border-line pt-4">
        <Link href="/dashboard/courses" className="focus-ring inline-flex rounded">
          <LearnMore label="Start course" />
        </Link>
      </div>
    </div>
  )
}

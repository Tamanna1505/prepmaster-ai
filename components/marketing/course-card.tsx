import Link from "next/link"
import { BookOpen, Clock, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Course } from "@/lib/sample-data"
import { Eyebrow, Tag } from "@/components/marketing/primitives"

/* Course thumbnail tints rotate across the brand palette (gold / teal / cream). */
const TONES = [
  "bg-gold-200 text-gold-ink",
  "bg-teal/15 text-teal-deep",
  "bg-surface-muted text-brown",
  "bg-gold-100 text-gold-ink",
] as const

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  const Icon = course.icon
  const tone = TONES[index % TONES.length]

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="focus-ring group flex h-full flex-col overflow-hidden rounded-[20px] bg-surface shadow-[inset_0_0_0_1px_var(--color-line)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:shadow-card-hover"
    >
      {/* Thumbnail band */}
      <div className={cn("relative flex h-[104px] items-start justify-between p-4", tone)}>
        <span className="grid size-11 place-items-center rounded-xl bg-cream-text/70 text-ink">
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <Tag tone="ink">{course.difficulty}</Tag>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <Eyebrow tone="taupe">
          {course.examTag} · {course.topics[0]}
        </Eyebrow>
        <h3 className="mt-2 font-serif text-[20px] leading-[1.2] text-ink">{course.title}</h3>
        <p className="mt-2 line-clamp-2 text-[14px] leading-[1.55] text-cocoa">{course.summary}</p>

        <div className="mt-auto flex items-center gap-4 pt-4 font-ui text-[13px] text-taupe">
          <span className="flex items-center gap-1.5">
            <BookOpen className="size-3.5" strokeWidth={1.75} /> {course.lessonCount} lessons
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" strokeWidth={1.75} /> {course.durationHours} hrs
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="size-3.5 fill-amber text-amber" strokeWidth={1.75} />
            <span className="font-data text-[12px] font-semibold tracking-[-0.02em] text-ink">
              {course.rating.toFixed(1)}
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}

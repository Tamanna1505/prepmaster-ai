import Link from "next/link"
import { ArrowRight, Clock, Star, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Course } from "@/lib/sample-data"

export function CourseCard({ course, href }: { course: Course; href?: string }) {
  const Icon = course.icon
  const link = href ?? `/courses/${course.slug}`
  return (
    <Link
      href={link}
      className="group flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-5 transition-colors hover:border-foreground/30 hover:bg-muted/30"
    >
      <div className="flex items-start justify-between">
        <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
        <Badge variant="secondary">{course.examTag}</Badge>
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-semibold leading-snug">{course.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{course.summary}</p>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" /> {course.durationHours}h
        </span>
        <span className="flex items-center gap-1">
          <Users className="size-3.5" /> {course.studentsEnrolled.toLocaleString()}
        </span>
        <span className="flex items-center gap-1">
          <Star className="size-3.5" /> {course.rating}
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-border/60 pt-3 text-sm font-medium">
        <span>{course.lessonCount} lessons</span>
        <span className="flex items-center gap-1 text-primary transition-transform group-hover:translate-x-0.5">
          View <ArrowRight className="size-3.5" />
        </span>
      </div>
    </Link>
  )
}

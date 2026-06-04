"use client"

import { useMemo, useState } from "react"
import { PlayCircle } from "lucide-react"
import { enrolledCourses, getStudentCourse } from "@/lib/dashboard-data"
import { PillLink } from "@/components/marketing/primitives"
import { CourseFilterBar } from "@/components/courses/course-filter-bar"
import { CourseProgressCard } from "@/components/courses/course-progress-card"

const STATUSES = ["All", "In progress", "Completed", "Not started"]

const items = enrolledCourses
  .map((e) => getStudentCourse(e.course.slug))
  .filter((s): s is NonNullable<typeof s> => Boolean(s))

const CATEGORIES = ["All", ...Array.from(new Set(items.map((s) => s.course.examTag)))]

function statusOf(pct: number) {
  if (pct >= 100) return "Completed"
  if (pct <= 0) return "Not started"
  return "In progress"
}

export function CourseLibrary() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [status, setStatus] = useState("All")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((s) => {
      const matchesCat = category === "All" || s.course.examTag === category
      const matchesStatus = status === "All" || statusOf(s.progressPct) === status
      const matchesQuery =
        !q ||
        s.course.title.toLowerCase().includes(q) ||
        s.course.topics.some((t) => t.toLowerCase().includes(q))
      return matchesCat && matchesStatus && matchesQuery
    })
  }, [query, category, status])

  // Continue-learning pick: the in-progress course nearest completion.
  const resume = useMemo(() => {
    const inProgress = items
      .filter((s) => s.progressPct > 0 && s.progressPct < 100)
      .sort((a, b) => b.progressPct - a.progressPct)
    return inProgress[0]
  }, [])

  return (
    <div className="space-y-8">
      {/* Continue learning CTA */}
      {resume ? (
        <div className="flex flex-col gap-4 rounded-[20px] bg-gold-200 p-6 text-gold-ink shadow-card sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-cream-text/70 text-ink">
              <PlayCircle className="size-6" strokeWidth={1.75} />
            </span>
            <div>
              <p className="eyebrow text-orange">Continue learning</p>
              <p className="mt-1 font-serif text-[20px] leading-[1.2] text-gold-ink">
                {resume.course.title}
              </p>
              {resume.currentLesson ? (
                <p className="mt-1 text-[14px] text-brown">Up next: {resume.currentLesson.title}</p>
              ) : null}
            </div>
          </div>
          <PillLink
            href={`/dashboard/lessons/${resume.currentLessonId}`}
            variant="ink"
            size="lg"
            className="shrink-0"
          >
            Resume
          </PillLink>
        </div>
      ) : null}

      <CourseFilterBar
        query={query}
        onQueryChange={setQuery}
        categories={CATEGORIES}
        activeCategory={category}
        onCategoryChange={setCategory}
        statuses={STATUSES}
        activeStatus={status}
        onStatusChange={setStatus}
      />

      {filtered.length > 0 ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {filtered.map((s) => (
            <CourseProgressCard
              key={s.course.slug}
              course={s.course}
              progressPct={s.progressPct}
              completedCount={s.completedCount}
              totalLessons={s.totalLessons}
              totalMinutes={s.totalMinutes}
              currentLessonTitle={s.currentLesson?.title}
              continueHref={`/dashboard/lessons/${s.currentLessonId}`}
              detailHref={`/dashboard/courses/${s.course.slug}`}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] bg-surface p-12 text-center shadow-[inset_0_0_0_1px_var(--color-line)]">
          <p className="font-serif text-[20px] text-ink">No courses match your filters</p>
          <p className="mt-2 text-[14px] text-cocoa">Try a different exam, status, or search.</p>
        </div>
      )}
    </div>
  )
}

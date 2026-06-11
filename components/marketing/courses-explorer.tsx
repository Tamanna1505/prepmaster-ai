"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PublicCourseListItem } from "@/lib/data/courses"
import { CourseCard } from "@/components/marketing/course-card"

const SORTS = [
  { value: "newest", label: "Newest" },
  { value: "lessons", label: "Most lessons" },
  { value: "az", label: "A–Z" },
] as const

export function CoursesExplorer({ courses }: { courses: PublicCourseListItem[] }) {
  const [exam, setExam] = useState("All")
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState<(typeof SORTS)[number]["value"]>("newest")

  const exams = useMemo(
    () => ["All", ...Array.from(new Set(courses.map((c) => c.examTag)))],
    [courses]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = courses.filter((c) => {
      const matchesExam = exam === "All" || c.examTag === exam
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.topics.some((t) => t.toLowerCase().includes(q))
      return matchesExam && matchesQuery
    })
    return [...list].sort((a, b) => {
      if (sort === "lessons") return b.lessonCount - a.lessonCount
      if (sort === "az") return a.title.localeCompare(b.title)
      return 0 // "newest" keeps the server order (createdAt desc)
    })
  }, [courses, exam, query, sort])

  if (courses.length === 0) {
    return (
      <div className="rounded-[20px] bg-surface p-12 text-center shadow-[inset_0_0_0_1px_var(--color-line)]">
        <p className="font-serif text-[20px] text-ink">No courses published yet</p>
        <p className="mt-2 text-[14px] text-cocoa">New courses are on the way — check back soon.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 -mx-5 mb-8 border-y border-line bg-cream-100/90 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {exams.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setExam(e)}
                className={cn(
                  "focus-ring rounded-full px-4 py-2 font-ui text-[14px] font-medium transition-all duration-150",
                  exam === e
                    ? "bg-ink text-cream-text"
                    : "bg-surface text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-surface-muted"
                )}
              >
                {e}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 lg:w-64">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-taupe" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses"
                className="focus-ring w-full rounded-full bg-surface py-2.5 pl-10 pr-4 font-ui text-[14px] text-ink shadow-[inset_0_0_0_1px_var(--color-line)] placeholder:text-taupe"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              aria-label="Sort courses"
              className="focus-ring rounded-full bg-surface px-4 py-2.5 font-ui text-[14px] text-ink shadow-[inset_0_0_0_1px_var(--color-line)]"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] bg-surface p-12 text-center shadow-[inset_0_0_0_1px_var(--color-line)]">
          <p className="font-serif text-[20px] text-ink">No courses match your filters</p>
          <p className="mt-2 text-[14px] text-cocoa">
            Try a different exam or clear your search.
          </p>
        </div>
      )}
    </div>
  )
}

import type { Metadata } from "next"
import { CourseCard } from "@/components/courses/course-card"
import { PageHeader } from "@/components/layout/page-header"
import { SiteShell } from "@/components/layout/site-shell"
import { courses } from "@/lib/sample-data"

export const metadata: Metadata = {
  title: "Courses",
  description: "Structured courses for JEE, NEET, UPSC, SSC, GATE, and banking exams.",
}

export default function CoursesPage() {
  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <PageHeader
          eyebrow="Catalog"
          title="Courses"
          description="Browse all structured courses across competitive exams. Every course is built around the syllabus, not the textbook."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
      </div>
    </SiteShell>
  )
}

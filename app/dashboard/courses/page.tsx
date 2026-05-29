import type { Metadata } from "next"
import { CourseCard } from "@/components/courses/course-card"
import { PageHeader } from "@/components/layout/page-header"
import { courses } from "@/lib/sample-data"

export const metadata: Metadata = { title: "My courses" }

export default function MyCoursesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Learning"
        title="My courses"
        description="Your enrolled courses with progress. Live data lands in Phase 5."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.slice(0, 4).map((c) => (
          <CourseCard key={c.slug} course={c} href="/dashboard/courses" />
        ))}
      </div>
    </div>
  )
}

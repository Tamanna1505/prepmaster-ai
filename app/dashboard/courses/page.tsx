import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/page-header"
import { RecommendedCourseCard } from "@/components/dashboard/recommended-course-card"
import { PillLink } from "@/components/marketing/primitives"
import { CourseLibrary } from "@/components/courses/course-library"
import { recommendedCourses } from "@/lib/dashboard-data"

export const metadata: Metadata = { title: "My courses" }

export default function DashboardCoursesPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Learning"
        title="My courses"
        description="Pick up where you left off. Progress is tracked per lesson, and your weak areas surface in analytics."
        actions={
          <PillLink href="/courses" variant="outline" size="md">
            Browse catalog
          </PillLink>
        }
      />

      <CourseLibrary />

      <section>
        <h2 className="mb-4 font-serif text-[22px] tracking-[-0.02em] text-ink">Recommended next</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedCourses.map((item) => (
            <RecommendedCourseCard key={item.course.slug} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}

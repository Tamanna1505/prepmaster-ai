import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/page-header"
import { ProgressCard } from "@/components/dashboard/progress-card"
import { RecommendedCourseCard } from "@/components/dashboard/recommended-course-card"
import { PillLink } from "@/components/marketing/primitives"
import { enrolledCourses, recommendedCourses } from "@/lib/dashboard-data"

export const metadata: Metadata = { title: "My courses" }

export default function DashboardCoursesPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Learning"
        title="My courses"
        description="Pick up where you left off. Progress is tracked per lesson."
        actions={
          <PillLink href="/courses" variant="outline" size="md">
            Browse catalog
          </PillLink>
        }
      />

      <section>
        <h2 className="mb-4 font-serif text-[22px] tracking-[-0.02em] text-ink">Enrolled courses</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {enrolledCourses.map((e) => (
            <ProgressCard
              key={e.course.slug}
              icon={e.course.icon}
              eyebrow={`${e.course.examTag} · ${e.completedLessons}/${e.course.lessonCount} lessons`}
              title={e.course.title}
              subtitle={e.lastLesson}
              progressPct={e.progressPct}
              meta="Course progress"
              cta={{ href: "/dashboard/courses", label: "Resume" }}
            />
          ))}
        </div>
      </section>

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

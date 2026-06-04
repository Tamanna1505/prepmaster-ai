import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BookOpen, ChevronLeft, Clock, Sparkle, Star, Users } from "lucide-react"
import { getStudentCourse } from "@/lib/dashboard-data"
import { Eyebrow, LearnMore, PillLink, Tag } from "@/components/marketing/primitives"
import { CourseProgressCard } from "@/components/courses/course-progress-card"
import { CourseModuleList } from "@/components/courses/course-module-list"
import { CourseOutcomes } from "@/components/courses/course-outcomes"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>
}): Promise<Metadata> {
  const { courseId } = await params
  const sc = getStudentCourse(courseId)
  return { title: sc ? sc.course.title : "Course" }
}

export default async function DashboardCourseDetailPage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  const sc = getStudentCourse(courseId)
  if (!sc) notFound()

  const { course, modules, content, totalLessons, totalMinutes, completedCount, progressPct } = sc
  const Icon = course.icon
  const continueHref = `/dashboard/lessons/${sc.currentLessonId}`

  return (
    <div className="space-y-10">
      {/* Hero */}
      <div>
        <Link
          href="/dashboard/courses"
          className="focus-ring inline-flex items-center gap-1 rounded font-ui text-[13px] font-medium text-cocoa transition-colors hover:text-ink"
        >
          <ChevronLeft className="size-4" strokeWidth={2} /> My courses
        </Link>
        <div className="mt-4 flex items-start gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gold-200 text-gold-ink">
            <Icon className="size-7" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Tag tone="outline">{course.examTag}</Tag>
              <Tag tone="teal">{course.difficulty}</Tag>
            </div>
            <h1 className="mt-2 font-serif text-[30px] leading-[1.06] tracking-[-0.02em] text-ink sm:text-[40px]">
              {course.title}
            </h1>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-[16px] leading-[1.6] text-cocoa">{course.summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 font-ui text-[14px] text-taupe">
          <span className="flex items-center gap-1.5">
            <BookOpen className="size-4" strokeWidth={1.75} /> {totalLessons} lessons
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" strokeWidth={1.75} /> {Math.round(totalMinutes / 60)} hours
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="size-4" strokeWidth={1.75} /> {course.studentsEnrolled.toLocaleString()} enrolled
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="size-4 fill-amber text-amber" strokeWidth={1.75} />
            <span className="font-data tracking-[-0.02em] text-ink">{course.rating.toFixed(1)}</span>
          </span>
        </div>
        <div className="mt-6">
          <PillLink href={continueHref} variant="gold" size="lg">
            {progressPct > 0 ? "Continue learning" : "Start course"}
          </PillLink>
        </div>
      </div>

      {/* Body */}
      <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        <div>
          <Eyebrow tone="orange">Course content</Eyebrow>
          <h2 className="mt-2 mb-5 font-serif text-[24px] tracking-[-0.02em] text-ink sm:text-[28px]">
            {content.modules.length} modules · {totalLessons} lessons
          </h2>
          <CourseModuleList modules={modules} />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <CourseProgressCard
            course={course}
            progressPct={progressPct}
            completedCount={completedCount}
            totalLessons={totalLessons}
            totalMinutes={totalMinutes}
            currentLessonTitle={sc.currentLesson?.title}
            continueHref={continueHref}
          />
          <div className="rounded-[18px] bg-surface p-5 shadow-[inset_0_0_0_1px_var(--color-line)]">
            <p className="eyebrow text-taupe">This course includes</p>
            <ul className="mt-3 space-y-2 font-ui text-[14px] text-cocoa">
              {[
                "Concept videos and reading notes",
                "Downloadable PDF resources",
                "Topic-wise practice and mock tests",
                "AI study tips on every lesson",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Sparkle className="mt-0.5 size-4 shrink-0 text-orange" strokeWidth={1.75} /> {f}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <LearnMore label="Browse public catalog" href="/courses" />
            </div>
          </div>
        </aside>
      </div>

      <CourseOutcomes outcomes={content.outcomes} />
    </div>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, GraduationCap, Star, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { SiteShell } from "@/components/layout/site-shell"
import { courses } from "@/lib/sample-data"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const course = courses.find((c) => c.slug === slug)
  return {
    title: course?.title ?? "Course",
    description: course?.summary,
  }
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = courses.find((c) => c.slug === slug)
  if (!course) notFound()

  const Icon = course.icon

  return (
    <SiteShell>
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <Link
          href="/courses"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> All courses
        </Link>
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-6" />
              </span>
              <Badge variant="secondary">{course.examTag}</Badge>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{course.title}</h1>
            <p className="text-base text-muted-foreground">{course.summary}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" /> {course.durationHours} hours
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="size-4" /> {course.studentsEnrolled.toLocaleString()} enrolled
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="size-4" /> {course.rating} / 5
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="size-4" /> {course.difficulty}
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold">What you&apos;ll learn</h2>
              <ul className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                {course.topics.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 rounded-lg border border-border/60 px-3 py-2"
                  >
                    <span className="size-1.5 rounded-full bg-primary" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Course outline</h2>
              <p className="text-sm text-muted-foreground">
                Full module and lesson outline will be populated once the course schema goes live
                (Phase 5).
              </p>
              <div className="rounded-xl border border-dashed border-border/60 bg-muted/30 p-6 text-sm text-muted-foreground">
                Module 1 · Foundations · 8 lessons
                <br />
                Module 2 · Core concepts · 14 lessons
                <br />
                Module 3 · Advanced problems · 11 lessons
                <br />
                Module 4 · Mock tests &amp; revision · 6 lessons
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-border/60 bg-card p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Free tier
              </p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">₹ 0</p>
              <p className="mt-1 text-xs text-muted-foreground">Full access during MVP.</p>
              <Link
                href="/register"
                className={`${buttonVariants({ size: "lg" })} mt-4 w-full`}
              >
                Enroll now
              </Link>
              <p className="mt-3 text-xs text-muted-foreground">
                {course.lessonCount} lessons · {course.durationHours} hours of study.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card p-5 text-sm">
              <p className="font-medium">Includes</p>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                <li>· Concept videos and notes</li>
                <li>· Topic-wise mock tests</li>
                <li>· AI feedback after each attempt</li>
                <li>· Personal analytics dashboard</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </SiteShell>
  )
}

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BookOpen, Clock, GraduationCap, Users } from "lucide-react"
import { SiteShell } from "@/components/layout/site-shell"
import { Container, Eyebrow, LearnMore, PillLink, Tag } from "@/components/marketing/primitives"
import { CourseSyllabus } from "@/components/marketing/course-syllabus"
import { getCourseBySlug } from "@/lib/data/courses"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
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
  const course = await getCourseBySlug(slug)
  if (!course) notFound()

  return (
    <SiteShell>
      {/* Editorial header */}
      <section className="border-b border-line bg-cream-100 py-12 sm:py-14">
        <Container>
          <LearnMore label="All courses" href="/courses" />
          <div className="mt-6 flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-xl bg-gold-200 text-gold-ink">
              <GraduationCap className="size-6" strokeWidth={1.75} />
            </span>
            <Tag tone="outline">{course.examTag}</Tag>
            <Tag tone="teal">{course.difficulty}</Tag>
          </div>
          <h1 className="mt-5 max-w-3xl font-serif text-[34px] leading-[1.06] tracking-[-0.02em] text-ink sm:text-[46px]">
            {course.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-[1.6] text-cocoa">{course.summary}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-ui text-[14px] text-taupe">
            <span className="flex items-center gap-1.5">
              <BookOpen className="size-4" strokeWidth={1.75} /> {course.lessonCount} lessons
            </span>
            {course.durationHours > 0 ? (
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" strokeWidth={1.75} /> {course.durationHours} hours
              </span>
            ) : null}
            <span className="flex items-center gap-1.5">
              <Users className="size-4" strokeWidth={1.75} />{" "}
              {course.studentsEnrolled.toLocaleString()} enrolled
            </span>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-cream-100 py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr]">
            <div className="space-y-10">
              {course.description ? (
                <div>
                  <Eyebrow>About this course</Eyebrow>
                  <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-cocoa">
                    {course.description}
                  </p>
                </div>
              ) : null}

              {course.topics.length > 0 ? (
                <div>
                  <Eyebrow>What you&apos;ll learn</Eyebrow>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {course.topics.map((t) => (
                      <li
                        key={t}
                        className="flex items-center gap-2.5 rounded-[14px] bg-surface px-4 py-3 font-ui text-[14px] text-cocoa shadow-[inset_0_0_0_1px_var(--color-line)]"
                      >
                        <span className="size-1.5 rounded-full bg-orange" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div>
                <Eyebrow>Course outline</Eyebrow>
                <h2 className="mt-3 font-serif text-[26px] tracking-[-0.02em] text-ink">
                  {course.modules.length} module{course.modules.length === 1 ? "" : "s"} ·{" "}
                  {course.lessonCount} lesson{course.lessonCount === 1 ? "" : "s"}
                </h2>
                <div className="mt-5">
                  {course.modules.length > 0 ? (
                    <CourseSyllabus modules={course.modules} />
                  ) : (
                    <p className="rounded-[16px] bg-surface px-5 py-4 font-ui text-[14px] text-taupe shadow-[inset_0_0_0_1px_var(--color-line)]">
                      The curriculum for this course is being prepared.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sticky enroll card */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-[24px] bg-surface p-6 shadow-card shadow-[inset_0_0_0_1px_var(--color-line)]">
                <Eyebrow tone="taupe">Free during MVP</Eyebrow>
                <p className="mt-2 font-serif text-[38px] leading-none tracking-[-0.02em] text-ink">
                  ₹0
                </p>
                <p className="mt-2 font-ui text-[13px] text-taupe">
                  Full access while we&apos;re in beta.
                </p>
                <PillLink href="/register" variant="ink" size="lg" className="mt-5 w-full">
                  Enroll now
                </PillLink>
                <div className="my-6 h-px bg-line" />
                <p className="font-ui text-[13px] font-semibold text-ink">This course includes</p>
                <ul className="mt-3 space-y-2 font-ui text-[14px] text-cocoa">
                  {[
                    "Concept videos and notes",
                    "Topic-wise mock tests",
                    "AI feedback after each attempt",
                    "Personal analytics dashboard",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </SiteShell>
  )
}

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { BookOpen, Clock, Star, Users } from "lucide-react"
import { SiteShell } from "@/components/layout/site-shell"
import {
  Container,
  Eyebrow,
  LearnMore,
  PillLink,
  Tag,
} from "@/components/marketing/primitives"
import { CourseSyllabus, type SyllabusModule } from "@/components/marketing/course-syllabus"
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

/* Sample module outline — the live Course → Module → Lesson hierarchy lands in
   Phase 5 (PRD §9). */
function sampleModules(course: (typeof courses)[number]): SyllabusModule[] {
  const [t0, t1, t2, t3] = course.topics
  return [
    {
      title: "Module 1 · Foundations",
      meta: "8 lessons · 5 hrs",
      lessons: [`${t0 ?? "Core concepts"} — overview`, "Key definitions and intuition", "Worked examples"],
    },
    {
      title: `Module 2 · ${t1 ?? "Core concepts"}`,
      meta: "14 lessons · 11 hrs",
      lessons: ["Concept videos", "Common pitfalls", "Topic-wise practice set", "Mini mock test"],
    },
    {
      title: `Module 3 · ${t2 ?? "Advanced problems"}`,
      meta: "11 lessons · 9 hrs",
      lessons: ["Advanced problem patterns", "Previous-year drills", "Speed techniques"],
    },
    {
      title: `Module 4 · ${t3 ?? "Revision"} & mock tests`,
      meta: "6 lessons · 4 hrs",
      lessons: ["Full-length mock", "AI feedback walkthrough", "Final revision sheet"],
    },
  ]
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
  const modules = sampleModules(course)

  return (
    <SiteShell>
      {/* Editorial header */}
      <section className="border-b border-line bg-cream-100 py-12 sm:py-14">
        <Container>
          <LearnMore label="All courses" href="/courses" />
          <div className="mt-6 flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-xl bg-gold-200 text-gold-ink">
              <Icon className="size-6" strokeWidth={1.75} />
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
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" strokeWidth={1.75} /> {course.durationHours} hours
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-4" strokeWidth={1.75} />{" "}
              {course.studentsEnrolled.toLocaleString()} enrolled
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="size-4 fill-amber text-amber" strokeWidth={1.75} />
              <span className="font-data tracking-[-0.02em] text-ink">
                {course.rating.toFixed(1)}
              </span>{" "}
              / 5
            </span>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-cream-100 py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.7fr_1fr]">
            <div className="space-y-10">
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

              <div>
                <Eyebrow>Course outline</Eyebrow>
                <h2 className="mt-3 font-serif text-[26px] tracking-[-0.02em] text-ink">
                  {modules.length} modules · {course.lessonCount} lessons
                </h2>
                <div className="mt-5">
                  <CourseSyllabus modules={modules} />
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

import type { Metadata } from "next"
import { SiteShell } from "@/components/layout/site-shell"
import { Container, Eyebrow } from "@/components/marketing/primitives"
import { CoursesExplorer } from "@/components/marketing/courses-explorer"
import { getPublishedCourses } from "@/lib/data/courses"

// Always reflect the live database (new courses appear without a rebuild).
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Browse structured courses for JEE, NEET, UPSC, SSC, GATE, and banking exams — built around the syllabus, with topic-wise tests and AI feedback.",
}

export default async function CoursesPage() {
  const courses = (await getPublishedCourses()) ?? []

  return (
    <SiteShell>
      <section className="border-b border-line bg-cream-100 py-14 sm:py-16">
        <Container wide>
          <Eyebrow>Course catalog</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-serif text-[40px] leading-[1.04] tracking-[-0.02em] text-ink sm:text-[52px]">
            Courses built around the syllabus
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-[1.6] text-cocoa">
            Every lesson earned its place. Filter by exam, search by topic, and start with a track
            that fits where you are today.
          </p>
        </Container>
      </section>

      <section className="bg-cream-100 py-8 sm:py-10">
        <Container wide>
          <CoursesExplorer courses={courses} />
        </Container>
      </section>
    </SiteShell>
  )
}

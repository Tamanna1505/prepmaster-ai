import { courses } from "@/lib/sample-data"
import { Container, LearnMore, SectionHead } from "@/components/marketing/primitives"
import { CourseCard } from "@/components/marketing/course-card"

export function FeaturedCourses({ limit = 4 }: { limit?: number }) {
  return (
    <section className="bg-cream-100 py-14 sm:py-20">
      <Container wide>
        <SectionHead
          eyebrow="Featured courses"
          title="Courses built around the syllabus"
          description="Curated tracks for every major exam — concept videos, worked examples, and topic-wise tests, with nothing that doesn't move your score."
          trailing={<LearnMore label="Browse all courses" href="/courses" />}
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {courses.slice(0, limit).map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { courses, getCourseContent } from "@/lib/sample-data"
import { PageHeader } from "@/components/layout/page-header"
import { CourseForm, type CourseFormInitial } from "@/components/courses/course-form"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const course = courses.find((c) => c.slug === id)
  return { title: course ? `Edit · ${course.title}` : "Edit course" }
}

export default async function AdminEditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const course = courses.find((c) => c.slug === id)
  const content = getCourseContent(id)
  if (!course || !content) notFound()

  const initial: CourseFormInitial = {
    title: course.title,
    slug: course.slug,
    summary: course.summary,
    description: course.summary,
    category: "Full course",
    examTag: course.examTag,
    level: course.difficulty,
    durationHours: course.durationHours,
    price: 0,
    thumbnailUrl: "",
    published: true,
    modules: content.modules.map((m) => ({
      title: m.title,
      lessons: m.lessons.map((l) => ({
        title: l.title,
        kind: l.kind,
        durationMinutes: l.durationMinutes,
      })),
    })),
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/courses"
          className="focus-ring inline-flex items-center gap-1 rounded font-ui text-[13px] font-medium text-cocoa transition-colors hover:text-ink"
        >
          <ChevronLeft className="size-4" strokeWidth={2} /> Courses
        </Link>
        <div className="mt-3">
          <PageHeader
            eyebrow="Content"
            title={`Edit · ${course.title}`}
            description="Update course details and restructure its modules and lessons."
          />
        </div>
      </div>
      <CourseForm mode="edit" initial={initial} />
    </div>
  )
}

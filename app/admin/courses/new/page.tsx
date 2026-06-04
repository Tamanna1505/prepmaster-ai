import type { Metadata } from "next"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { PageHeader } from "@/components/layout/page-header"
import { CourseForm } from "@/components/courses/course-form"

export const metadata: Metadata = { title: "Admin · New course" }

export default function AdminNewCoursePage() {
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
            title="New course"
            description="Define the course, then build its modules and lessons. Publish when it's ready."
          />
        </div>
      </div>
      <CourseForm mode="new" />
    </div>
  )
}

import type { Metadata } from "next"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { CourseForm } from "@/components/courses/course-form"

export const metadata: Metadata = { title: "Admin · New course" }

export default function AdminNewCoursePage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content"
        title="New course"
        description="Define the course, then build its modules and lessons. Publish when it's ready."
        backHref="/admin/courses"
        backLabel="Courses"
      />
      <CourseForm mode="new" />
    </div>
  )
}

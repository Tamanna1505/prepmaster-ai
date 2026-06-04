import type { Metadata } from "next"
import { PageHeader } from "@/components/layout/page-header"
import { AdminCourseManager } from "@/components/courses/admin-course-manager"

export const metadata: Metadata = { title: "Admin · Courses" }

export default function AdminCoursesPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Content"
        title="Courses"
        description="Manage courses, modules, and lessons. Search, filter, publish, and edit from one place."
      />
      <AdminCourseManager />
    </div>
  )
}

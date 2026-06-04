import type { Metadata } from "next"
import { AdminPageHeader } from "@/components/admin/admin-page-header"
import { AdminCourseManager } from "@/components/courses/admin-course-manager"

export const metadata: Metadata = { title: "Admin · Courses" }

export default function AdminCoursesPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content"
        title="Courses"
        description="Manage courses, modules, and lessons. Search, filter, publish, and edit from one place."
      />
      <AdminCourseManager />
    </div>
  )
}
